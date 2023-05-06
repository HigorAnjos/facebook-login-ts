import { type LoadFacebookUserApi } from '@/data/Contracts/apis'
import { type LoadUserAccountRepository, type CreateFacebookAccountRepository } from '@/data/Contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUser: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbDate = await this.loadFacebookUser.loadUser(params)
    if (fbDate !== undefined) {
      await this.userAccountRepo.load({ email: fbDate.email })
      await this.userAccountRepo.createFromFacebook(fbDate)
    }
    return new AuthenticationError()
  }
}
