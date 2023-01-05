export type TGqlTypeGenerator<
  GqlObject,
  ResolveFields extends keyof GqlObject = never,
> = {
  flat: Omit<GqlObject, ResolveFields>
  resolver: {
    [K in ResolveFields]: (...args: any) => Promise<any>
  }
}
