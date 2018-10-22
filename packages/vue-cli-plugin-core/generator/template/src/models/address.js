import * as basseAPI from '@/services/base-api'

class Address {
  static get (id, options = {}) {
    return basseAPI.get(`/address/${id}`, options)
  }

  static getBalance (id, options = {}) {
    return basseAPI.get(`/address/${id}/balance`, options)
  }

  static getUtxo (id, options = {}) {
    return basseAPI.get(`/address/${id}/utxo`, options)
  }

  static getTransactions (id, { page, pageSize }, options = {}) {
    return basseAPI.get(`/address/${id}/txs`, { params: { page, pageSize }, ...options })
  }

  static getBalanceTransactions (id, { page, pageSize }, options = {}) {
    return basseAPI.get(`/address/${id}/balance-history`, { params: { page, pageSize }, ...options })
  }

  static getTokenBalanceTransactions (id, { tokens, page, pageSize }, options = {}) {
    return basseAPI.get(`/address/${id}/qrc20-balance-history`, { params: { tokens, page, pageSize }, ...options })
  }
}

export default Address
