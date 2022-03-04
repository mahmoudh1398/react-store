import style from "./FailPayment.module.scss";
import fail from "asset/images/cancel.svg";

const FailPayment = () => {
	return (
		<div className={style.fail_wrapper}>
			<h2>نتیجه پرداخت</h2>
			<div className={style.result}>
				<figure>
					<img src={fail} alt="fail" />
				</figure>
				<p>پرداخت موفقیت آمیز نبود، سفارش شما در انتظار پرداخت است.</p>
			</div>
		</div>
	);
};

export {FailPayment};
