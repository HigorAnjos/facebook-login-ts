import { type SaveFacebookAccountRepository, type LoadUserAccountRepository } from '@/data/Contracts/repos'
import { PgUser } from '@/infra/postgres/entities'
import { getRepository } from 'typeorm'

type loadParams = LoadUserAccountRepository.Params
type loadResult = LoadUserAccountRepository.Result
type saveParams = SaveFacebookAccountRepository.Params
type saveResult = SaveFacebookAccountRepository.Result

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  async load ({ email }: loadParams): Promise<loadResult> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser?.id?.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: saveParams): Promise<saveResult> {
    const pgUserRepo = getRepository(PgUser)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}
