import { contactFormSchema } from '@/lib/schemas'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        // Check if Resend API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured')
            return NextResponse.json(
                { success: false, error: 'Email service not configured' },
                { status: 500 },
            )
        }

        // Check if reCAPTCHA secret key is configured
        if (!process.env.RECAPTCHA_SECRET_KEY) {
            console.error('RECAPTCHA_SECRET_KEY is not configured')
            return NextResponse.json(
                { success: false, error: 'reCAPTCHA service not configured' },
                { status: 500 },
            )
        }

        const body = await req.json()
        const token = body.token

        try {
            const validatedData = contactFormSchema.parse(body)

            // Verify reCAPTCHA
            try {
                const recaptchaResponse = await fetch(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
                )

                const recaptchaData = await recaptchaResponse.json()

                if (!recaptchaData.success) {
                    console.error(
                        'reCAPTCHA verification failed:',
                        recaptchaData,
                    )
                    return NextResponse.json(
                        {
                            success: false,
                            error: 'Failed reCAPTCHA verification',
                        },
                        { status: 400 },
                    )
                }
            } catch (recaptchaError) {
                console.error('Error verifying reCAPTCHA:', recaptchaError)
                return NextResponse.json(
                    { success: false, error: 'Error verifying reCAPTCHA' },
                    { status: 500 },
                )
            }

            // Send the email
            try {
                const response = await resend.emails.send({
                    from: "Megan's Page <no-reply@meganspage.com>",
                    to: 'esyfer.v@gmail.com',
                    subject: `New Blog Message`,
                    text: `You have received a new message from the Contact form:\n\nName: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
                })

                if (response.error) {
                    console.error('Resend API error:', response.error)
                    return NextResponse.json(
                        {
                            success: false,
                            error: `Email service error: ${response.error.message || JSON.stringify(response.error)}`,
                        },
                        { status: 500 },
                    )
                }

                return NextResponse.json({ success: true })
            } catch (emailError) {
                console.error('Error sending email:', emailError)
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Failed to send email through the service',
                    },
                    { status: 500 },
                )
            }
        } catch (validationError) {
            console.error('Form validation error:', validationError)
            return NextResponse.json(
                { success: false, error: 'Invalid form data' },
                { status: 400 },
            )
        }
    } catch (error) {
        console.error('Unexpected error in contact API:', error)
        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred' },
            { status: 500 },
        )
    }
}
