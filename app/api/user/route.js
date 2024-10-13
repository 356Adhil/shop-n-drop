import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'No token provided' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // In a real application, you would fetch the user data from your database
  const userData = {
    id: user.id,
    email: 'customer@example.com',
    name: 'John Doe'
  };

  return new Response(JSON.stringify(userData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}