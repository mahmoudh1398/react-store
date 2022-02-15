import * as React from "react";
import style from "./PanelOrders.module.scss";
import {Pagination} from "components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getOrders} from "api/orders.api";
import {setOrders} from "redux/action/ordersAction";
import {OrdersTable} from "./OrdersTabel.component";

const PanelOrders = () => {
	const [radio, setRadio] = useState(false);
	
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.allOrders.orders);
	
	useEffect(() => {
		getOrders().then((data) => dispatch(setOrders(data)));
	}, []);
	
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 10
	});
	const indexOfLastItem = pagination.currentPage * pagination.postsPerPage;
	const indexOfFirstItem = indexOfLastItem - pagination.postsPerPage;
	const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	return (
		<div className={style.wrapper}>
			<div className={style.main_header}>
				<h3>مدیریت سفارش ها</h3>
				<form className={style.main_header__orders_tab}>
					<label htmlFor="delivered">سفارش های تحویل شده</label>
					<input type="radio" id='delivered' name='orders' value='سفارش های تحویل شده'
					       checked={radio ? true : false} onClick={() => setRadio(true)}/>
					<label htmlFor="waiting">سفارش های در انتظار ارسال</label>
					<input type="radio" id='waiting' name='orders' value='سفارش های در انتظار ارسال'
					       checked={radio ? false : true} onClick={() => setRadio(false)}/>
				</form>
			</div>
			<OrdersTable orders={currentOrders} />
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={orders.length} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
		</div>
	);
};

export {PanelOrders};
