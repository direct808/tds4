export type MethodList<T> = {
  [key in keyof T]: (...args: any) => T[key] | Promise<T[key]>
}

export {}
