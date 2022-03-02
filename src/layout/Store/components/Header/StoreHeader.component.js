import * as React from 'react';
import {Link} from "react-router-dom";
import style from './StoreHeader.module.scss';
import logo from 'asset/images/icons8-folder-64.png';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Badge from '@mui/material/Badge';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function StoreHeader() {
	
	
	const [count, setCount] = useState(0);
	const [personOrders, setPersonOrders] = useState([]);
	const renderStatus = useSelector((state) => state.renderStatus.renderStatus)
	
	
	
	useEffect(() => {
		const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? [];
		const personOrdersCount = personOrders.length
		setCount(personOrdersCount)
		setPersonOrders(personOrders)
	}, [])
	
	
	useEffect(() => {
		const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? [];
		const personOrdersCount = personOrders.length
		setCount(personOrdersCount)
	}, [renderStatus])
	
	
	
	return (
		<header className={style.storeNavbar}>
			<Link className={style.logo} to='/'>
				<figure className={style.logo__logoImage}><img src={logo} alt="logo"/></figure>
				<span>قفسه</span>
			</Link>
			<div className={style.navItems}>
				<Link className={style.management} to='/login'>
					<ManageAccountsIcon />
					<span>مدیریت</span>
				</Link>
				{window.location.pathname !== '/success-payment' &&
					<Badge badgeContent={count} color="error" anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}>
						<Link className={style.shoppingCart} to='/basket'>
							<LocalGroceryStoreIcon/>
							<span>سبد خرید</span>
						</Link>
					</Badge>
				}
			</div>
		</header>
	);
}

export {StoreHeader}
