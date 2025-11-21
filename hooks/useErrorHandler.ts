import { toast } from "sonner"

type ErrorResponse = {
    response?: {
        data?: {
            code?: string
        }
    }
}

export const useErrorHandler = () => {
    const handleError = (error: any) => {
        const errorMessage = getErrorCode(error)
        toast.error(errorMessage)
        return errorMessage
    }

    const getErrorCode = (error: unknown): string => {
        const err = error as ErrorResponse
        return err?.response?.data?.code || 'An unknown error occurred'
    }

    return { handleError, getErrorCode }
}

export const withErrorHandling = <TArgs extends any[], TReturn>(
    fn: (...args: TArgs) => Promise<TReturn>
) => {
    return async (...args: TArgs) => {
        try {
            return await fn(...args)
        } catch (error) {
            const errorMessage = getErrorCode(error)
            toast.error(errorMessage)
            throw error
        }
    }
}

// Helper function to get error code
const getErrorCode = (error: unknown): string => {
    const err = error as ErrorResponse
    return err?.response?.data?.code || 'An unknown error occurred'
}
