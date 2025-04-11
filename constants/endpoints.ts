export const BASE_URL = "http://192.168.1.7:8001/"

// Endpoints for Livestock
const LIVE_STOCK_COMMON_ENDPOINT = "live-stock/"
export const ADD_STOCK_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT + 'add/'
export const LIST_STOCKS_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT + 'all/'
export const STOCK_BY_ID_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT


// Endpoints for Expenditure
const EXPENDITURE_COMMON_ENDPOINT = "expenditure/"

// Endpoints for Expenditure categories
export const ADD_EXPENDITURE = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + ''
export const FETCH_EXPENDITURE_CATEGORIES = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + 'category/'

// 
export const FETCH_EXPENDITURE_BY_ID = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + 'manage/'
