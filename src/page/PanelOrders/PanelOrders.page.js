import * as React from "react";
import style from "./PanelOrders.module.scss";
import {Pagination} from "components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getOrders} from "api/orders.api";
import {setOrders} from "redux/action/ordersAction";

const PanelOrders = () => {
	const [radio, setRadio] = useState(false);
	
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.allOrders.orders);
	
	useEffect(() => {
		getOrders().then((data) => dispatch(setOrders(data)));
		console.log(orders);
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
			<table className={style.ordersTable}>
				<thead>
					<tr>
						<th>کالا</th>
						<th>قیمت</th>
						<th>موجودی</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{currentOrders.map( Order =>
						<tr key={Order.id}>
							<td>{Order.name}</td>
							<td>{Order.sumAmountOfCart}</td>
							<td>{Order.orderRegistrationTime}</td>
							<td><button>بررسی سفارش</button></td>
						</tr>
					)}
				</tbody>
			</table>
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={orders.length} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
		</div>
	);
};

export {PanelOrders};
