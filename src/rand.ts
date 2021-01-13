import { promisify as _p } from "util";
import crypto from "crypto";

export async function srand(): Promise<number> {
  return parseInt((await _p(crypto.randomBytes)(8)).toString("hex"), 16) / 18446744073709552000;
}

export function srandSync(): number {
  return parseInt(crypto.randomBytes(8).toString("hex"), 16) / 18446744073709552000;
}

export async function range(max: number, min: number = 0): Promise<number> {
  return (await srand()) * (max - min) + min;
}

export function rangeSync(max: number, min: number = 0): number {
  return srandSync() * (max - min) + min;
}

export async function rangeInt(max: number, min: number = 0): Promise<number> {
  return Math.round(await range(max, min));
}

export function rangeIntSync(max: number, min: number = 0): number {
  return Math.round(rangeSync(max, min));
}

export async function rbool(weight: number = 0.5): Promise<boolean> {
  return (await srand()) < weight;
}

export function rboolSync(weight: number = 0.5): boolean {
  return srandSync() < weight;
}

export async function randomElement<T>(arr: T[]): Promise<T> {
  return arr[await rangeInt(arr.length - 1)];
}

export function randomElementSync<T>(arr: T[]): T {
  return arr[rangeIntSync(arr.length - 1)];
}