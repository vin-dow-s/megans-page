import { useToast } from '@/hooks/use-toast'

export const useCustomToast = () => {
    const { toast } = useToast()

    const displaySuccessToast = (description: string) => {
        toast({
            description,
            className:
                'bg-green-50 border-green-600 text-green-950 top-0 right-0 flex fixed max-w-[420px] top-4 right-4',
        })
    }

    const displayWarningToast = (description: string) => {
        toast({
            description,
            className:
                'bg-yellow-50 border-yellow-600 text-yellow-950 top-0 right-0 flex fixed max-w-[420px] top-4 right-4',
        })
    }

    const displayErrorToast = (description: string) => {
        toast({
            description,
            className:
                'bg-red-50 border-red-600 text-red-950 top-0 right-0 flex fixed max-w-[420px] top-4 right-4',
        })
    }

    return { displaySuccessToast, displayWarningToast, displayErrorToast }
}
