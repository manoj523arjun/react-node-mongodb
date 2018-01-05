
import {createAction} from 'redux-actions';
import {apiUrls} from '../helpers/urls';


export const GET_PRODUCT_LIST_STATUS = createAction(
	'products/GET_PRODUCT_LIST_STATUS'
);

export const GET_PRODUCT_LIST = createAction(
	'products/GET_PRODUCT_LIST',
	(productList) => ({productList})
);

export const fetchProductList = () => (dispatch, getState) => {
	dispatch(GET_PRODUCT_LIST_STATUS());
	return fetch(
		apiUrls.getProductsUrl,
		{
			headers: {
		      'Content-Type': 'application/json; charset=utf-8',
		      'Access-Control-Allow-Origin': '*'
		    },
		    crossDomain : true,
			method:'GET'
		}
	).then((response)=> {
		if(response.status == 401) {
			return false;
		}
		return response.json();
	})
	.then((response)=> {
		if(response.statusCode = 200) {
			const productList = response.productDetails;
			dispatch(GET_PRODUCT_LIST(productList))
		} else {
			return false;
		}
	});
}