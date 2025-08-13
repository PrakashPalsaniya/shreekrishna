import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  year: {  
    type: Number,
    required: true
  }
});

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
