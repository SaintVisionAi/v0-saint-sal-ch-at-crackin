'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function InvestmentPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    investmentAmount: '',
    investmentType: '',
    accreditedInvestor: '',
    experience: '',
    goals: '',
    timeline: '',
    additionalInfo: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/forms/investment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        alert('Investment application submitted successfully! Our team will contact you shortly.')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          investmentAmount: '',
          investmentType: '',
          accreditedInvestor: '',
          experience: '',
          goals: '',
          timeline: '',
          additionalInfo: '',
        })
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-gray-800/50 backdrop-blur rounded-lg p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">Investment Offering</h1>
          <p className="text-gray-300 mb-8">
            Join our exclusive investment opportunities and grow your portfolio
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
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Last Name *</label>
                <Input
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
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
              <label className="text-white text-sm mb-2 block">Company/Organization</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Investment Amount *</label>
              <select
                required
                value={formData.investmentAmount}
                onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select amount range</option>
                <option value="10k-50k">$10,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-250k">$100,000 - $250,000</option>
                <option value="250k-500k">$250,000 - $500,000</option>
                <option value="500k+">$500,000+</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Investment Type *</label>
              <select
                required
                value={formData.investmentType}
                onChange={(e) => setFormData({ ...formData, investmentType: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select investment type</option>
                <option value="equity">Equity</option>
                <option value="debt">Debt</option>
                <option value="convertible">Convertible Note</option>
                <option value="safe">SAFE</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Are you an accredited investor? *</label>
              <select
                required
                value={formData.accreditedInvestor}
                onChange={(e) => setFormData({ ...formData, accreditedInvestor: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">Not Sure</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Investment Experience *</label>
              <select
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (3-5 years)</option>
                <option value="experienced">Experienced (5-10 years)</option>
                <option value="expert">Expert (10+ years)</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Investment Goals *</label>
              <Textarea
                required
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="Describe your investment goals..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Investment Timeline *</label>
              <select
                required
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select timeline</option>
                <option value="short">Short-term (1-3 years)</option>
                <option value="medium">Medium-term (3-7 years)</option>
                <option value="long">Long-term (7+ years)</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Additional Information</label>
              <Textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="Any additional details or questions..."
                rows={4}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Investment Application'
                )}
              </Button>
            </div>

            <p className="text-gray-400 text-sm text-center">
              All information is confidential and will be used solely for investment evaluation.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
