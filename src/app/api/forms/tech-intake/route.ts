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
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          companyName: formData.company,
          source: 'Tech Development Intake',
          customField: {
            projectType: formData.projectType,
            timeline: formData.timeline,
            budget: formData.budget,
            techStack: formData.techStack,
            hasDesign: formData.hasDesign,
            hosting: formData.hosting,
            additionalServices: formData.additionalServices.join(', '),
            projectDescription: formData.projectDescription,
          },
          tags: ['tech-development', 'project-lead'],
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
        subject: 'New Tech Development Project Intake',
        html: `
          <h2>New Tech Development Project</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Company:</strong> ${formData.company || 'N/A'}</p>
          <p><strong>Project Type:</strong> ${formData.projectType}</p>
          <p><strong>Timeline:</strong> ${formData.timeline}</p>
          <p><strong>Budget:</strong> ${formData.budget}</p>
          <p><strong>Tech Stack:</strong> ${formData.techStack || 'Not specified'}</p>
          <p><strong>Has Design:</strong> ${formData.hasDesign}</p>
          <p><strong>Hosting:</strong> ${formData.hosting || 'Not specified'}</p>
          <p><strong>Additional Services:</strong> ${formData.additionalServices.join(', ') || 'None'}</p>
          <hr>
          <p><strong>Project Description:</strong></p>
          <p>${formData.projectDescription}</p>
          <hr>
          <p><strong>Reference URLs:</strong> ${formData.referenceUrls || 'None'}</p>
          <p><strong>Additional Info:</strong> ${formData.additionalInfo || 'N/A'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
    }

    return NextResponse.json({ success: true, message: 'Project intake submitted successfully' })
  } catch (error: any) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit intake' },
      { status: 500 }
    )
  }
}
