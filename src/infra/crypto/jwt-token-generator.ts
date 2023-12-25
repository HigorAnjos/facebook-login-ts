import { type TokenGenerator } from '@/data/Contracts/crypto'
import { sign } from 'jsonwebtoken'

type Params = TokenGenerator.Params
type Result = TokenGenerator.Result

export class JwtTokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken ({ expirationInMs, key }: Params): Promise<Result> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }
}
