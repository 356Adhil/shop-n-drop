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

  if (!user || user.role !== 'partner') {
    return new Response(JSON.stringify({ error: 'Invalid token or not a partner' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // In a real application, you would fetch the partner data from your database
  const partnerData = {
    id: user.id,
    email: 'partner@example.com',
    name: 'Jane Smith',
    area: 'Downtown'
  };

  return new Response(JSON.stringify(partnerData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}