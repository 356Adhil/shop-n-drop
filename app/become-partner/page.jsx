"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BecomePartner() {
  const [partner, setPartner] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    experience: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPartner(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Partner application submitted:", partner)
    // Here you would typically send the application to your backend
    alert("Application submitted successfully!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Become a Delivery Partner</h1>
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Partner Application</CardTitle>
            <CardDescription>Fill in your details to become a LocalEase delivery partner.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                id="name"
                name="name"
                value={partner.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={partner.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={partner.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label htmlFor="area" className="block text-sm font-medium mb-1">Service Area</label>
              <Input
                id="area"
                name="area"
                value={partner.area}
                onChange={handleChange}
                placeholder="Enter the area you can serve"
                required
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium mb-1">Relevant Experience (Optional)</label>
              <Textarea
                id="experience"
                name="experience"
                value={partner.experience}
                onChange={handleChange}
                placeholder="Describe any relevant delivery or customer service experience"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit Application</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}