export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric chars with hyphens
    .replace(/(^-|-$)/g, '')      // Remove leading/trailing hyphens
    .substring(0, 50);            // Limit length
} 