export const BASE_URL = "http://192.168.1.6:8001/"
// export const BASE_URL = "http://127.0.0.1:8001/"

// Endpoints for Livestock
const LIVE_STOCK_COMMON_ENDPOINT = "live-stock/"
export const ADD_STOCK_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT + 'add/'
export const LIST_STOCKS_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT + 'all/'
export const STOCK_BY_ID_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT


// Endpoints for Expenditure
const EXPENDITURE_COMMON_ENDPOINT = "expenditure/"
export const ADD_EXPENDITURE = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + ''
