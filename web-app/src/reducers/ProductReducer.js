	
import {handleActions} from 'redux-actions';
import * as ProductAction from '../actions/ProductAction';
import { REHYDRATE } from 'redux-persist'

const initState = {
	isProductsFetched:false,
	productList:[]
}

export const productReducer = handleActions({
	[ProductAction.GET_PRODUCT_LIST_STATUS]:(state, action) => {
		return {...state, isProductsFetched:false};
	},
	[ProductAction.GET_PRODUCT_LIST]:(state, action) => {
		return {...state, productList:action.payload.productList};
	}
}, initState);

export const getProductState = {
	getProductList:state=> state.productReducer.productList
}