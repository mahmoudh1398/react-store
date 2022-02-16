import style from './PanelProduct.module.scss';
import * as React from "react";
import {Pagination} from "components";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import { setProducts } from "redux/action/productAction";
import { getProducts } from "api/products.api";
import {ProductsTable} from './ProductsTable.component';
import http from "services/http.service";
import {BASE_URL} from "config/variables.config";


let productsCount;

const PanelProduct = () => {
	
	async function getProductsCount() {
		const response = await http.get(BASE_URL + '/products');
		return response.data;
	};
	getProductsCount().then(response => productsCount = response.length);
	
	const products = useSelector((state) => state.allProducts.products);
	const dispatch = useDispatch();
	
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 10,
	});
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	useEffect(() => {
		getProducts(pagination.currentPage).then((data) => {dispatch(setProducts(data))});
	}, [pagination.currentPage]);
	
	return (
		<div className={style.wrapper}>
			
			<div className={style.main_header}>
				<h3>مدیریت کالاها</h3>
				<button>افزودن کالا</button>
			</div>
			
			<ProductsTable products={products}/>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={productsCount} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
		
		</div>
	);
};

export {PanelProduct};
