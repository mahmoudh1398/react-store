import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {PATHS} from 'config/routes.config';
import  style  from './Checkout.module.scss';
import {DatePicker} from "react-advance-jalaali-datepicker";
import {useState} from "react";

const Checkout = () => {
	
	const [deliveryRequestTime, setDeliveryRequestTime] = useState(null);
	const dateChange = (unix, formatted) => {
		setDeliveryRequestTime(unix);
	}
	const DatePickerInput = (props) => {
		return <input className={style.date} {...props} />;
	}
	
	const handleSubmit =  (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const data = Object.fromEntries(form);
		data.deliveryRequestTime = deliveryRequestTime;
		data.delivered = false;
		const totalCount = JSON.parse(localStorage.getItem('TOTAL_COUNT')) ?? ''
		const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? []
		data.personOrders = personOrders;
		data.totalCount = totalCount;
		localStorage.setItem( 'PERSON_INFO' , JSON.stringify(data))
		// window.location.assign('http://127.0.0.1:5500/payment_gateway');
	}
	
	return (
		<div className={style.checkout_wrapper}>
			<h2 style={{margin:'2rem 7rem'}}>نهایی کردن خرید</h2>
			<Box component="form" onSubmit={handleSubmit} validate
			     sx={{
				     m: '1rem auto',
				     p: '1rem',
				     width: '90%',
				     height: '70vh',
				     boxShadow: 2,
			     }}
			>
				<div className={style.row}>
					<TextField
						margin="normal"
						required
						sx={{width:550, m: 3}}
						id="name"
						label="نام "
						name="name"
						autoComplete="name"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						sx={{width:550 , m: 3}}
						name="family"
						label="نام خانوادگی "
						id="family"
						autoComplete="family"
					/>
				</div>
				<div className={style.row}>
					<TextField
						id="filled-multiline-flexible"
						label="آدرس"
						sx={{width:550, m: 3}}
						multiline
						name='address'
						rows="2"
					/>
					<TextField
						margin="normal"
						required
						sx={{width:550, m: 3}}
						name="phone"
						label="  تلفن همراه "
						id="phone"
						autoComplete="phone"
					/>
				</div>
				<div className={style.row}>
					<DatePicker
						inputComponent={DatePickerInput}
						placeholder="انتخاب تاریخ"
						format="jYYYY/jMM/jDD"
						onChange={dateChange}
						id="date"
						required
						name="date"
					/>
				</div>
				<div className={style.row}>
					<Button
						type="submit"
						variant="contained"
						className={style.submit}
					>
						پرداخت
					</Button>
				</div>
			</Box>
		</div>
	);
};

export {Checkout};

