import * as crypto from "crypto";

export function generateUuid() {
  return crypto.randomUUID();
}

export function generateEmail() {
  return `${generateUuid()}@mock.me`;
}

export function getTimestampPlusDays(days: number) {
  const date = new Date();
  return new Date(date.setDate(date.getDate() + days));
}

export function getTimestampPlusMinutes(minutes: number) {
  const date = new Date();
  return new Date(date.setMinutes(date.getMinutes() + minutes));
}
