import { type LoadFacebookUserApi } from '@/data/Contracts/apis'
import { type LoadUserAccountRepository, type SaveFacebookAccountRepository } from '@/data/Contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUser: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbDate = await this.loadFacebookUser.loadUser(params)
    if (fbDate !== undefined) {
      const accoutData = await this.userAccountRepo.load({ email: fbDate.email })
      await this.userAccountRepo.saveWithFacebook({
        id: accoutData?.id,
        name: accoutData?.name ?? fbDate.name,
        email: fbDate.email,
        facebookId: fbDate.facebookId
      })
    }
    return new AuthenticationError()
  }
}
