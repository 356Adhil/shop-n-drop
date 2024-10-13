"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Account() {
  const [user, setUser] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch user data and orders from the backend
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token is found
        window.location.href = '/login';
        return;
      }

      try {
        const userResponse = await fetch('/api/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userResponse.json();
        setUser(userData);

        const ordersResponse = await fetch('/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const ordersData = await ordersResponse.json();
        setActiveOrders(ordersData.activeOrders);
        setOrderHistory(ordersData.orderHistory);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Account</h1>
      
      <Tabs defaultValue="active" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
              <CardDescription>Your current orders in progress</CardDescription>
            </CardHeader>
            <CardContent>
              {activeOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center border-b py-2 last:border-b-0">
                  <div>
                    <p className="font-medium">{order.item}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                  <Button variant="outline" size="sm">Track</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Your past orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orderHistory.map(order => (
                <div key={order.id} className="flex justify-between items-center border-b py-2 last:border-b-0">
                  <div>
                    <p className="font-medium">{order.item}</p>
                    <p className="text-sm text-muted-foreground">{order.status} on {order.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}