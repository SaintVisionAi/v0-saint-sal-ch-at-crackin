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
          address1: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          source: 'Credit Pull Application',
          customField: {
            ssn: formData.ssn,
            dateOfBirth: formData.dateOfBirth,
          },
          tags: ['credit-pull', 'lead'],
        }),
      })

      console.log('GHL Response:', await ghlResponse.text())
    } catch (ghlError) {
      console.error('GHL submission error:', ghlError)
      // Continue even if GHL fails
    }

    // Send email notification using Resend
    try {
      await resend.emails.send({
        from: 'noreply@stackframe.co',
        to: process.env.AGENT_EMAIL!,
        subject: 'New Credit Pull Application',
        html: `
          <h2>New Credit Pull Application</h2>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>DOB:</strong> ${formData.dateOfBirth}</p>
          <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}</p>
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
