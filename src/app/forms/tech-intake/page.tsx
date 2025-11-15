'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function TechIntakePage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    techStack: '',
    hasDesign: '',
    hosting: '',
    additionalServices: [] as string[],
    referenceUrls: '',
    additionalInfo: '',
  })

  const handleCheckboxChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter((s) => s !== service)
        : [...prev.additionalServices, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/forms/tech-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        alert('Tech project intake submitted successfully! We will review and contact you within 48 hours.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-gray-800/50 backdrop-blur rounded-lg p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">Tech Development Intake</h1>
          <p className="text-gray-300 mb-8">
            Let's build something amazing together - tell us about your project
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">Full Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Company/Project Name</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
              <label className="text-white text-sm mb-2 block">Project Type *</label>
              <select
                required
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select project type</option>
                <option value="web-app">Web Application</option>
                <option value="mobile-app">Mobile App (iOS/Android)</option>
                <option value="website">Website/Landing Page</option>
                <option value="ecommerce">E-commerce Store</option>
                <option value="api">API/Backend Development</option>
                <option value="ai-ml">AI/ML Integration</option>
                <option value="automation">Business Automation</option>
                <option value="saas">SaaS Platform</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Project Description *</label>
              <Textarea
                required
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="Describe your project, goals, target audience, and key features..."
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm mb-2 block">Timeline *</label>
                <select
                  required
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP (1-4 weeks)</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6+-months">6+ months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Budget Range *</label>
                <select
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
                >
                  <option value="">Select budget</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-30k">$15,000 - $30,000</option>
                  <option value="30k-50k">$30,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                  <option value="discuss">Prefer to discuss</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Preferred Tech Stack (if any)</label>
              <Input
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="e.g., React, Next.js, Python, Node.js, etc."
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Do you have designs ready? *</label>
              <select
                required
                value={formData.hasDesign}
                onChange={(e) => setFormData({ ...formData, hasDesign: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select option</option>
                <option value="yes-complete">Yes, complete designs</option>
                <option value="yes-partial">Yes, partial designs</option>
                <option value="no-need-design">No, need design services</option>
                <option value="no-wireframes">No, but have wireframes</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Hosting Preference</label>
              <select
                value={formData.hosting}
                onChange={(e) => setFormData({ ...formData, hosting: e.target.value })}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md px-3 py-2"
              >
                <option value="">Select hosting</option>
                <option value="vercel">Vercel</option>
                <option value="aws">AWS</option>
                <option value="azure">Azure</option>
                <option value="gcp">Google Cloud</option>
                <option value="other">Other</option>
                <option value="not-sure">Not sure, need recommendation</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Additional Services Needed</label>
              <div className="space-y-2 mt-2">
                {[
                  'UI/UX Design',
                  'Database Setup',
                  'API Development',
                  'Payment Integration',
                  'User Authentication',
                  'Admin Dashboard',
                  'Analytics/Reporting',
                  'Mobile App',
                  'SEO Optimization',
                  'Ongoing Maintenance',
                ].map((service) => (
                  <label key={service} className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="mr-2 h-4 w-4"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Reference URLs</label>
              <Textarea
                value={formData.referenceUrls}
                onChange={(e) => setFormData({ ...formData, referenceUrls: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="Share links to websites/apps you like or want to emulate..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Additional Information</label>
              <Textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
                placeholder="Any other details, questions, or requirements..."
                rows={4}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Project Intake'
                )}
              </Button>
            </div>

            <p className="text-gray-400 text-sm text-center">
              We'll review your project and schedule a discovery call within 48 hours.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
