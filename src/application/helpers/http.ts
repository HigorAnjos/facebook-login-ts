export type HttpResponse = {
  statusCode: number
  data: any
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})

export const unau = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})
