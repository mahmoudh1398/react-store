import style from "./OrdersTable.module.scss";
import * as React from "react";

const OrdersTable = ({orders}) => {
	return (
		<table className={style.ordersTable}>
			<thead>
			<tr>
				<th>نام کاربر</th>
				<th>مجموع مبلغ</th>
				<th>زمان ثبت سفارش</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
			{orders.map( Order =>
				<tr key={Order.id}>
					<td>{Order.name}</td>
					<td>{Order.sumAmountOfCart}</td>
					<td>{Order.orderRegistrationTime}</td>
					<td><button>بررسی سفارش</button></td>
				</tr>
			)}
			</tbody>
		</table>
	);
}

export {OrdersTable};