export const toLocalDate = (date: string | Date): Date => {
  const utc = new Date(date);
  return new Date(utc.getTime() - utc.getTimezoneOffset() * 60000);
}