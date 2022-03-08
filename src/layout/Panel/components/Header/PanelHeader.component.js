import {Link, useNavigate} from "react-router-dom";
import style from './PanelHeader.module.scss';
import {ACCESS_TOKEN, ADMIN_FULL_NAME, IS_LOGGED_IN} from 'config/variables.config';
import {PATHS} from "config/routes.config";
import LogoutIcon from '@mui/icons-material/Logout';

function PanelHeader() {
	
	const navigate = useNavigate();
	const ADMIN_NAME = localStorage.getItem(ADMIN_FULL_NAME);
	
	const handleClick = ({target}) => {
		target.style.transform = 'translateY(-5px)';
		target.onblur = () => {
			target.style.transform = 'translateY(0)';
		};
	};
	
	const handleLogout = () => {
		localStorage.removeItem(IS_LOGGED_IN);
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(ADMIN_FULL_NAME);
		navigate(PATHS.PANEL_LOGIN);
	};
	
	return (
		<header className={style.panelNavbar}>
			<Link to='/panel-products'><h1>پنل مدیریت فروشگاه</h1></Link>
			<div className={style.navItems}>
				<div className={style.navButtons}>
					<Link to='/panel-products' onClick={handleClick}>کالاها</Link>
					<Link to='/panel-quantities' onClick={handleClick}>موجودی و قیمت ها</Link>
					<Link to='/panel-orders' onClick={handleClick}>سفارش ها</Link>
				</div>
				<Link className={style.back_to_home} to='/'>فروشگاه</Link>
				<div className={style.admin}>
					<span>{ADMIN_NAME}</span>
					<LogoutIcon onClick={handleLogout} className={style.logoutBtn}/>
				</div>
			</div>
		</header>
	);
}

export {PanelHeader}
