import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProductList} from '../actions/ProductAction';
import {getProductState} from '../reducers/ProductReducer';

const mapStateToProps = (state) => ({
	getProductList:() => getProductState.getProductList(state)
});

const mapDispatchToProps = {
	fetchProductList:fetchProductList
};

class ProductsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productList:this.props.getProductList() || []
		}
	}
	componentDidMount() {
		this.props.fetchProductList();
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.getProductList() != this.props.getProductList()) {
			this.setState({
				productList:nextProps.getProductList()
			});
		}
	}
	render() {
		const productList = this.state.productList;
		return (
			<div className="container">
				<h1>Products</h1>
				<div className="row">
					{productList.length > 0 && productList.map((product, index)=> {
						return (
							<div className="col-md-4" key={index.toString()}>
								<div className="product-list-block">
									<div className="product-thumb">
										<img src={product.imgUrl.thumb} />
									</div>
									<div className="product-info">
										<div className="product-name">{product.name}</div>
										<div className="row">
											<div className="col-md-6">
												<div><span className="product-label">Price:</span> {product.price}</div>
												<div><span className="product-label">Color:</span> {product.color.name}</div>
												
											</div>
											<div className="col-md-6">
												<div><span className="product-label">Qty:</span> {product.quantity}</div>
												<div><span className="product-label">Availability:</span> {product.availability}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
						})
					}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);