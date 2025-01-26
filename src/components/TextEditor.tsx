// Packages
import { formats, modules } from '@/lib/quill'
import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

// Styles
import 'quill/dist/quill.snow.css'

type EditorProps = {
    value?: string
    onChange: (value: string) => void
}

const TextEditor = ({
    value,
    onChange,
    className,
}: EditorProps & { className?: string }) => {
    const { quill, quillRef } = useQuill({
        modules,
        formats,
        theme: 'snow',
    })

    // Set the initial value of the editor
    useEffect(() => {
        if (quill && value !== undefined) {
            // Prevent re-setting the value if it matches the editor content
            if (quill.root.innerHTML !== value) {
                quill.root.innerHTML = value
            }
        }
    }, [quill, value])

    //  Sync the editor content with the parent component
    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                const editorValue = quill.root.innerHTML
                onChange(editorValue)
            })
        }
    }, [quill, onChange])

    if (!quillRef) {
        return <div>Loading editor...</div>
    }

    return <div ref={quillRef} className={className} />
}

export default TextEditor
