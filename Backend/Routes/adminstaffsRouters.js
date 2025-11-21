const express = require('express');
const router = express.Router();
const Session = require('../Models/sessionModels');


function getDayRange(dateString) {
  const parts = dateString.split('-');
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);

  const start = new Date(y, m - 1, d, 0, 0, 0, 0);       
  const end = new Date(y, m - 1, d, 23, 59, 59, 999);   
  return { start, end };
}

router.get('/daily', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: "Missing ?date=YYYY-MM-DD" });
    }

    const { start, end } = getDayRange(date);

    const results = await Session.aggregate([
      {
        $match: {
     
          startTime: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: "$userId",
          earliestStart: { $min: "$startTime" },
          latestEnd: { $max: "$endTime" },
          ongoingCount: {
                $sum: {
                  $cond: [
                    { $or: [
                      { $eq: ["$endTime", null] },
                      { $not: ["$endTime"] }
                    ] },1,0]
                }},
          totalBreakSeconds: { $sum: "$totalBreakSeconds" },
          totalWorkSeconds: { $sum: "$totalWorkSeconds" },
          netSeconds: { $sum: "$netSeconds" },
        }
      }
    ]);

    return res.json({ success: true, data: results });
  } catch (err) {
    console.error("GET /sessions/daily error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});


router.get('/monthly', async (req, res) => {
  try {
    const { year, month } = req.query;
    if (!year || !month) {
      return res.status(400).json({ success: false, message: "Missing ?year=YYYY&month=MM" });
    }

    const y = parseInt(year, 10);
    const m = parseInt(month, 10); // 1-12

    const start = new Date(y, m - 1, 1, 0, 0, 0, 0);
  
    const end = new Date(y, m - 1 + 1, 0, 23, 59, 59, 999);

    const results = await Session.aggregate([
      {
        $match: {
       
          startTime: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: "$userId",
          monthlyNetSeconds: { $sum: "$netSeconds" },
          monthlyTotalWorkSeconds: { $sum: "$totalWorkSeconds" },
          monthlyBreakSeconds: { $sum: "$totalBreakSeconds" },
        }
      }
    ]);

    return res.json({ success: true, data: results });
  } catch (err) {
    console.error("GET /sessions/monthly error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
