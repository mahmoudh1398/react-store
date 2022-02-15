import style from './PanelProduct.module.scss';
import * as React from "react";
import {Pagination} from "components";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import { setProducts } from "redux/action/productAction";
import { getProducts } from "api/products.api";
import {ProductsTable} from './ProductsTable.component';

const PanelProduct = () => {
	const product = useSelector((state) => state.allProducts.products);
	const dispatch = useDispatch();
	
	useEffect(() => {
		getProducts().then((data) => dispatch(setProducts(data)));
	}, []);
	
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 10
	});
	const indexOfLastItem = pagination.currentPage * pagination.postsPerPage;
	const indexOfFirstItem = indexOfLastItem - pagination.postsPerPage;
	const currentProducts = product.slice(indexOfFirstItem, indexOfLastItem);
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	return (
		<div className={style.wrapper}>
			
			<div className={style.main_header}>
				<h3>مدیریت کالاها</h3>
				<button>افزودن کالا</button>
			</div>
			
			<ProductsTable products={currentProducts}/>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={product.length} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
		
		</div>
	);
};

export {PanelProduct};
