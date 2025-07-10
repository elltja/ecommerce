'use server';

import { canCreateReview } from '~/permissions/review';
import { auth } from '../auth';
import { redirect } from '~/i18n/navigation';
import { getLocale } from 'next-intl/server';
import { db } from '../db';
import { reviewSchema } from '~/lib/schemas/review';

export async function createReview(
  productId: string,
  rawData: { text: string; rating: number },
) {
  const session = await auth();

  if (!session || !canCreateReview(session.user)) {
    redirect({
      href: '/account/auth',
      locale: await getLocale(),
    });
  }

  try {
    const data = reviewSchema.parse({
      ...rawData,
      productId,
      userId: session?.user.id,
    });

    await db.review.create({
      data,
    });
  } catch (error) {
    console.error(error);

    throw new Error('Failed to create review');
  }
}

export async function deleteReview(id: string) {
  await db.review.delete({
    where: { id },
  });
}
