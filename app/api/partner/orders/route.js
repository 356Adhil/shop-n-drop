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

  // In a real application, you would fetch this data from your database
  const ordersData = {
    activeOrders: [
      { id: 1, item: "1kg Sugar", status: "Picking up" },
      { id: 2, item: "Bread", status: "On the way" },
    ],
    orderHistory: [
      { id: 3, item: "Milk", status: "Delivered", date: "2024-03-10" },
      { id: 4, item: "Eggs", status: "Delivered", date: "2024-03-08" },
    ]
  };

  return new Response(JSON.stringify(ordersData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}