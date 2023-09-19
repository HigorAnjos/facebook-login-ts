export class ServerError extends Error {
  constructor (error?: Error | unknown) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    if (error instanceof Error) {
      this.stack = error.stack
    }
  }
}
