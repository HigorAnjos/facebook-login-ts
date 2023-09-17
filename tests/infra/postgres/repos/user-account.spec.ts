import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { type IBackup } from 'pg-mem'
import { getRepository, type Repository, getConnection } from 'typeorm'
import { makeFakeDb } from '../mocks/index'

describe('PgUserAAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb()
    backup = db.backup() // gera um ponto de restauracao (Banco limpo)
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(() => {
    sut = new PgUserAccountRepository()
  })

  afterAll(async () => {
    backup.restore()
    await getConnection().close()
  })
  describe('load', () => {
    it('should return an account if email exist', async () => {
      await pgUserRepo.save({ email: 'existing_email' })
      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
    })
    it('should return an account if email does not exist', async () => {
      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
    })
  })
})
