import style from './PanelProduct.module.scss';
import * as React from "react";
import {Pagination} from "components";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import {filteredProducts} from "redux/action/productAction";
import {getFilteredProducts} from "api/products.api";
import {ProductsTable} from './components';
import {getCategories} from "api/categories.api";
import {setCategories} from "redux/action/categoriesAction";
import {AddOrEditModal} from "./components";


let productsCount;

function PanelProduct() {
	
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 5,
	});
	const [category, setCategory] = React.useState({
		category: 'لپتاپ',
	});
	const [refresh, setRefresh] = React.useState(false);
	
	const filtered_Products = useSelector((state) => state.allProducts.products);
	const categories = useSelector((state) => state.allCategories.categories);
	const dispatch = useDispatch();
	
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	const handleCategory = (category) => {
		setCategory({category});
	};
	const handleRefresh = () => {setRefresh(!refresh);};
	
	useEffect(() => {
		getFilteredProducts(pagination.currentPage, category.category).then((response) => {
			productsCount = +response[1];
			dispatch(filteredProducts(response[0]));
		});
	}, [pagination.currentPage, category.category, refresh]);
	
	useEffect(() => {
		getCategories().then((data) => {
			dispatch(setCategories(data));
		});
	}, []);
	
	return (
		<div className={style.wrapper}>
			
			<div className={style.main_header}>
				<h3>مدیریت کالاها</h3>
				<button onClick={handleOpen}>افزودن کالا</button>
			</div>
			
			<ProductsTable products={filtered_Products} changeCategory={handleCategory} categories={categories}
				refresh={handleRefresh}/>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={productsCount} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
			
			{open && <AddOrEditModal open={open} close={handleClose} categories={categories} refresh={handleRefresh}/>}
		</div>
	);
};

export {PanelProduct};
