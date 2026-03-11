export const formatDisplayName = (email?: string | null) => {
  if (!email) return 'Taras';
  const rawName = email.split('@')[0];
  if (!rawName) return 'Taras';
  return rawName.charAt(0).toUpperCase() + rawName.slice(1);
};
