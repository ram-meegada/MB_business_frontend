export const BASE_URL = "http://192.168.1.2:8001/"


// Auth
const AUTH = "user/auth/"
export const LOGIN_ENDPOINT = BASE_URL + AUTH + "login/"

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
export const FETCH_EXPENDITURE_GRAPH_DATA = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + 'analytics/'


// Endpoints for Customer
const CUSTOMERS_ENDPOINTS = "customers/"
export const CUSTOMERS_LIST = BASE_URL + CUSTOMERS_ENDPOINTS + 'all/'
