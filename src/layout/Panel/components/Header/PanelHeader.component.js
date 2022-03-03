import * as React from 'react';
import style from './PanelHeader.module.scss';
import {Link} from "react-router-dom";
import {IS_LOGGED_IN} from "config/variables.config";

function PanelHeader(props) {
	
	const handelChange=(e)=>{
		localStorage.setItem(IS_LOGGED_IN, false.toString());
	}
	
	return (
		<header className={style.panelNavbar}>
			<Link to='/panel-product'><h1>پنل مدیریت فروشگاه</h1></Link>
			<div className={style.navItems}>
				<div className={style.navButtons}>
					<Link to='/panel-product'>کالاها</Link>
					<Link to='/panel-quantity'>موجودی و قیمت ها</Link>
					<Link to='/panel-orders'>سفارش ها</Link>
				</div>
				<Link className={style.back_to_home} to='/' onClick={handelChange}>بازگشت به سایت</Link>
			</div>
		</header>
	);
}

export {PanelHeader}
