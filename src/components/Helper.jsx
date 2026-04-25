export const getToday = () => new Date().toISOString().split('T')[0];

export const getValidUntil = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
};