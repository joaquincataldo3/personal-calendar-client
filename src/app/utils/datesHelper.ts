import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

export const localDatetimeToUTCString = (localString: string): string => {
  const localDate = new Date(localString);
  return new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000).toISOString();
};

export const sameDayValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const start = new Date(group.get('start_time')?.value);
  const end = new Date(group.get('end_time')?.value);
  if (start.toDateString() !== end.toDateString()) {
    return { notSameDay: true };
  }
  return null;
};

export const startBeforeEndValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const start = new Date(group.get('start_time')?.value);
  const end = new Date(group.get('end_time')?.value);
  if (start >= end) {
    return { startAfterEnd: true };
  }
  return null;
};
