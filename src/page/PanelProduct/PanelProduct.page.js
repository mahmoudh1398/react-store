import style from './PanelProduct.module.scss';
import * as React from "react";
import {Pagination} from "components";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import {filteredProducts} from "redux/action/productAction";
import {getFilteredProducts} from "api/products.api";
import {ProductsTable} from './ProductsTable.component';
import http from "services/http.service";
import {BASE_URL} from "config/variables.config";


let productsCount;

const PanelProduct = () => {
	
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 5,
	});
	const [category, setCategory] = React.useState({
		category: 'گوشی',
	});
	
	async function getProductsCount() {
		const response = await http.get(`${BASE_URL}/products?category.name=${category.category}`);
		return response.data;
	};
	getProductsCount().then(response => productsCount = response.length);
	
	const filtered_Products = useSelector((state) => state.allProducts.products);
	const dispatch = useDispatch();
	
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	const handleCategory = (category) => {
		setCategory({category});
	};
	
	useEffect(() => {
		getFilteredProducts(pagination.currentPage, category.category).then((data) => {dispatch(filteredProducts(data))});
	}, [pagination.currentPage, category.category]);
	
	return (
		<div className={style.wrapper}>
			
			<div className={style.main_header}>
				<h3>مدیریت کالاها</h3>
				<button>افزودن کالا</button>
			</div>
			
			<ProductsTable products={filtered_Products} changeCategory={handleCategory}/>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={productsCount} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
		
		</div>
	);
};

export {PanelProduct};
