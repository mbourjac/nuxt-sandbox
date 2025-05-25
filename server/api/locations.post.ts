import { db } from '../../lib/db';
import { insertLocationSchema, location } from '../../lib/db/schema';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    );
  }

  const result = await readValidatedBody(event, insertLocationSchema.safeParse);

  if (!result.success) {
    const data = result.error.issues.reduce<Record<string, string>>(
      (errors, issue) => {
        errors[issue.path.join('')] = issue.message;
        return errors;
      },
      {}
    );

    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: 'Invalid body.',
        data,
      })
    );
  }

  const [created] = await db
    .insert(location)
    .values({
      ...result.data,
      slug: result.data.name.replaceAll(' ', '-').toLowerCase(),
      userId: event.context.user.id,
    })
    .returning();

  return created;
});
