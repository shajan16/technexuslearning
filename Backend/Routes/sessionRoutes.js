// backend/routes/hours.js
const express = require('express');
const router = express.Router();
const Session = require('../Models/sessionModels');

// helpers
const startOfDay = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(0,0,0,0);
  return x;
};
const endOfDay = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(23,59,59,999);
  return x;
};


// --- START session (create or reuse today's session)
router.post('/start', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    const today = startOfDay();
    let session = await Session.findOne({ userId, date: today });

    const now = new Date();
    if (!session) {
      session = new Session({
        userId,
        date: today,
        startTime: now,
        breaks: [],
        totalBreakSeconds: 0,
        currentBreakStart: null
      });
      await session.save();
    } else {
      // if exists but no startTime (shouldn't happen), set it
      if (!session.startTime) {
        session.startTime = now;
        await session.save();
      }
    }
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- PAUSE (start break)
router.post('/pause', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    const today = startOfDay();
    const session = await Session.findOne({ userId, date: today });
    if (!session) return res.status(404).json({ success: false, message: 'No session for today' });
    if (session.currentBreakStart) return res.status(400).json({ success: false, message: 'Already on break' });

    session.currentBreakStart = new Date();
    await session.save();
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- RESUME (end break)
router.post('/resume', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    const today = startOfDay();
    const session = await Session.findOne({ userId, date: today });
    if (!session) return res.status(404).json({ success: false, message: 'No session for today' });
    if (!session.currentBreakStart) return res.status(400).json({ success: false, message: 'Not on break' });

    const breakStart = session.currentBreakStart;
    const breakEnd = new Date();
    const breakSeconds = Math.round((breakEnd.getTime() - new Date(breakStart).getTime()) / 1000);

    session.breaks.push({ start: breakStart, end: breakEnd });
    session.totalBreakSeconds = (session.totalBreakSeconds || 0) + breakSeconds;
    session.currentBreakStart = null;
    await session.save();

    res.json({ success: true, session, breakSeconds });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- STOP (finalize)
router.post('/stop', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    const today = startOfDay();
    const session = await Session.findOne({ userId, date: today });
    if (!session) return res.status(404).json({ success: false, message: 'No session for today' });

    const now = new Date();
     
     const breakSeconds = session.totalBreakSeconds || 0 ;


    // if currently on break, close it
    if (session.currentBreakStart) {
      const breakStart = session.currentBreakStart;
      const breakEnd = now;
      breakSeconds += Math.round((breakEnd.getTime() - new Date(breakStart).getTime()) / 1000);
      session.breaks.push({ start: breakStart, end: breakEnd });
      session.totalBreakSeconds = (session.totalBreakSeconds || 0) + breakSeconds;
      session.currentBreakStart = null;
    }

    // Compute total work seconds (span from start to now)
    const workSeconds = Math.round((now.getTime() - new Date(session.startTime).getTime()) / 1000) - breakSeconds;
 
    // Save last stopped values
    session.lastStoppedWorkSeconds = workSeconds;
    session.lastStoppedBreakSeconds = breakSeconds;
    session.endTime = now;
    const totalSpanSeconds = Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000);
    session.totalWorkSeconds = totalSpanSeconds;
    session.netSeconds = Math.max(0, totalSpanSeconds - (session.totalBreakSeconds || 0));
    await session.save();

    res.json({
      success: true,
      session,
      computed: {
        totalSpanSeconds: session.totalWorkSeconds,
        totalBreakSeconds: session.totalBreakSeconds,
        netSeconds: session.netSeconds
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- GET today totals (returns HH:MM strings and net seconds)
const secondsToHHMM = (secs) => {
  const s = Math.max(0, Math.round(Number(secs) || 0));
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}`;
};

router.get('/today/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const today = startOfDay();
    const session = await Session.findOne({ userId, date: today });
  
    if (!session) {
      return res.json({
        success: true,
        today: {
          workedHHMM: '00:00',
          breakHHMM: '00:00',
          netHHMM: '00:00',
          netSeconds: 0,
          startTime: null,
          endTime: null,
        }
      });
    }

    // compute on-the-fly if session active (no endTime)
    let totalBreakSeconds = session.totalBreakSeconds || 0;
    // include current break if open
    if (session.currentBreakStart) {
      totalBreakSeconds += Math.round((new Date().getTime() - new Date(session.currentBreakStart).getTime()) / 1000);
    }

    let totalSpanSeconds = session.totalWorkSeconds || 0;
    if (!session.endTime) {
      totalSpanSeconds = Math.round((new Date().getTime() - new Date(session.startTime).getTime()) / 1000);
    }

    const netSeconds = Math.max(0, totalSpanSeconds - totalBreakSeconds);

    res.json({
      success: true,
      today: {
        workedHHMM: secondsToHHMM(totalSpanSeconds),
        breakHHMM: secondsToHHMM(totalBreakSeconds),
        netHHMM: secondsToHHMM(netSeconds),
        netSeconds,
        startTime: session.startTime || null,
        endTime: session.endTime || null
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

   router.get('/today-total/:userId', async (req, res) => {
      try {
        const userId = req.params.userId;
        const today = startOfDay();
        const session = await Session.findOne({ userId, date: today });
        const netSeconds = session ? (session.netSeconds || 0) : 0;
        const netHours = Number((netSeconds / 3600).toFixed(2));
        res.json({ success: true, totalHours: netHours, netSeconds });
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
    });

// --- GET weekly net hours (last 7 days, returns array of {day, netHHMM, netSeconds})
router.get('/weekly/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = [];

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find the Monday of the current week
    const dayOfWeek = today.getDay(); 
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7)); 

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      dayDate.setHours(0, 0, 0, 0);

      const dayStart = new Date(dayDate);
      const dayEnd = endOfDay(dayDate);

      const session = await Session.findOne({ userId, date: dayStart });
      let netSeconds = 0;

      if (session) {
        if (!session.endTime && session.date.getTime() === startOfDay().getTime()) {
          let totalBreakSeconds = session.totalBreakSeconds || 0;
          if (session.currentBreakStart) {
            totalBreakSeconds += Math.round((new Date().getTime() - new Date(session.currentBreakStart).getTime()) / 1000);
          }
          const totalSpanSeconds = Math.round((new Date().getTime() - new Date(session.startTime).getTime()) / 1000);
          netSeconds = Math.max(0, totalSpanSeconds - totalBreakSeconds);
        } else {
          netSeconds = session.netSeconds || Math.max(0, (session.totalWorkSeconds || 0) - (session.totalBreakSeconds || 0));
        }
      }

      const dayLabel = dayStart.toLocaleDateString(undefined, { weekday: 'short' }); // Mon, Tue, etc.
      results.push({
        date: dayStart,
        day: dayLabel,
        netHHMM: secondsToHHMM(netSeconds),
        netSeconds
      });
    }

    res.json({ success: true, weekly: results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- GET monthly net hours (returns { workedHHMM, netSeconds })
router.get('/monthly/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
    firstDay.setHours(0, 0, 0, 0);
    lastDay.setHours(23, 59, 59, 999);

    const sessions = await Session.find({
      userId,
      date: { $gte: firstDay, $lte: lastDay }
    });

    let totalNetSeconds = 0;
    let totalWorkSeconds = 0;

    for (const session of sessions) {
      let netSeconds = 0;
      let workSeconds = 0;
      if (!session.endTime && session.date.getTime() === (new Date()).setHours(0,0,0,0)) {
        // If today and not ended, compute live
        let totalBreakSeconds = session.totalBreakSeconds || 0;
        if (session.currentBreakStart) {
          totalBreakSeconds += Math.round((new Date().getTime() - new Date(session.currentBreakStart).getTime()) / 1000);
        }
        workSeconds = Math.round((new Date().getTime() - new Date(session.startTime).getTime()) / 1000);
        netSeconds = Math.max(0, workSeconds - totalBreakSeconds);
      } else {
        workSeconds = session.totalWorkSeconds || 0;
        netSeconds = session.netSeconds || Math.max(0, (session.totalWorkSeconds || 0) - (session.totalBreakSeconds || 0));
      }
      totalNetSeconds += netSeconds;
      totalWorkSeconds += workSeconds;
    }

    const secondsToHHMM = (secs) => {
      const s = Math.max(0, Math.round(Number(secs) || 0));
      const hrs = Math.floor(s / 3600);
      const mins = Math.floor((s % 3600) / 60);
      return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}`;
    };

    res.json({
      success: true,
      monthly: {
        workedHHMM: secondsToHHMM(totalWorkSeconds),
        netHHMM: secondsToHHMM(totalNetSeconds),
        netSeconds: totalNetSeconds
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router;
