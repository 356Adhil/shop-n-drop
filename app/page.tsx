import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ShoppingBag, Truck } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to LocalEase</h1>
      <p className="text-xl text-center mb-12">Your local delivery solution in Kerala</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>I Need Something Delivered</CardTitle>
            <CardDescription>Place an order for local delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
            <Button asChild className="w-full">
              <Link href="/place-order">Place an Order</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>I Want to Become a Delivery Partner</CardTitle>
            <CardDescription>Sign up to deliver items in your local area</CardDescription>
          </CardHeader>
          <CardContent>
            <Truck className="w-16 h-16 mx-auto mb-4" />
            <Button asChild className="w-full">
              <Link href="/become-partner">Become a Partner</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}