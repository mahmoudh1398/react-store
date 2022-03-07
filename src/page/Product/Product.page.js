import * as React from 'react';
import {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Card from '@mui/material/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from "./Product.module.scss";
import {getProduct} from "api/product.api";
import {setProduct} from "redux/action/productAction";
import {IMAGE_URL} from "config/variables.config";

const Product = () => {
	
	let {id} = useParams();
	const dispatch = useDispatch();
	const targetProduct = useSelector((state) => state.product.product ? state.product.product[0] : []);
	const [count, setCount] = useState(1);
	const basketStatusUpdate = useSelector((state) => state.basketStatusUpdate.basketStatusUpdate);
	const [personOrders, setPersonOrders] = useState([]);
	const [isTooMuch, setIsTooMuch] = useState(false);
	
	
	useEffect(() => {
		getProduct(id).then((data) => {
			dispatch(setProduct(data));
		});
	}, [id]);
	
	useEffect(() => {
		const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? [];
		setPersonOrders(personOrders);
		personOrders.map(item => {
			if(item.id === +id){
				setCount(item.userCount)
			}else{
				setCount(1)
			}
		})
	}, [])
	
	const handleCountChange = (e) => {
		if (+e.target.value > +e.target.max) {
			setIsTooMuch(true);
		}else {
			setIsTooMuch(false);
			setCount(e.target.value);
		}
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {...targetProduct};
		data.userCount = count;
		const newOrders= personOrders.filter(item => item.id !== +id)
		localStorage.setItem( 'PERSON_ORDERS' , JSON.stringify([...newOrders , data]))
		dispatch({type: 'RE_RENDER_STATUS', payload: !basketStatusUpdate});
	};
	
	
	return (
		<div className={styles.wrapper}>
			{targetProduct &&
				<>
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
								<img src={`${IMAGE_URL}${targetProduct.image ? targetProduct.image[0] : ''}`} alt=""
								     className={styles.img}/>
							</figure>
						</Card>
						<div className={styles.specification}>
							<h1>{targetProduct.name ? targetProduct.name : ''}</h1>
							<p><Link to={`/products?page=1&category=${targetProduct.category.id}`}
							         className={styles.category_link}>{targetProduct.category.name}</Link></p>
							<span>{targetProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان</span>
							<form className={styles.actions} onSubmit={handleSubmit}>
								{+targetProduct.count > 0 ?
									<input onChange={handleCountChange} type="number" id="count" name="count" min="1" max={targetProduct.count} defaultValue="1"/>
									:
									<span style={{color: 'red'}}>اتمام موجودی</span>
								}
								{+targetProduct.count === 0 ?
									<button disabled className={styles.add_to_cart} style={{cursor: "not-allowed"}}>
										افزودن به سبد خرید
										<AddCircleIcon/>
									</button>
									:
									<button type="submit" className={styles.add_to_cart}>
										افزودن به سبد خرید
										<AddCircleIcon/>
									</button>
								}
							</form>
							{isTooMuch && <span style={{color: 'red'}}>با عرض پوزش ولی مقدار انتخابی شما بیشتر از موجودی است</span>}
						</div>
					</div>
					<div className={styles.description}>
						<h2>توضیحات محصول</h2>
						<div
							dangerouslySetInnerHTML={{__html: targetProduct.description}}
						/>
					</div>
				</>
			}
		</div>
	);
}

export {Product};
