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
          firstName: formData.ownerName.split(' ')[0],
          lastName: formData.ownerName.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          companyName: formData.businessName,
          website: formData.website,
          address1: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          source: 'Merchant Services Application',
          customField: {
            businessType: formData.businessType,
            monthlyVolume: formData.monthlyVolume,
            averageTransaction: formData.averageTransaction,
            serviceType: formData.serviceType,
            currentProcessor: formData.currentProcessor,
            ein: formData.ein,
          },
          tags: ['merchant-services', 'business-lead'],
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
        subject: 'New Merchant Services Application',
        html: `
          <h2>New Merchant Services Application</h2>
          <p><strong>Business Name:</strong> ${formData.businessName}</p>
          <p><strong>Owner:</strong> ${formData.ownerName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Website:</strong> ${formData.website || 'N/A'}</p>
          <p><strong>Business Type:</strong> ${formData.businessType}</p>
          <p><strong>Monthly Volume:</strong> ${formData.monthlyVolume}</p>
          <p><strong>Average Transaction:</strong> ${formData.averageTransaction}</p>
          <p><strong>Service Type:</strong> ${formData.serviceType}</p>
          <p><strong>Current Processor:</strong> ${formData.currentProcessor || 'None'}</p>
          <p><strong>EIN:</strong> ${formData.ein || 'N/A'}</p>
          <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}</p>
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
