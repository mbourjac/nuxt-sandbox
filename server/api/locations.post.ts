import slug from 'slug';
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

  try {
    const [created] = await db
      .insert(location)
      .values({
        ...result.data,
        slug: slug(result.data.name),
        userId: event.context.user.id,
      })
      .returning();

    return created;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        'SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.slug'
    ) {
      return sendError(
        event,
        createError({
          statusCode: 409,
          statusMessage:
            'Slug must be unique (the location name is used to generate the slug).',
        })
      );
    }

    throw error;
  }
});
