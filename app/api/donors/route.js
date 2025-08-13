import { connectDB } from "@/lib/db";
import Donation from "./../../../models/donation";

export async function GET() {
  try {
    await connectDB();
    const donors = await Donation.find().sort({ amount: -1 });
    return new Response(JSON.stringify(donors), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
