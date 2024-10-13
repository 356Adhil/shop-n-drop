"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PartnerDashboard() {
  const [partner, setPartner] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch partner data and orders from the backend
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token is found
        window.location.href = '/login';
        return;
      }

      try {
        const partnerResponse = await fetch('/api/partner', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const partnerData = await partnerResponse.json();
        setPartner(partnerData);

        const ordersResponse = await fetch('/api/partner/orders', {
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

  if (!partner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Partner Dashboard</h1>
      
      <Tabs defaultValue="active" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
              <CardDescription>Orders you've accepted and are currently processing</CardDescription>
            </CardHeader>
            <CardContent>
              {activeOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center border-b py-2 last:border-b-0">
                  <div>
                    <p className="font-medium">{order.item}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                  <Button variant="outline" size="sm">Update Status</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Your completed orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orderHistory.map(order => (
                <div key={order.id} className="flex justify-between items-center border-b py-2 last:border-b-0">
                  <div>
                    <p className="font-medium">{order.item}</p>
                    <p className="text-sm text-muted-foreground">Completed on {order.date}</p>
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