import style from './SuccessPayment.module.scss';
import ok from 'asset/images/ok.svg';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {postOrder} from "api/orders.api";

const SuccessPayment = () => {
	
	let renderStatus = useSelector(state => state.renderStatus.renderStatus);
	const dispatch = useDispatch();
	
	useEffect(() => {
		const personOrders = JSON.parse(localStorage.getItem('PERSON_INFO'));
		if(personOrders.length > 0){
			postOrder(personOrders[0]).then( () => {
				localStorage.removeItem('PERSON_INFO')
				localStorage.removeItem('PERSON_ORDERS')
				localStorage.removeItem('TOTAL_COUNT')
				dispatch({type: 'RE_RENDER_STATUS', payload: !renderStatus})
			})
		}
	}, []);
	
	
	return (
		<div className={style.success_wrapper}>
			<h2>نتیجه پرداخت</h2>
			<div className={style.result}>
				<figure>
					<img src={ok} alt="success" />
				</figure>
				<p>با تشکر از پرداخت شما، سفارش شما با موفقیت ثبت شد.</p>
			</div>
		</div>
	);
};

export {SuccessPayment};
