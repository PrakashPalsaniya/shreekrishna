
export async function POST(req) {
  try {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASS) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
}
