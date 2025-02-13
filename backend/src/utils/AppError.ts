class AppError {
  message: string
  StatusCode: number

  constructor(message: string, StatusCode = 400) {
    this.message = message
    this.StatusCode = StatusCode
  }
}

export { AppError }
