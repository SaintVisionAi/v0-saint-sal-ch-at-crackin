import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()

    // Send to GoHighLevel CRM
    try {
      const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.company,
          source: 'Investment Offering',
          customField: {
            investmentAmount: formData.investmentAmount,
            investmentType: formData.investmentType,
            accreditedInvestor: formData.accreditedInvestor,
            experience: formData.experience,
            goals: formData.goals,
            timeline: formData.timeline,
          },
          tags: ['investment', 'qualified-lead'],
        }),
      })

      console.log('GHL Response:', await ghlResponse.text())
    } catch (ghlError) {
      console.error('GHL submission error:', ghlError)
    }

    // Send email notification
    try {
      await resend.emails.send({
        from: 'noreply@stackframe.co',
        to: process.env.AGENT_EMAIL!,
        subject: 'New Investment Application',
        html: `
          <h2>New Investment Application</h2>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Company:</strong> ${formData.company || 'N/A'}</p>
          <p><strong>Investment Amount:</strong> ${formData.investmentAmount}</p>
          <p><strong>Investment Type:</strong> ${formData.investmentType}</p>
          <p><strong>Accredited Investor:</strong> ${formData.accreditedInvestor}</p>
          <p><strong>Experience:</strong> ${formData.experience}</p>
          <p><strong>Timeline:</strong> ${formData.timeline}</p>
          <p><strong>Goals:</strong> ${formData.goals}</p>
          <p><strong>Additional Info:</strong> ${formData.additionalInfo || 'N/A'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
    }

    return NextResponse.json({ success: true, message: 'Application submitted successfully' })
  } catch (error: any) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit application' },
      { status: 500 }
    )
  }
}
