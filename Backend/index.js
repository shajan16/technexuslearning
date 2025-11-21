const express = require('express')
const multer  = require('multer')
const mongoose = require ('mongoose')
const cors = require ('cors')
const fs =require('fs')
require('dotenv').config()
const nodemailer = require('nodemailer');
const path = require ('path')

// Models
const Signup= require('./Models/useraccount.Model')
const Mentors = require('./Models/mentorModel')
const Partners= require ('./Models/partnersModel')
const Students= require ('./Models/studentsModel')
const Procourses= require('./Models/procoursesModel')
const Enquire= require('./Models/enquiryModel')
const Demovideo= require('./Models/demovideoModel')
const Workshop = require('./Models/workshopModel')
const Chat = require('./Models/chatModel')
const Staff = require('./Models/staffModel')
const Workshopreg = require('./Models/workshopregModel')
const sessionRoutes = require('./Routes/sessionRoutes')
const adminstaffsRoutes =require('./Routes/adminstaffsRouters')




// Database Connection
const databaeUrl=process.env.DATABASE_URL

// Server Connection
const Port = process.env.PORT || 4000;

const app = express();

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use("/uploadimage",express.static(path.join(__dirname,"uploads")));
app.use("/uploadpartner",express.static(path.join(__dirname,"uploads")));
app.use("/uploadstudent",express.static(path.join(__dirname,"uploads")));
app.use("/uploadprocourse",express.static(path.join(__dirname,"uploads")));
app.use("/uploaddemovideo",express.static(path.join(__dirname,"uploads")));
app.use("/uploadworkshop",express.static(path.join(__dirname,"uploads")));

// Staff-Session
app.use('/api/session', sessionRoutes);

// Admin-Staff
app.use('/staffsadmin', adminstaffsRoutes);


// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'uploads/')
  },
  filename:(req, file, cb)=> {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})  
const upload = multer({ storage ,limits:{fileSize:200*1024*1024} })


// Chat-Message
app.post("/message", async (req, res) => {
  const { userId, sender, message } = req.body;
  const newMsg = new Chat({ userId, sender, message });
  await newMsg.save();
  io.emit("newMessage", newMsg);
  res.status(201).json(newMsg);
});

