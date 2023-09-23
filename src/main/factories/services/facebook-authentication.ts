import { FacebookAuthenticationService } from '@/data/services'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeFacebookApi } from '@/main/factories/apis'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenGenerator()
  )
}
