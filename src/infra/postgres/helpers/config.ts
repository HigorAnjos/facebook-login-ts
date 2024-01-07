import { type ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'babar.db.elephantsql.com',
  port: 5432,
  username: 'ozqopmnf',
  password: 'G639JXN4rGlkRI2LOPPe-OaxfQPQZ8fW',
  database: 'ozqopmnf',
  entities: ['dist/infra/postgres/entities/index.js']
}
