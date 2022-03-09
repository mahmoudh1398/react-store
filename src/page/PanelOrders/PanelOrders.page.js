import * as React from "react";
import style from "./PanelOrders.module.scss";
import {Pagination} from "components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getOrders} from "api/orders.api";
import {setOrders} from "redux/action/ordersAction";
import {OrdersTable, VerifyBtn, DeleteModal} from "./components";


let totalOrders;

const PanelOrders = () => {
	
	const [verifyOrderModalOpen, setVerifyOrderModalOpen] = React.useState(false);
	const handleVerifyOrderModalOpen = () => setVerifyOrderModalOpen(true);
	const handleVerifyOrderModalClose = () => setVerifyOrderModalOpen(false);
	const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
	const handleDeleteModalOpen = () => setDeleteModalOpen(true);
	const handleDeleteModalClose = () => setDeleteModalOpen(false);
	const [refresh, setRefresh] = React.useState(false);
	const [targetOrder, setTargetOrder] = React.useState({});
	const [radio, setRadio] = useState(false);
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 6
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
	const handleRefresh = () => {setRefresh(!refresh);};
	
	useEffect(() => {
		getOrders(pagination.currentPage, radio).then((response) => {
			totalOrders = +response[1];
			dispatch(setOrders(response[0]));
		});
	}, [pagination.currentPage, radio, refresh]);
	
	const handleOrderVerify = (order) => {
		setTargetOrder(order);
		handleVerifyOrderModalOpen();
	};
	
	const handleOrderDelete = (order) => {
		setTargetOrder(order);
		handleDeleteModalOpen();
	}
	
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
			
			<OrdersTable orders={orders} openVerifyOrderModal={handleOrderVerify} openDeleteModal={handleOrderDelete}/>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={totalOrders} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
			
			{verifyOrderModalOpen && <VerifyBtn orders={orders} targetOrder={targetOrder} prevPage={prevPage}
			                             open={handleVerifyOrderModalOpen} close={handleVerifyOrderModalClose}
			                             refresh={handleRefresh} />}
			
			{deleteModalOpen && <DeleteModal orders={orders} targetOrder={targetOrder}
			                                 open={deleteModalOpen} close={handleDeleteModalClose}
			                                 refresh={handleRefresh} prevPage={prevPage}/>}
			
		</div>
	);
};

export {PanelOrders};
