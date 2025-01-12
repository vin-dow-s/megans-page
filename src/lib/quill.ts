import 'quill/dist/quill.snow.css'

// Quill modules configuration
export const modules = {
    toolbar: {
        container: [
            [{ header: [2, 3, false] }], // Headings
            ['bold', 'italic', 'underline', 'strike', 'blockquote'], // Text styling
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            [{ align: [] }], // Alignments
            ['link', 'image'], // Media
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            ['clean'], // Clear formatting
        ],
    },
}

// Quill formats configuration
export const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'align',
    'list',
    'link',
    'image',
    'color',
    'background',
]
