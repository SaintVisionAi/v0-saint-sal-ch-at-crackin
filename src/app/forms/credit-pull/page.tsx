'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function CreditPullPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ssn: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Submit to your backend/CRM
      const response = await fetch('/api/forms/credit-pull', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        alert('Credit pull application submitted successfully!')
        // Redirect to credit check service
        window.open('https://member.myscoreiq.com/get-fico-max.aspx?offercode=4321396P', '_blank')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-gray-800/50 backdrop-blur rounded-lg p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">Credit Pull Application</h1>
          <p className="text-gray-300 mb-8">
            Get your FICO credit score and comprehensive credit report
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">First Name *</label>
                <Input
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Last Name *</label>
                <Input
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="Doe"
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
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Phone Number *</label>
              <Input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">Social Security Number *</label>
                <Input
                  required
                  value={formData.ssn}
                  onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="XXX-XX-XXXX"
                  maxLength={11}
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Date of Birth *</label>
                <Input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Street Address *</label>
              <Input
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="123 Main St"
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
                  placeholder="New York"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">State *</label>
                <Input
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                  placeholder="NY"
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
                  placeholder="10001"
                  maxLength={5}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>

            <p className="text-gray-400 text-sm text-center">
              By submitting this form, you authorize us to pull your credit report.
              Your information is encrypted and secure.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
