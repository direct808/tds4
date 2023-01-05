const pattern = /\{(?<name>\w+)(?::(?<args>(\w+?)(?:,(\w+?))*))?}/gm

type ValueTypes = Record<
  string,
  | number
  | string
  | null
  | undefined
  | ((...args: string[]) => number | string | null | undefined)
>

type Options = {
  values: ValueTypes
  encodeUri?: boolean
}

export function templateParser(template: string, options: Options): string {
  const { values, encodeUri } = options
  let ret = template
  const match = template.matchAll(pattern)
  for (const m of match) {
    const name = m.groups!.name
    if (!values[name]) {
      continue
    }

    const args = m.groups?.args?.split(',') ?? []
    const value = values[name]

    let val = typeof value === 'function' ? value(...args) : value

    if (typeof val === 'number') {
      val = String(val)
    }

    val ??= ''

    if (encodeUri) {
      val = encodeURIComponent(val)
    }

    ret = ret.replace(m[0], val)
  }

  return ret
}
