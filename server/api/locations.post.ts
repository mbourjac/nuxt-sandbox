import slug from 'slug';
import { db } from '../../lib/db';
import { insertLocationSchema, location } from '../../lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 5);

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

  const existingLocation = await db.query.location.findFirst({
    where: and(
      eq(location.name, result.data.name),
      eq(location.userId, event.context.user.id)
    ),
  });

  if (existingLocation) {
    return sendError(
      event,
      createError({
        statusCode: 409,
        statusMessage: 'A location with that name already exists.',
      })
    );
  }

  let locationSlug = slug(result.data.name);
  let existing = !!(await db.query.location.findFirst({
    where: eq(location.slug, locationSlug),
  }));

  while (existing) {
    const locationSlugWithNanoid = `${locationSlug}-${nanoid()}`;

    existing = !!(await db.query.location.findFirst({
      where: eq(location.slug, locationSlugWithNanoid),
    }));

    if (!existing) {
      locationSlug = locationSlugWithNanoid;
    }
  }

  try {
    const [created] = await db
      .insert(location)
      .values({
        ...result.data,
        slug: locationSlug,
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
