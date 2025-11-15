'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function MerchantServicesPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
    monthlyVolume: '',
    averageTransaction: '',
    serviceType: '',
    currentProcessor: '',
    ein: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    additionalInfo: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/forms/merchant-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        alert('Merchant services application submitted successfully! We will contact you within 24 hours.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-gray-800/50 backdrop-blur rounded-lg p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">Merchant Services Application</h1>
          <p className="text-gray-300 mb-8">
            Payment processing and payroll solutions for your business
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white text-sm mb-2 block">Business Name *</label>
              <Input
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">Owner/Contact Name *</label>
                <Input
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">EIN (Tax ID)</label>
                <Input
                  value={formData.ein}
                  onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="XX-XXXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Email *</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">Phone Number *</label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Website</label>
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="https://"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Business Type *</label>
              <select
                required
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select business type</option>
                <option value="retail">Retail</option>
                <option value="restaurant">Restaurant/Food Service</option>
                <option value="ecommerce">E-commerce</option>
                <option value="professional">Professional Services</option>
                <option value="healthcare">Healthcare</option>
                <option value="construction">Construction</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">Monthly Transaction Volume *</label>
                <select
                  required
                  value={formData.monthlyVolume}
                  onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                  className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
                >
                  <option value="">Select volume</option>
                  <option value="0-5k">$0 - $5,000</option>
                  <option value="5k-25k">$5,000 - $25,000</option>
                  <option value="25k-100k">$25,000 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Average Transaction Size *</label>
                <Input
                  required
                  value={formData.averageTransaction}
                  onChange={(e) => setFormData({ ...formData, averageTransaction: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="$0.00"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Services Needed *</label>
              <select
                required
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select service</option>
                <option value="payment">Payment Processing Only</option>
                <option value="payroll">Payroll Services Only</option>
                <option value="both">Payment Processing + Payroll</option>
                <option value="pos">POS System</option>
                <option value="full">Full Suite (All Services)</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Current Processor (if any)</label>
              <Input
                value={formData.currentProcessor}
                onChange={(e) => setFormData({ ...formData, currentProcessor: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="e.g., Square, Stripe, etc."
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Business Address *</label>
              <Input
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">City *</label>
                <Input
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">State *</label>
                <Input
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                  maxLength={2}
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">ZIP Code *</label>
                <Input
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Additional Information</label>
              <Textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="Any specific requirements or questions..."
                rows={4}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>

            <p className="text-gray-400 text-sm text-center">
              We'll review your application and provide a custom quote within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
