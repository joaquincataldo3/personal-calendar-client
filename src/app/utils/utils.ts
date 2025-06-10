export const toLocalDate = (date: string | Date): Date => {
  const utc = new Date(date);
  return new Date(utc.getTime() - utc.getTimezoneOffset() * 60000);
}

export const toDatetimeLocalString = (date: string | Date): string => {
  const local = toLocalDate(date);
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = local.getFullYear();
  const month = pad(local.getMonth() + 1);
  const day = pad(local.getDate());
  const hours = pad(local.getHours());
  const minutes = pad(local.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};