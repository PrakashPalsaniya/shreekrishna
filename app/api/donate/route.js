import { connectDB } from "@/lib/db";
import Donation from "./../../../models/donation";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, amount, year, adminPass } = await req.json();

    if (adminPass !== process.env.ADMIN_PASS) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    if (!name || !email || !amount || !year) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    await connectDB();
    
    // Fixed: Remove the space after 'year'
    await Donation.create({ 
      name, 
      email, 
      year, // Fixed: no space after 'year'
      amount 
    });

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your donation!",
     text: `Dear ${name},

We are deeply grateful for your generous contribution of ₹${amount} towards the upcoming Janmashtami celebrations. Your support helps us keep our traditions alive and make the event memorable for everyone.

We are delighted to invite you to join us in the celebrations:

📅 Date: 16th August, 2025  
🕓 Time: 4:00 PM onwards  
📍 Venue: Common Hall, NIT Srinagar  

🎉 कार्यक्रम / Schedule:  
दही हांडी: 4 PM  
पूजन: 5 PM  
भजन: 6 PM  
प्रसाद वितरण: 7 PM  

Dahi Handi: 4 PM  
Pujan: 5 PM  
Bhajan: 6 PM  
Prasad Distribution: 7 PM  

We look forward to celebrating together!

With gratitude,  
[Your Organization/Temple Name]`

    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}