// Import crypto at the top of the file (ES6 modules)
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSS) { // Keep your existing env var
      
      // Generate session token instead of relying on password
      const sessionToken = crypto.randomBytes(32).toString('hex');
      
      // Store valid tokens (in production, use database/Redis)
      global.validTokens = global.validTokens || new Map();
      global.validTokens.set(sessionToken, {
        created: Date.now(),
        expires: Date.now() + (30 * 60 * 1000) // 30 minutes
      });
      
      return new Response(JSON.stringify({ 
        success: true, 
        token: sessionToken 
      }), { status: 200 });
    } else {
      // Prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      return new Response(JSON.stringify({ success: false }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
}
