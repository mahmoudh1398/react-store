import * as React from "react";
import style from "./PanelOrders.module.scss";
import {Pagination} from "components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getOrders} from "api/orders.api";
import {setOrders} from "redux/action/ordersAction";
import {OrdersTable} from "./OrdersTabel.component";


let ordersCount;

const PanelOrders = () => {
	const [radio, setRadio] = useState(false);
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 5
	});
	const orders = useSelector((state) => state.allOrders.orders);
	const dispatch = useDispatch();
	
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	const changeOrderCategory = (e) => {
		if (e.target.name === "delivered") {
			setRadio(true);
		}
		if (e.target.name === "waiting") {
			setRadio(false);
		}
	};
	
	useEffect(() => {
		getOrders(pagination.currentPage, radio).then((response) => {
			ordersCount = +response[1];
			dispatch(setOrders(response[0]));
		});
	}, [pagination.currentPage, radio]);
	
	return (
		<div className={style.wrapper}>
			<div className={style.main_header}>
				<h3>مدیریت سفارش ها</h3>
				
				<form className={style.main_header__orders_tab}>
					<label htmlFor="delivered">سفارش های تحویل شده</label>
					<input type="radio" id='delivered' name='delivered' value='سفارش های تحویل شده'
					       checked={radio ? true : false} onClick={changeOrderCategory}/>
					<label htmlFor="waiting">سفارش های در انتظار ارسال</label>
					<input type="radio" id='waiting' name='waiting' value='سفارش های در انتظار ارسال'
					       checked={radio ? false : true} onClick={changeOrderCategory}/>
				</form>
			</div>
			
			<OrdersTable orders={orders} />
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={ordersCount} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
		</div>
	);
};

export {PanelOrders};
