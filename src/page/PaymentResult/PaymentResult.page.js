import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postOrder} from "api/orders.api";
import style from './PaymentResult.module.scss';
import fail from "asset/images/cancel.svg";
import ok from "asset/images/ok.svg";
import {PATHS} from "config/routes.config";

const PaymentResult = () => {
	
	const navigate = useNavigate();
	let { result } = useParams();
	const dispatch = useDispatch();
	const [error, setError] = useState(false);
	let basketStatusUpdate = useSelector(state => state.basketStatusUpdate.basketStatusUpdate)
	
	useEffect (() => {
		if (result === 'fail') {
			setError(true)
		}else if(result === 'success'){
			setError(false)
			const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? [];
			const personInfo = JSON.parse(localStorage.getItem('PERSON_INFO')) ?? {};
			if(personOrders.length > 0){
				postOrder(personInfo).then( () => {
					localStorage.removeItem('PERSON_INFO')
					localStorage.removeItem('PERSON_ORDERS')
					localStorage.removeItem('TOTAL_COUNT')
					dispatch({type: 'RE_RENDER_STATUS', payload: !basketStatusUpdate})
				})
			}
		}
	}, [])
	
	return (
	 <div className={style.wrapper}>
		 <h2>نتیجه پرداخت</h2>
		 {error ?
			 <>
				 <div className={style.result}>
					 <figure>
						 <img src={fail} alt="fail" />
					 </figure>
					 <p>پرداخت موفقیت آمیز نبود، سفارش شما در انتظار پرداخت است.</p>
				 </div>
				 <button onClick={() => navigate(PATHS.BASKET)}>بازگشت به سبد خرید</button>
			 </>
			 :
			 <>
				 <div className={style.result}>
					 <figure>
						 <img src={ok} alt="success" />
					 </figure>
					 <p>با تشکر از پرداخت شما، سفارش شما با موفقیت ثبت شد.</p>
				 </div>
				 <button onClick={() => navigate(PATHS.HOME)}>بازگشت به سایت</button>
			 </>
		 }
	 </div>
  );
}

export { PaymentResult };