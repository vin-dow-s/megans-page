import { contactFormSchema } from '@/lib/schemas'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const token = body.token

        const validatedData = contactFormSchema.parse(body)

        const recaptchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        )

        const recaptchaData = await recaptchaResponse.json()

        if (!recaptchaData.success) {
            return NextResponse.json(
                { success: false, error: 'Failed reCAPTCHA verification' },
                { status: 400 },
            )
        }

        // Send the email
        const response = await resend.emails.send({
            from: 'no-reply@meganspage.com',
            to: 'contact.meganspage@gmail.com',
            subject: `New Blog Message`,
            text: `You have received a new message from the Contact form:\n\nName: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
        })

        if (response.error) {
            return NextResponse.json(
                { success: false, error: response.error },
                { status: 500 },
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to send email' },
            { status: 500 },
        )
    }
}
