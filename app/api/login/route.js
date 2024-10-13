import { generateToken } from '@/lib/auth';

export async function POST(req) {
  const { email, password, userType } = await req.json();

  // In a real application, you would validate the credentials against your database
  // For this example, we'll use dummy data
  const users = {
    customer: { id: 1, email: 'customer@example.com', password: 'password', role: 'customer' },
    partner: { id: 2, email: 'partner@example.com', password: 'password', role: 'partner' }
  };

  const user = users[userType];

  if (user && user.email === email && user.password === password) {
    const token = generateToken(user);
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}