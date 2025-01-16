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

/* export const authActionClient = actionClient.use(async ({ next }) => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new ActionError('You are not allowed to create a user')
    }

    return next({ ctx: { user: currentUser } })
})

const createUserAction = authActionClient
  .schema(Schema)
  .action(async ({ parsedInput: { name, email }, ctx: { user } }) => {
    if (!user.isAdmin) {
      throw new Error('You are not allowed to create a user');
    }

    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });

    return createUser;
  }); */

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
