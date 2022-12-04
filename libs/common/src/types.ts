export type MethodList<T> = {
  [key in keyof T]: (...args: any) => T[key] | Promise<T[key]>
}

export type TGqlTypeGenerator<
  GqlObject,
  ResolveFields extends keyof GqlObject = never,
> = {
  flat: Omit<GqlObject, ResolveFields>
  resolver: {
    [K in ResolveFields]: (...args: any) => Promise<any>
  }
}
