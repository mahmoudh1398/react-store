import * as React from 'react';
import style from './PanelHeader.module.scss';
import {Link} from "react-router-dom";

function PanelHeader(props) {
	
	const handleClick = ({target}) => {
		target.style.transform = 'translateY(-5px)';
		target.onblur = () => {
			target.style.transform = 'translateY(0)';
		};
	};
	
	return (
		<header className={style.panelNavbar}>
			<Link to='/panel-product'><h1>پنل مدیریت فروشگاه</h1></Link>
			<div className={style.navItems}>
				<div className={style.navButtons}>
					<Link to='/panel-product' onClick={handleClick}>کالاها</Link>
					<Link to='/panel-quantity' onClick={handleClick}>موجودی و قیمت ها</Link>
					<Link to='/panel-orders' onClick={handleClick}>سفارش ها</Link>
				</div>
				<Link className={style.back_to_home} to='/'>بازگشت به سایت</Link>
			</div>
		</header>
	);
}

export {PanelHeader}
