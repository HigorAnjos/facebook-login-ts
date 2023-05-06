import { type LoadFacebookUserApi } from '@/data/Contracts/apis'
import { type LoadUserAccountRepository, type CreateFacebookAccountRepository, type UpdateFacebookAccountRepository } from '@/data/Contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUser: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbDate = await this.loadFacebookUser.loadUser(params)
    if (fbDate !== undefined) {
      const accoutData = await this.userAccountRepo.load({ email: fbDate.email })
      if (accoutData?.name !== undefined) {
        await this.userAccountRepo.updateWithFacebook({
          id: accoutData.id,
          name: accoutData.name,
          facebookId: fbDate.facebookId
        })
      } else {
        await this.userAccountRepo.createFromFacebook(fbDate)
      }
    }
    return new AuthenticationError()
  }
}
