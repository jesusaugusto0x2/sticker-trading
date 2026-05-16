export const generateSlug = (name: string, userId: string): string => {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return `${slug}-${userId}`;
};

// UUID is always 36 chars: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export const extractUserId = (slug: string): string => {
  return slug.slice(-36);
};
