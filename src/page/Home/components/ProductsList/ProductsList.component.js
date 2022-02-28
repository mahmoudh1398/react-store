import * as React from 'react';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom" ;
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {ProductItem} from "components";
import {getFilteredProducts} from "api/products.api";
import style from './ProductsList.module.scss';


const products_box = {
	flexGrow: 1,
	padding: '20px 0',
	margin: '2rem auto',
};

const ProductsList = ({ category }) => {
	
	const [products , setProducts] = useState([]);
	useEffect(() => {
		getFilteredProducts(1, category.name).then((response) => {
			setProducts(response[0]);
		});
	}, []);
	
	return (
		<>
			{products.length > 0 &&
					<Box sx={products_box} key={category.id}>
						<Link to={`/products?page=1&id=${category.id}`} className={style.myLink}>
							<div className={style.category_link}>{category.name}</div>
						</Link>
						<Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} className={style.products}>
							{products.map(product => (
								<Grid item xs={2} sm={4} md={4} key={product.id} className={style.products_box}>
									<ProductItem productItem={product}/>
								</Grid>
							))}
						</Grid>
					</Box>
			}
		</>
	);
};

export {ProductsList};