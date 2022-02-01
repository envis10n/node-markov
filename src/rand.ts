import { promisify as _p } from "util";
import crypto from "crypto";

/**
 * Generate a random value between 0.0 and 1.0 using a 64-bit crypto generated value.
 * @returns A promise resolving to a random number.
 */
export async function srand(): Promise<number> {
  return parseInt((await _p(crypto.randomBytes)(8)).toString("hex"), 16) / 18446744073709552000;
}

/**
 * Generate a random value between 0.0 and 1.0 using a 64-bit crypto generated value.
 * @returns A random number.
 */
export function srandSync(): number {
  return parseInt(crypto.randomBytes(8).toString("hex"), 16) / 18446744073709552000;
}

/**
 * Generate a random value in a range (inclusive).
 * @param max The maximum value.
 * @param min The minimum value.
 * @returns A promise resolving to a random number.
 */
export async function range(max: number, min: number = 0): Promise<number> {
  return (await srand()) * (max - min) + min;
}

/**
 * Generate a random value in a range (inclusive).
 * @param max The maximum value.
 * @param min The minimum value.
 * @returns A random number.
 */
export function rangeSync(max: number, min: number = 0): number {
  return srandSync() * (max - min) + min;
}

/**
 * Generate a random value in a range (inclusive) and round the result to the nearest whole number.
 * @param max The maximum value.
 * @param min The minimum value.
 * @returns A promise resolving to a random whole number.
 */
export async function rangeInt(max: number, min: number = 0): Promise<number> {
  return Math.round(await range(max, min));
}

/**
 * Generate a random value in a range (inclusive) and round the result to the nearest whole number.
 * @param max The maximum value.
 * @param min The minimum value.
 * @returns A random whole number.
 */
export function rangeIntSync(max: number, min: number = 0): number {
  return Math.round(rangeSync(max, min));
}

/**
 * Generate a random weighted boolean.
 * @param weight The chance that the result will be true.
 * @returns A promise resolving to a random boolean value.
 */
export async function rbool(weight: number = 0.5): Promise<boolean> {
  return (await srand()) < weight;
}

/**
 * Generate a random weighted boolean.
 * @param weight The chance that the result will be true.
 * @returns A random boolean value.
 */
export function rboolSync(weight: number = 0.5): boolean {
  return srandSync() < weight;
}

/**
 * Pick a random element from an array.
 * @param arr The array to get the element from.
 * @returns A promise resolving to a random element from the input array.
 */
export async function randomElement<T>(arr: T[]): Promise<T> {
  return arr[await rangeInt(arr.length - 1)];
}

/**
 * Pick a random element from an array.
 * @param arr The array to get the element from.
 * @returns A random element from the input array.
 */
export function randomElementSync<T>(arr: T[]): T {
  return arr[rangeIntSync(arr.length - 1)];
}