'use strict';

module.exports = function (api) {

    const BASE_URL = "/iins";

    return {
        fetch(tokenIin, callback) {
            return api.get({
                url: `${BASE_URL}/${tokenIin}`,
            }, callback);
        },

        all(params = {}, callback) {
            return api.get({
                url: `${BASE_URL}/list`,
                data: params
            }, callback)
        },
    }
}