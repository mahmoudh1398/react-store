import style from "./OrdersTable.module.scss";
import * as React from "react";
import moment from 'jalali-moment'

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
			{orders.length > 0 ? orders.map( Order =>
				<tr key={Order.id}>
					<td>{Order.name}</td>
					<td>{Order.sumAmountOfCart}</td>
					<td>{moment(new Date(Order.orderRegistrationTime), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</td>
					<td><button>بررسی سفارش</button></td>
				</tr>
			): <tr><td colSpan={4}>هیچ سفارشی ثبت نشده است</td></tr>}
			}
			</tbody>
		</table>
	);
}

export {OrdersTable};