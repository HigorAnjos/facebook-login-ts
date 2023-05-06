// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LoadFacebookUserApi } from '@/data/Contracts/apis'
import { type LoadUserAccountRepository, type SaveFacebookAccountRepository } from '@/data/Contracts/repos'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAccount } from '@/domain/models'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/models/facebook-account')

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })

    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)

    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo
    )
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call loadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  // it('should call SaveFacebookAccountRepository with FacebookAccount', async () => {
  //   // refatore meu codigo para usar a versao 29 do jest-ts
  //   // const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
  //   // mocked(FacebookAccount).mockImplementation(FacebookAccountStub)

  //   const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
  //   jest.spyOn(FacebookAccount).mockImplementation(FacebookAccountStub)

  //   await sut.perform({ token })

  //   expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
  //   expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  // })

  it('should call SaveFacebookAccountRepository with FacebookAccount', async () => {
    const FacebookAccountStub = jest.fn().mockReturnValue({ any: 'any' });
    (FacebookAccount as jest.Mock).mockImplementation(FacebookAccountStub)

    await sut.perform({ token })

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })
})

// 017 - finalizado
