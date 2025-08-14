import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { password } = await req.json();
    
    if (password === process.env.ADMIN_PASSS) { 
      // Create JWT token with 30 minute expiration
      const sessionToken = jwt.sign(
        { 
          authenticated: true,
          timestamp: Date.now()
        },
        process.env.JWT_SECRET, // Make sure to add this to your .env file
        { expiresIn: '30m' }
      );
      
      return new Response(JSON.stringify({ 
        success: true, 
        token: sessionToken 
      }), { status: 200 });
    } else {
      // Add delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      return new Response(JSON.stringify({ success: false }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
}