// User-Signup
app.post("/signup", async (req, res) => {
  let { name, phone, email, password } = req.body;
  try {
    let existingUser = await Signup.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    let userData = new Signup({
      name: name,
      phone: phone,
      email: email,
      password: password
    });
    await userData.save();
    res.json({ message: "Signup Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Check-User-Login
app.post("/login", async (req,res)=>{
  let {email, password}=req.body
  try {
    let user= await Signup.findOne({email:email})
    .then((data)=>{
      if(data){
        if(data.password===password){
          res.json({message:"Login Sucessfully!", user:data})
        }else{
          res.json({message:"Incorrect Password!!"})
        }
      }else{
        res.json({message:"User not registered!!"})
      }
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:error.message})
  }
})
  
// Send-OTP
app.post("/sendotp", async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await Signup.findOne({ email });

    if (!user) return res.status(404).json({ message: "Email Not Registered!!" });

    let otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Verification Code",
      text: `Your One-Time Password (OTP) is ${otp}.
Please use this code to reset your Technexus Learning account password.
This OTP will expire in 5 minutes.`,
    });

    res.json({ message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
    console.log(error);
  }
});

// Reset-Password
app.post("/resetpassword", async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;
    const user = await Signup.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOtp !== otp || user.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newpassword;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
});

// Add-Staff
app.post("/addstaff", async (req, res) => {
  let { name, role, phone, password } = req.body;
  try {
    let existingUser = await Staff.findOne({ phone: phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    let staffData = new Staff({
      name: name,
      role: role,
      phone: phone,
      password: password
    });
    await staffData.save();
    res.json({ message: "Signup Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Check-Staff-Login
app.post("/stafflogin", async (req,res)=>{
  let {phone, password}=req.body
  try {
    let user= await Staff.findOne({phone:phone})
    .then((data)=>{
      if(data){
        if(data.password===password){
          res.json({message:"Login Sucessfully!", staff:data})
        }else{
          res.json({message:"Incorrect Password!!"})
        }
      }else{
        res.json({message:"Staff not registered!!"})
      }
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:error.message})
  }
})


// Add-Mentors
app.post('/uploadimage', upload.single('image'), async function (req, res, next) {
  try{
   if (!req.file) return res.status(400).json({message:"No file Uploaded!!"});

   let {mname}=req.body
   let {role}=req.body
   
   let imageName= new Mentors({
    mentorname:mname,
    mentorrole:role,
    name:req.file.originalname,
    path:req.file.filename
   })
   await imageName.save();
   res.json({message:"Upload Sucessfully!"})
  }
  catch(err){
    console.log(err.message);
  }
})

// Add-Partners
app.post('/uploadpartner', upload.single('cimage'), async function (req, res, next) {
  try{
   if (!req.file) return res.status(400).json({message:"No file Uploaded!!"});

   let {pname}=req.body
   
   let hirePartner= new Partners({
    companyname:pname,
    image:req.file.filename
   })
   await hirePartner.save();
   res.json({message:"Upload Sucessfully!"})
  }
  catch(err){
    console.log(err.message);
  }
})

// Enquiry-Data
app.post('/enquiry', async function (req, res, next) {
  let {name, qualification, role, number, email}=req.body;
  try{
    let existingUser = await Enquire.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
   let enquirydata= new Enquire({
    name:name,
    phone:number,
    email:email,
    qualification:qualification,
    for:role
   })
   await enquirydata.save();
   res.json({message:"Enquiry Submitted!"})
  }
  catch(err){
    console.log(err.message);
  } 
}) 

// Add-Students
app.post('/uploadstudent', upload.fields([{name:"simage",maxCount:1},{name:"sbimage",maxCount:1}]), async function (req, res, next) {
  
  try{
    
   if (!req.files || !req.files.simage || !req.files.sbimage) return res.status(400).json({message:"No file Uploaded!!"});

   let {sname, srole, sabout, sjoin, send}=req.body
    
   let student= new Students({
    name:sname,
    role:srole,
    about:sabout,
    joindate:sjoin,
    enddate:send,
    profileimg:req.files.simage[0].filename,
    backgroundimg:req.files.sbimage[0].filename
   })
   await student.save();
   res.json({message:"Upload Sucessfully!"})
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({error:err.message})
  }
})

// Add-Procourses
app.post('/uploadprocourse', upload.fields([{name:"cvideo",maxCount:1}, {name:"ciimage",maxCount:1}, {name:"cimage",maxCount:1}, {name:"cpdf",maxCount:1}]), async function (req, res, next) {
  
  try{

   let {cname, ccaption, cabout, cprice}=req.body
    
   let pcourse= new Procourses({
    name:cname,
    caption:ccaption,
    about:cabout,
    price:cprice,
    coursevideo:req.files.cvideo[0].filename,
    courseicon: req.files.ciimage[0].filename,
    courseimg:req.files.cimage[0].filename,
    coursesyllabus:req.files.cpdf[0].filename
   })
   await pcourse.save();
   res.json({message:"Upload Sucessfully!"})
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:err.message})
  }
})

// Add-Demovideo
app.post('/uploaddemovideo', upload.single('dvideo'), async function (req, res, next) {
  try{
   if (!req.file) return res.status(400).json({message:"No file Uploaded!!"});
   
   let oldvideo= await Demovideo.findOne();
   if (oldvideo) {
      let oldPath = `./uploads/${oldvideo.video}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      await Demovideo.deleteMany();
   }

   let newvideo = new Demovideo({
    video: req.file.filename,
   })

   await newvideo.save();
    res.status(201).json({ message: "Video uploaded successfully"});

  }
  catch(err){
    console.log(err.message);
  }
})

// Add-Workshop
app.post('/uploadworkshop', upload.single('workshop'), async function (req, res, next) {
  try{
   if (!req.file) return res.status(400).json({message:"No file Uploaded!!"});

   let newworkshop = new Workshop({
    image: req.file.filename,
   })

   await newworkshop.save();
    res.status(201).json({ message: "Video uploaded successfully"});

  }
  catch(err){
    console.log(err.message);
  }
})

// Workshop-Register
app.post('/workshopreg', async function (req, res, next) {
  let {name, number, email}=req.body;
  try{
    let existingUser = await Workshopreg.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
   let workshopdata= new Workshopreg({
    name:name,
    phone:number,
    email:email,
   })
   await workshopdata.save();
   res.json({message:"Enquiry Submitted!"})
  }
  catch(err){
    console.log(err.message);
  } 
}) 


// GET
// Get-Messages
app.get("/messages/:userId", async (req, res) => {
  const messages = await Chat.find({ userId: req.params.userId });
  res.json(messages);
});

// Get-Chat-Users
app.get("/chatusers", async (req, res) => {
  try {
    let users = await Chat.distinct("userId");
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Unread-Message-Count
app.get("/unreadcount/sender", async (req, res) => {
  try {
    let count = await Chat.countDocuments({ sender: "user", read: false });
    let id = await Chat.find({read:false}).distinct("sender");
    let id2= await Chat.find({read:false, sender:"user"}).distinct("userId")
    res.json({userId:id2, sender:id, unreadCount: count } );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// User-Unread-Message-Count
app.get("/unreadcount/:userid", async (req,res)=>{
  try {
    let usercount = await Chat.countDocuments({userId:req.params.userid , sender:"admin", read:false })
    res.json({userunreadcount:usercount})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});


// Mark-Messages-As-Read
app.put("/markasread/:userId", async (req, res) => {
  try {
    await Chat.updateMany({ userId: req.params.userId, sender: "user", read: false }, { $set: { read: true } });
    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }});
  
  // User-Make-Message-Read
app.put("/usermarkasread/:userId", async (req, res) => {
  try {
    await Chat.updateMany({ userId: req.params.userId, sender: "admin", read: false }, { $set: { read: true } });
    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }});
  
  

// Get-User
app.get("/getusers",async (req,res)=>{
  let udata = await Signup.find({});
  res.json(udata)
})

// Get-Staff
app.get("/getstaffs", async (req, res)=>{
  let stadata= await Staff.find({})
  res.json(stadata);
  
})


// Get-Enquiry
app.get("/getenquiry",async (req,res)=>{
  let edata = await Enquire.find({});
  res.json(edata)
})

// Get-Mentors
app.get("/getimages",async (req,res)=>{
    let data = await Mentors.find({});
    res.json(data)
})

// Get-Partners
app.get("/getpartners",async (req,res)=>{
    let cdata = await Partners.find({});
    res.json(cdata)
})

// Get-Demovideo
app.get("/getdemovideo",async (req,res)=>{
    let ddata = await Demovideo.find({});
    res.json(ddata)
})

// Get-Workshop
app.get("/getworkshop",async (req,res)=>{
    let wdata = await Workshop.find({});
    res.json(wdata)
})

// Get-Workshop-Registation
app.get("/getworkshopreg",async (req,res)=>{
  let edata = await Workshopreg.find({});
  res.json(edata)
})

// Get-Students
app.get("/getstudents",async (req,res)=>{
    let sdata = await Students.find({});
    res.json(sdata)
})

// Get-Student-id:
app.get("/getstudents/:id",async (req,res)=>{
  let siddata=await Students.findById(req.params.id)
  res.json(siddata)
})

// Get-Procourses
app.get("/getprocourses",async (req,res)=>{
    let cdata = await Procourses.find({});
    res.json(cdata)
})

// Get-Procourse-id:
app.get("/getprocourses/:id",async (req,res)=>{
  let ciddata=await Procourses.findById(req.params.id)
  res.json(ciddata)
})

// Welcome-Page
app.get("/", async (req,res)=>{
    res.json("Welcome!!")
})

// Delete
// Delete-Workshop
app.delete("/deleteworkshop/:id", async (req,res)=>{
  try {
    let wimg= await Workshop.findById(req.params.id)

    if (!wimg) {
      return res.status(404).json({message:"Workshop Not Found!!"})
    }

    let filestodelete = [
      wimg.image,
    ];

    filestodelete.forEach(file => {
      if (file) {
        let filepath = path.join(__dirname,'uploads',file)
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath)
        }
      }
    })

    await Workshop.findByIdAndDelete(req.params.id)
    res.json({message:"Workshop Deleted Successfully!"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// Delete-Workshop_Registation
app.delete('/deleteworkshopreg/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const deletedworkshop = await Workshopreg.findByIdAndDelete(id);

        if (!deletedworkshop) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }

        res.json({ success: true, message: "Enquiry deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
        console.log(err);
        
    }
});

// Delete-Procourse
app.delete("/deleteprocourse/:id", async (req,res)=>{
  try {
    let course= await Procourses.findById(req.params.id)

    if (!course) {
      return res.status(404).json({message:"Course Not Found!!"})
    }

    let filestodelete = [
      course.courseicon,
      course.courseimg,
      course.coursevideo,
      course.coursesyllabus
    ];

    filestodelete.forEach(file => {
      if (file) {
        let filepath = path.join(__dirname,'uploads',file)
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath)
        }
      }
    })

    await Procourses.findByIdAndDelete(req.params.id)
    res.json({message:"Course Deleted Successfully!"})
  } catch (error) {
    res.status(500).json({error:error.message})
    console.log(error);
    
  }
})

// Delete-Student
app.delete("/deletestudent/:id", async (req,res)=>{
  try {
    let student= await Students.findById(req.params.id)

    if (!student) {
      return res.status(404).json({message:"Course Not Found!!"})
    }

    let filestodelete = [
      student.profileimg,
      student.backgroundimg
    ];

    filestodelete.forEach(file => {
      if (file) {
        let filepath = path.join(__dirname,'uploads',file)
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath)
        }
      }
    })

    await Students.findByIdAndDelete(req.params.id)
    res.json({message:"Student Details Deleted Successfully!"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// Detele-Partner
app.delete("/deletepartner/:id", async (req,res)=>{
  try {
    let pimg= await Partners.findById(req.params.id)

    if (!pimg) {
      return res.status(404).json({message:"Course Not Found!!"})
    }

    let filestodelete = [
      pimg.image,
    ];

    filestodelete.forEach(file => {
      if (file) {
        let filepath = path.join(__dirname,'uploads',file)
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath)
        }
      }
    })

    await Partners.findByIdAndDelete(req.params.id)
    res.json({message:"Partner Deleted Successfully!"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// Delete-Mentor
app.delete("/deletementor/:id", async (req,res)=>{
  try {
    let mimg= await Mentors.findById(req.params.id)

    if (!mimg) {
      return res.status(404).json({message:"Course Not Found!!"})
    }

    let filestodelete = [
      mimg.path,
    ];

    filestodelete.forEach(file => {
      if (file) {
        let filepath = path.join(__dirname,'uploads',file)
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath)
        }
      }
    })

    await Mentors.findByIdAndDelete(req.params.id)
    res.json({message:"Mentor Deleted Successfully!"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
});

// Delete-Enquiry
app.delete('/deleteenquiry/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const deletedEnquiry = await Enquire.findByIdAndDelete(id);

        if (!deletedEnquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }

        res.json({ success: true, message: "Enquiry deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
        console.log(err);
        
    }
});

// Delete-Staff
app.delete('/deletestaff/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const deletedStaff = await Staff.deleteMany({name:id});

        if (!deletedStaff) {
            return res.status(404).json({ success: false, message: "Staff not found" });
        }

        // Delete related session data
        await require('./Models/sessionModels').deleteMany({ userId: id });

        res.json({ success: true, message: "Staff deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});



// Connections:
mongoose.connect(databaeUrl)
.then(()=>{
    console.log(`Database connected: ${databaeUrl}`);
})
.catch((error)=>{
    console.log(error.message)
})

const server = app.listen(Port,()=>{
    console.log(`The server is running port: ${Port} `)
})



// Socket.io setup
 const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userId) => {
    socket.join(userId);
    console.log("User joined room: " + userId);
    socket.emit("connected");
  });

  socket.on("newmessage", (newMessage) => {
    console.log(newMessage);
    if(newMessage.sender==="user"){
      console.log("New message from:",newMessage.sender);
      io.to("admin").emit("message received", newMessage);
    } else if(newMessage.sender==="admin"){
      console.log("New message from:",newMessage.sender);
      io.to(newMessage.userId).emit("message received", newMessage);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

  
