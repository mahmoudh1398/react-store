import * as React from 'react';
import Card from '@mui/material/Card';
import styles from "./Product.module.scss";
import img from 'asset/images/lenovo-laptop-thinkpad-x1-carbon-gen-9-14-subseries-hero.png';
import {Link, useLocation} from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProduct} from "api/product.api";
import {setProduct} from "redux/action/productAction";
import {IMAGE_URL} from "config/variables.config";

const Product = () => {
	
	const search = useLocation().search;
	const productId = +new URLSearchParams(search).get('id');
	const product = useSelector((state) => state.product.product);
	const dispatch = useDispatch();
	
	useEffect(() => {
		getProduct(productId).then((data) => {
			dispatch(setProduct(data));
		});
	}, []);
	
	return (
		<div className={styles.wrapper}>
			<div className={styles.intro}>
				<Card sx={{
					backgroundColor: "primary",
					width: '30%',
					height: 270,
					'&:hover': {
						boxShadow: '0 5px 5px rgba(182, 182, 182, 0.75)'
					},
				}}>
					<figure className={styles.figureWrapper}>
						<img src={`${IMAGE_URL}${product[0].image ? product[0].image[0] : ''}`} alt="" className={styles.img}/>
					</figure>
				</Card>
				<div className={styles.specification}>
					<h1>{product[0].name}</h1>
					<p><Link to={`/products?page=1&category=${1}`} className={styles.category_link}>{product[0].category.name}</Link></p>
					<span>{product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان</span>
					<form className={styles.actions}>
						<input type="number" id="count" name="count" min="1" max={product[0].count} defaultValue="1" />
						{/*{count === 0 ? <button disabled>افزودن به سبد</button> : <button>افزودن به سبد</button>}*/}
						<button className={styles.add_to_cart}>
							افزودن به سبد خرید
							<AddCircleIcon />
						</button>
					</form>
				</div>
			</div>
			<div className={styles.description}>
				adsfsafsdfdfffafdsfds
			</div>
		</div>
	);
}

export {Product};
