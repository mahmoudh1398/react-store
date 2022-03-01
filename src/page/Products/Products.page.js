import * as React from 'react';
import Box from '@mui/material/Box';
import styles from './Products.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCategories} from "api/categories.api";
import {setCategories} from "redux/action/categoriesAction";
import style from "./Products.module.scss";
import Grid from "@mui/material/Grid";
import {Pagination, ProductItem} from "components";
import {Sidebar} from './components';
import {findEmptyProductsOfCategory, getFilteredProducts} from "api/products.api";
import {filteredProducts} from "redux/action/productsAction";
import {useLocation, useSearchParams} from 'react-router-dom';


const products_box = {
	flexGrow: 1,
	width: '80%',
	position: 'absolute',
	top: '50px',
	right: '0',
	padding: '20px 0',
};
let productsCount;

const Products = () => {
	
	const [searchParams, setSearchParams] = useSearchParams(1);
	const search = useLocation().search;
	const categoryId = +new URLSearchParams(search).get('category');
	const [pagination, setPagination] = useState({
		currentPage: 1,
		postsPerPage: 6,
	});
	const [category, setCategory] = useState({
		id: 1,
		name: 'لپتاپ',
	});
	const filtered_Products = useSelector((state) => state.allProducts.products);
	const categories = useSelector((state) => state.allCategories.categories);
	const dispatch = useDispatch();
	
	const paginate = pageNum => {
		setPagination({...pagination, currentPage: pageNum});
	};
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	const handleCategory = (targetCategory) => {
		setCategory({...targetCategory});
	};
	
	useEffect(() => {
		getFilteredProducts(pagination.currentPage, category.name).then((response) => {
			productsCount = +response[1];
			dispatch(filteredProducts(response[0]));
		});
		setSearchParams({ page: pagination.currentPage, category: category.id });
	}, [pagination.currentPage, category.name]);
	
	useEffect(() => {
		getCategories().then((data) => {
			dispatch(setCategories(data));
		});
	}, []);
	
	useEffect(() => {
		if (categoryId) {
			const category = categories.find(c => c.id === categoryId);
			setCategory({...category});
		}
	}, []);
	
	
	return (
		<div className={styles.wrapper}>
			
			<Sidebar categories={categories} changeCategory={handleCategory}/>
			
			{filtered_Products.length > 0 ?
				<Box sx={products_box}>
					<div className={style.category_link}>{category.name}</div>
					<Grid container spacing={{xs: 2, md: 3}} columns={{xs: 6, sm: 8, md: 12}} className={style.products}>
						{filtered_Products.map(product => (
							<Grid item xs={2} sm={12} md={6} key={product.id} className={style.products_box}>
								<ProductItem productItem={product}/>
							</Grid>
						))}
					</Grid>
					<Pagination postsPerPage={pagination.postsPerPage} totalPosts={productsCount} paginate={paginate}
					            nextPage={nextPage} prevPage={prevPage}/>
				</Box>
				:
				<Box sx={products_box}>
					<div className={style.category_link}>{category.name}</div>
					<Grid container spacing={{xs: 2, md: 3}} columns={{xs: 6, sm: 8, md: 12}} className={style.products}>
						<span>محصولی در این دسته بندی وجود ندارد</span>
					</Grid>
				</Box>
			}
		</div>
	);
}

export {Products};
