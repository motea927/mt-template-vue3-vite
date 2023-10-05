const camelizeString = (str: string) => {
  const reg = /[._-](\w|$)/g
  return str.replace(reg, (_match, p1) => p1.toUpperCase())
}

const snakifyString = (str: string) => {
  const reg = /(?:^|\.?)([A-Z])/g
  return str.replace(reg, (_match, p1) => `_${p1.toLowerCase()}`)
}

const isDate = (obj: unknown) => {
  return Object.prototype.toString.call(obj) === '[object Date]'
}

const isRegex = (obj: unknown) => {
  return Object.prototype.toString.call(obj) === '[object RegExp]'
}

const isArray =
  Array.isArray ||
  function (obj: unknown) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

const converter = (
  obj: unknown,
  stringFunc: (str: string) => string,
  keyFunction: (arg: unknown) => unknown
) => {
  if (typeof obj === 'string') return stringFunc(obj)
  if (!obj || typeof obj !== 'object') return obj
  if (isDate(obj) || isRegex(obj)) return obj
  if (isArray(obj)) return obj.map((element) => keyFunction(element))

  // normal case, object
  const newObj: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    newObj[stringFunc(key)] = keyFunction(value)
  }
  return newObj
}

const camelizeKey = (obj: unknown) => converter(obj, camelizeString, camelizeKey)
const snakifyKey = (obj: unknown) => converter(obj, snakifyString, snakifyKey)

const debounce = <F extends (...params: any[]) => void>(
  fn: F,
  delay: number,
  immediate = false
) => {
  let timerID: number | NodeJS.Timeout = 0

  return function (this: any, ...args: any[]) {
    clearTimeout(timerID)
    const shouldCallImmediately = !timerID && immediate
    if (shouldCallImmediately) {
      fn.apply(this, args)
    }

    timerID = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, args)
      }
      timerID = 0
    }, delay)
  } as F
}

export { camelizeKey, snakifyKey, debounce }
