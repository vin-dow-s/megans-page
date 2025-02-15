'use client'

// Packages
import { zodResolver } from '@hookform/resolvers/zod'
import { ReCaptchaProvider, useReCaptcha } from 'next-recaptcha-v3'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Schemas
import { contactFormSchema } from '@/lib/schemas'

// Types
import { ContactFormValues } from '@/lib/types'

// Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [captchaLoaded, setCaptchaLoaded] = useState(false)

    const { executeRecaptcha } = useReCaptcha()

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    })

    // Load reCAPTCHA only when user interacts with the form
    const handleInteraction = () => {
        if (!captchaLoaded) setCaptchaLoaded(true)
    }

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true)
        setSuccessMessage('')
        setErrorMessage('')

        try {
            const token = await executeRecaptcha('form_submit')

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, token }),
            })

            if (!response.ok) throw new Error('Something went wrong')

            setSuccessMessage('Message sent. Thanks!')

            form.reset()
        } catch (error) {
            setErrorMessage('Failed to send the message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {captchaLoaded && (
                <ReCaptchaProvider
                    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                />
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    onFocus={handleInteraction}
                    className="w-full space-y-8 px-2 sm:w-80"
                >
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your name"
                                        className="rounded-sm shadow-xs"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="rounded-sm shadow-xs"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Message Field */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={5}
                                        placeholder="Write your message..."
                                        className="rounded-sm shadow-xs"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="main-button mb-2 w-full shadow-xs"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <div className="text-xs text-gray-400">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <Link href="https://policies.google.com/privacy">
                            Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link href="https://policies.google.com/terms">
                            Terms of Service
                        </Link>{' '}
                        apply.
                    </div>

                    {/* Success/Error Messages */}
                    {successMessage && (
                        <p className="text-center text-green-700">
                            {successMessage}
                        </p>
                    )}
                    {errorMessage && (
                        <p className="text-center text-red-700">
                            {errorMessage}
                        </p>
                    )}
                </form>
            </Form>
        </>
    )
}
