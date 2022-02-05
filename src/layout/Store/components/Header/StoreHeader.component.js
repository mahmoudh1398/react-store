import * as React from 'react';
import {Link} from "react-router-dom";
import style from './StoreHeader.module.css';
import logo from 'asset/images/icons8-folder-64.png';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Badge from '@mui/material/Badge';

function StoreHeader() {
	return (
		<header className={style.storeNavbar}>
			<Link className={style.logo} to='/'>
				<figure className={style.logoImage}><img src={logo} alt="logo"/></figure>
				<span>قفسه</span>
			</Link>
			<div className={style.navItems}>
				<Link className={style.management} to='/login'>
					<ManageAccountsIcon />
					<span>مدیریت</span>
				</Link>
				{window.location.pathname !== '/success-payment' &&
					<Link className={style.shoppingCart} to='/basket'>
						<Badge badgeContent={4} color="error">
							<LocalGroceryStoreIcon/>
							<span>سبد خرید</span>
						</Badge>
					</Link>
				}
			</div>
		</header>
	);
}

export {StoreHeader}
