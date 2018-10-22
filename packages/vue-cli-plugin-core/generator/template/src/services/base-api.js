import axios from 'axios'
import { ExtendableError } from '../untils/error'

export class RequestError extends ExtendableError {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

/* eslint-disable */
const resource = axios.create({ baseURL: baseURL })
/*eslint -enable */
export default resource

export function request(...args) {
  return resource.request(...args)
}

export async function get(url, { params, ip } = {}) {
  let response = await resource.get(url, {
    params,
    ...(ip ? { headers: { 'X-Forwarded-For': ip } } : {})
  })
  if (response.status === 200) {
    return response.data
  } else {
    throw new RequestError(response.statusText, response.status)
  }
}

export async function post(url, data, { ip } = {}) {
  let response = await resource.post(url, data, {
    ...(ip ? { headers: { 'X-Forwarded-For': ip } } : {})
  })
  if (response.status === 200) {
    return response.data
  } else {
    throw new RequestError(response.statusText, response.status)
  }
}
