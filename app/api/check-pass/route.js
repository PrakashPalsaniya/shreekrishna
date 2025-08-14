import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { password } = await req.json();
    
    if (password === process.env.ADMIN_PASSS) { 
      
      const sessionToken = jwt.sign(
        { 
          authenticated: true,
          timestamp: Date.now()
        },
        process.env.JWT_SECRET, 
        { expiresIn: '30m' }
      );
      
      return new Response(JSON.stringify({ 
        success: true, 
        token: sessionToken 
      }), { status: 200 });
    } else {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      return new Response(JSON.stringify({ success: false }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
}
