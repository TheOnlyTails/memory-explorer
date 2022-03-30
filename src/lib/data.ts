import { writable } from "svelte/store"

export type FieldType = "string" | "int" | "double" | "boolean" | "object" | "null" | "error"

export type Object = {
  name: string,
  fields: {
    key: string,
    value: string,
    type?: FieldType
  }[]
}

export const objects = writable<Object[]>([])

export const typeFromValue = (x: string): FieldType => {
  let type: FieldType = "error"

  // "something"
  if (x.match(/^"[\w\s]*"$/gi)) type = "string"
  // 123
  else if (x.match(/^\d+$/gi)) type = "int"
  // 123.456
  else if (x.match(/^\d+\.\d+$/gi)) type = "double"
  // true/false
  else if (x.match(/^true|false$/gi)) type = "boolean"
  // @objectName
  else if (x.match(/^@\w+$/gi)) type = "object"
  // null
  else if (x.match(/^null$/gi)) type = "null"

  return type
}