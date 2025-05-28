import { and, eq } from 'drizzle-orm';
import { db } from '..';
import { type InsertLocation, location } from '../schema';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 5);

export const findLocationByName = async (
  existingLocation: InsertLocation,
  userId: number
) => {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existingLocation.name),
      eq(location.userId, userId)
    ),
  });
};

export const findLocationBySlug = async (locationSlug: string) => {
  return db.query.location.findFirst({
    where: eq(location.slug, locationSlug),
  });
};

export const findUniqueSlug = async (slug: string) => {
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const slugWithNanoid = `${slug}-${nanoid()}`;

    existing = !!(await findLocationBySlug(slugWithNanoid));

    if (!existing) {
      return slugWithNanoid;
    }
  }

  return slug;
};

export const insertLocation = async (
  insertable: InsertLocation,
  slug: string,
  userId: number
) => {
  const [created] = await db
    .insert(location)
    .values({
      ...insertable,
      slug,
      userId,
    })
    .returning();

  return created;
};
