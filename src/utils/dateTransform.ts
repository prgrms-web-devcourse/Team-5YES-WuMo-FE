export const replaceDateSlashWithDot = (date: string) => {
  return date.slice(2, 10).replaceAll('-', '.');
};
