import style from "./OrdersTable.module.scss";
import * as React from "react";
import moment from 'jalali-moment';

const OrdersTable = ({orders, openVerifyOrderModal}) => {
	
	const handleVerify = (order) => {
		openVerifyOrderModal(order);
	}
	
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
			{orders.length > 0 ? orders.map( order =>
				<tr key={order.id}>
					<td>{order.name}</td>
					<td>{order.totalCount && order.totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
					<td>{moment(new Date(order.createdAt), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</td>
					<td><button onClick={() => handleVerify(order)}>بررسی سفارش</button></td>
					{/*<td><VerifyBtn row={order}/></td>*/}
				</tr>)
				:
				<tr><td colSpan={4}>هیچ سفارشی ثبت نشده است</td></tr>
			}
			
			</tbody>
		</table>
	);
}

export {OrdersTable};