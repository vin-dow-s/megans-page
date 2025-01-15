import { createSafeActionClient, SafeActionResult } from 'next-safe-action'
import { z } from 'zod'

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
    handleServerError: (error) => {
        if (error instanceof ActionError) {
            return error.message
        }

        return 'Generic error'
    },
})

export const isActionSuccessful = <T extends z.ZodType>(
    action?: SafeActionResult<string, T, readonly [], unknown, unknown>,
): action is {
    data: T
    serverError: undefined
    validationError: undefined
} => {
    if (!action) {
        return false
    }

    if (action.serverError) {
        return false
    }

    if (action.validationErrors) {
        return false
    }

    return true
}
