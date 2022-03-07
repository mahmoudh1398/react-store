import style from "./OrdersTable.module.scss";
import * as React from "react";
import moment from 'jalali-moment';

const OrdersTable = ({orders, openVerifyOrderModal, openDeleteModal}) => {
	
	const handleVerify = (order) => {
		openVerifyOrderModal(order);
	}
	
	function handleDelete(order) {
		openDeleteModal(order);
	}
	
	return (
		<table className={style.ordersTable}>
			<thead>
			<tr>
				<th>نام کاربر</th>
				<th>مجموع مبلغ</th>
				<th>تاریخ ثبت سفارش</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
			{orders.length > 0 ? orders.map( order =>
				<tr key={order.id}>
					<td>{order.name} {order.family ? order.family : ''}</td>
					<td>{order.totalCount && order.totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
					<td>{moment(new Date(order.createdAt), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</td>
					<td className={style.actions}>
						<button onClick={() => handleVerify(order)}>بررسی</button>
						<button onClick={() => handleDelete(order)}>حذف</button>
					</td>
				</tr>)
				:
				<tr><td colSpan={4}>هیچ سفارشی ثبت نشده است</td></tr>
			}
			
			</tbody>
		</table>
	);
}

export {OrdersTable};