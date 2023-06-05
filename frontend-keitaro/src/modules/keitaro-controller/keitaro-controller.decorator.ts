export const handlers: any[] = []

export const KeitaroController = (
  method: 'GET' | 'POST',
  object: string,
): MethodDecorator => {
  return (target, propertyKey) => {
    handlers.push({
      name: object,
      method,
      target,
      propertyKey,
    })
  }
}
