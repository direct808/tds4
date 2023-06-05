import Long = require('long')

export const dateTransformer = {
  to(value: string | number | Long | null): Date | null | undefined {
    console.log('to', value)
    if (value === undefined) {
      return undefined
    }

    if (!value) {
      return null
    }

    if (value instanceof Long) {
      value = value.toNumber()
    }

    if (typeof value === 'string') {
      value = parseInt(value, 10)
    }

    if (typeof value === 'number') {
      return new Date(value)
    }

    return value
  },
  from(value: unknown): string | null {
    if (value instanceof Date) {
      return value.toISOString()
    }

    return null
  },
}
