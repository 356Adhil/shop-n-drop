"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlaceOrder() {
  const [order, setOrder] = useState({
    item: "",
    quantity: "",
    address: "",
    instructions: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOrder(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order placed:", order)
    // Here you would typically send the order to your backend
    alert("Order placed successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Place an Order</h1>
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Fill in the details of what you need delivered.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="item" className="block text-sm font-medium mb-1">Item</label>
              <Input
                id="item"
                name="item"
                value={order.item}
                onChange={handleChange}
                placeholder="e.g., 1kg sugar"
                required
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</label>
              <Input
                id="quantity"
                name="quantity"
                value={order.quantity}
                onChange={handleChange}
                placeholder="e.g., 1"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">Delivery Address</label>
              <Input
                id="address"
                name="address"
                value={order.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                required
              />
            </div>
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium mb-1">Special Instructions (Optional)</label>
              <Textarea
                id="instructions"
                name="instructions"
                value={order.instructions}
                onChange={handleChange}
                placeholder="Any special instructions for the delivery partner"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Place Order</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}