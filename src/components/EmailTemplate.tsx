type EmailTemplateProps = {
    name: string
    email: string
    message: string
}

const EmailTemplate = ({ name, email, message }: EmailTemplateProps) => (
    <div style={{ fontFamily: 'inherit', lineHeight: '1.5' }}>
        {' '}
        <p>You have received a new message from the Contact form:</p>
        <p>
            <strong>Name:</strong> {name}
        </p>
        <p>
            <strong>Email:</strong> {email}
        </p>
        <p>
            <strong>Message:</strong>
        </p>
        <pre
            style={{
                whiteSpace: 'pre-wrap',
            }}
        >
            {message}
        </pre>
    </div>
)

export default EmailTemplate
