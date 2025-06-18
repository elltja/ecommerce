import { db } from '~/server/db';

export async function cleanUpTestProduct(slug: string) {
  await db.product.deleteMany({ where: { slug } });
}

function defaultSlugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getUniqueSlug(name: string): Promise<string> {
  const baseSlug = defaultSlugify(name);
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await db.product.findUnique({ where: { slug } });
    if (!existing) break;

    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}
