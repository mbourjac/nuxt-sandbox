import { insertLocationSchema } from '../../lib/db/schema';
import {
  findLocationByName,
  findUniqueSlug,
  insertLocation,
} from '../../lib/db/queries/location';
import slug from 'slug';

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

  const existingLocation = await findLocationByName(
    result.data,
    event.context.user.id
  );

  if (existingLocation) {
    return sendError(
      event,
      createError({
        statusCode: 409,
        statusMessage: 'A location with that name already exists.',
      })
    );
  }

  const locationSlug = await findUniqueSlug(slug(result.data.name));

  try {
    return insertLocation(result.data, locationSlug, event.context.user.id);
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
