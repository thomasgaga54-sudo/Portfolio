const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { Resend } = require("resend");

const app = express();


app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: function(o,cb){ cb(null,true); }, methods:["GET","POST"], credentials:true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err.message));

const Contact = mongoose.model("Contact", { name:String, email:String, message:String, createdAt:{type:Date,default:Date.now} });
const Review = mongoose.model("Review", { name:String, rating:Number, comment:String, createdAt:{type:Date,default:Date.now} });
const Project = mongoose.model("Project", { title:String, description:String, tags:[String], gallery:[{url:String,caption:String}], image:String, github:String, live:String });

app.get("/api/reviews", async (req, res) => {
  try { res.json(await Review.find().sort({ createdAt: -1 })); }
  catch(err){ res.status(500).json({ message: err.message }); }
});

app.post("/api/reviews", async (req, res) => {
  const { name, rating, comment } = req.body;
  if (!name||!rating||!comment) return res.status(400).json({ message:"All fields required" });
  try { res.json(await Review.create({ name, rating, comment })); }
  catch(err){ res.status(500).json({ message: err.message }); }
});

app.get("/api/projects", async (req, res) => {
  try { res.json(await Project.find()); }
  catch(err){ res.status(500).json({ message: err.message }); }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name||!email||!message) return res.status(400).json({ message:"All fields required" });
  try { await new Contact({ name, email, message }).save(); } catch(e){ console.error("DB:",e.message); }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [process.env.EMAIL_USER || "ejairuogaga@gmail.com"],
      replyTo: email,
      subject: "New Portfolio Message from " + name,
      html: "<h2>New Message</h2><p><b>Name:</b> "+name+"</p><p><b>Email:</b> "+email+"</p><p><b>Message:</b> "+message+"</p>"
    });
    if (error){ console.error("Resend:",JSON.stringify(error)); return res.status(500).json({ message:"Email failed: "+error.message }); }
    res.json({ message:"Sent" });
  } catch(err){
    console.error("Contact:",err.message);
    res.status(500).json({ message:"Email failed: "+err.message });
  }
});

app.get("/health", (req, res) => {
  res.json({ status:"ok", db: mongoose.connection.readyState===1?"connected":"disconnected", resendKey: process.env.RESEND_API_KEY?"set":"MISSING", emailTo: process.env.EMAIL_USER||"not set" });
});

app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "../client/dist/index.html")); });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server on port " + PORT));