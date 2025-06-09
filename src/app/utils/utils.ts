export const toLocalDate = (dateString: string): Date => {
  const utc = new Date(dateString);
  return new Date(utc.getTime() - utc.getTimezoneOffset() * 60000);
}