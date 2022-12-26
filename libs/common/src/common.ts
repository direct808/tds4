import { join } from 'path'

export const contractsPath = join(__dirname, '../../../../contracts')

export function convertEnum<
  A extends object,
  AValue extends A[keyof A],
  B extends Record<keyof A, BValue>,
  BValue extends B[keyof B],
>(a: A, b: B, aValue: AValue | null): B[keyof B] | null {
  if (aValue === undefined || aValue === null) {
    return null
  }

  let key: keyof A | null = null

  for (const i in a) {
    if (a[i] === aValue) {
      key = i
      break
    }
  }

  if (!key) {
    throw new Error('No key')
  }

  return b[key]
}
