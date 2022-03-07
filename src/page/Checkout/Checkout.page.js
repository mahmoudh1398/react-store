import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  style  from './Checkout.module.scss';
import {DatePicker} from "react-advance-jalaali-datepicker";
import {useState} from "react";
import moment from "jalali-moment";

const Checkout = () => {
	
	const [error, setError] = useState({
		name: '',
		family: '',
		address: '',
		tel: '',
		deliveryRequestTime: '',
	});
	
	const handleValidation = ({target}) => {
		if (target.name === 'name'){
			let p = /^[\u0600-\u06FF\s]+$/;
			if (!p.test(target.value)) {
				setError({...error, name: 'چرا فحش میدی :|'});
			}else if (target.value.length < 3){
				setError({...error, name: 'چی شده؟'});
			}else {
				setError({...error, name: ''});
			}
		}
		
		if (target.name === 'family'){
			let p = /^[\u0600-\u06FF\s]+$/;
			if (!p.test(target.value)) {
				setError({...error, family: 'چرا فحش میدی :|'});
			}else if (target.value.length < 3){
				setError({...error, family: 'چی شده؟'});
			}else {
				setError({...error, family: ''});
			}
		}
		
		if (target.name === 'address'){
			let p = /^[\u0600-\u06FF\s]+$/;
			if (!p.test(target.value)) {
				setError({...error, address: 'خط تیره نزن، با ویرگول جدا کن'});
			}else if (target.value.length < 3){
				setError({...error, address: ':|'});
			}else {
				setError({...error, address: ''});
			}
		}
		
		if (target.name === 'tel'){
			let p = /^(09[0-9]{9})$/;
			if (!p.test(target.value)) {
				setError({...error, tel: 'این چیه'});
			}else {
				setError({...error, tel: ''});
			}
		}
	};
	
	let currentDate = new Date().toISOString().slice(0, 10);
	currentDate = moment(new Date(currentDate), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
	const [deliveryRequestTime, setDeliveryRequestTime] = useState(null);
	const dateChange = (unix, formatted) => {
		setDeliveryRequestTime(formatted);
	}
	const DatePickerInput = (props) => {
		return <input className={style.date} {...props} />;
	}
	let isValidDate = false;
	if(deliveryRequestTime < currentDate){
		isValidDate = true;
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
		window.location.assign('http://localhost:3001/');
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
					<div className={style.error}>
						<TextField
							margin="normal"
							required
							sx={{width:550, m: 3}}
							id="name"
							label="نام "
							name="name"
							autoComplete="name"
							onChange={handleValidation}
						/>
						{error.name && <p style={{color: 'red', marginRight: '3rem'}}>{error.name}</p>}
					</div>
					<div className={style.error}>
						<TextField
							margin="normal"
							required
							sx={{width:550 , m: 3}}
							name="family"
							label="نام خانوادگی "
							id="family"
							autoComplete="family"
							onChange={handleValidation}
						/>
						{error.family && <p style={{color: 'red', marginRight: '3rem'}}>{error.family}</p>}
					</div>
				</div>
				<div className={style.row}>
					<div className={style.error}>
						<TextField
							id="filled-multiline-flexible"
							label="آدرس"
							sx={{width:550, m: 3}}
							multiline
							name='address'
							rows="2"
							required
							onChange={handleValidation}
						/>
						{error.address && <p style={{color: 'red', marginRight: '3rem'}}>{error.address}</p>}
					</div>
					<div className={style.error}>
						<TextField
							margin="normal"
							required
							sx={{width:550, m: 3}}
							name="tel"
							label="تلفن همراه "
							id="tel"
							autoComplete="tel"
							onChange={handleValidation}
						/>
						{error.tel && <p style={{color: 'red', marginRight: '3rem'}}>{error.tel}</p>}
					</div>
				</div>
				<div className={style.row}>
					<DatePicker
						inputComponent={DatePickerInput}
						placeholder="انتخاب تاریخ تحویل"
						format="jYYYY/jMM/jDD"
						onChange={dateChange}
						id="deliveryRequestTime"
						required
						name="deliveryRequestTime"
					/>
				</div>
				{isValidDate && <p style={{color:'red', marginRight: '3rem'}}>تاریخ درخواست تحویل باید بعد از تاریخ جاری باشد</p>}
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

