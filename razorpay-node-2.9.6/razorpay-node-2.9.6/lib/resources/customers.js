'use strict'

module.exports = function (api) {
  return {
    create(params, callback) {
      return api.post({
        url: '/customers',
        data: params
      }, callback)
    },

    edit(customerId, params, callback) {
      return api.put({
        url: `/customers/${customerId}`,
        data: params
      }, callback)
    },

    fetch(customerId, callback) {
      return api.get({
        url: `/customers/${customerId}`
      }, callback)
    },

    all(params = {}, callback) {
      let { count, skip } = params

      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url: '/customers',
        data: {
          count,
          skip
        }
      }, callback)
    },

    fetchTokens(customerId, callback) {
      return api.get({
        url: `/customers/${customerId}/tokens`,
      }, callback)
    },

    fetchToken(customerId, tokenId, callback) {
      return api.get({
        url: `/customers/${customerId}/tokens/${tokenId}`,
      }, callback)
    },

    deleteToken(customerId, tokenId, callback) {
      return api.delete({
        url: `/customers/${customerId}/tokens/${tokenId}`
      }, callback)
    },

    addBankAccount(customerId, params ,callback) {
     return api.post({
       url: `/customers/${customerId}/bank_account`,
       data: params
     }, callback)
    },

    deleteBankAccount(customerId, bankId ,callback) {
      return api.delete({
        url: `/customers/${customerId}/bank_account/${bankId}`
      }, callback)
    },

    requestEligibilityCheck(params ,callback) {
      return api.post({
        url: `/customers/eligibility`,
        data: params
      }, callback)
    },

    fetchEligibility(eligibilityId, callback) {
      return api.get({
        url: `/customers/eligibility/${eligibilityId}`,
      }, callback)
    }
  }
}
