import { type HttpGetClient } from './client'

import axios from 'axios'

export class AxiosHttpClient {
  async get ({ url, params }: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
