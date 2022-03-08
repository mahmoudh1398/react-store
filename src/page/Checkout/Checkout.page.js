import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  style  from './Checkout.module.scss';
import {DatePicker} from "react-advance-jalaali-datepicker";
import {useState} from "react";
import moment from "jalali-moment";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Checkout = () => {
	
	const initialValues = {
		name: '',
		family: '',
		address: '',
		tel: '',
		deliveryRequestTime: ''
	};
	
	const checkoutSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'خیلی کوتاه!')
			.max(50, 'خیلی بلند!')
			.required('پر کردن این فیلد الزامی است!')
			.matches(/^[\u0600-\u06FF\s]+$/, "چرا فحش میدی؟"),
		family: Yup.string()
			.min(2, 'خیلی کوتاه!')
			.max(50, 'خیلی بلند!')
			.required('پر کردن این فیلد الزامی است')
			.matches(/^[\u0600-\u06FF\s]+$/, "چرا فحش میدی؟"),
		address: Yup.string()
			.matches(/^[\u0600-\u06FF0-9\s,'-]*$/, "چرا فحش میدی؟")
			.required('پر کردن این فیلد الزامی است'),
		tel: Yup.string()
			.matches(/^(09[0-9]{9})$/, "با 09 شروع میشه و باید 11 رقم باشه")
			.max(11, "با 09 شروع میشه و باید 11 رقم باشه")
			.required('پر کردن این فیلد الزامی است'),
	});
	
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
	
	const handleSubmit =  (formValues) => {
		formValues.deliveryRequestTime = deliveryRequestTime;
		formValues.delivered = false;
		const totalCount = JSON.parse(localStorage.getItem('TOTAL_COUNT')) ?? ''
		const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? []
		formValues.personOrders = personOrders;
		formValues.totalCount = totalCount;
		localStorage.setItem( 'PERSON_INFO' , JSON.stringify(formValues))
		window.location.assign('http://localhost:3001/');
	}
	
	return (
		<div className={style.checkout_wrapper}>
			<h2 style={{margin:'2rem 7rem'}}>نهایی کردن خرید</h2>
			<Formik
				initialValues={{...initialValues}}
				validationSchema={checkoutSchema}
				onSubmit={values => {
					handleSubmit(values);
				}}
			>
				{({
					  errors,
					  handleBlur,
					  handleChange,
					  handleSubmit,
					  isValid,
					  touched,
					  values}) => (
					<Form className={style.checkout_form}>
						<div className={style.row}>
							<div className={style.error}>
								<TextField
									sx={{width:550, mt: 3, mx: 3}}
									id="name"
									name="name"
									label="نام"
									autoComplete="name"
									error={Boolean(touched.name && errors.name)}
									helperText={touched.name && errors.name}
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.name}
								/>
							</div>
							<div className={style.error}>
								<TextField
									sx={{width:550 , m: 3}}
									id="family"
									name="family"
									label="نام خانوادگی"
									autoComplete="family"
									error={Boolean(touched.family && errors.family)}
									helperText={touched.family && errors.family}
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.family}
								/>
							</div>
						</div>
						<div className={style.row}>
							<div className={style.error}>
								<TextField
									sx={{width:550, m: 3}}
									id="address"
									name='address'
									label="آدرس"
									multiline
									rows="1"
									error={Boolean(touched.address && errors.address)}
									helperText={touched.address && errors.address}
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.address}
								/>
							</div>
							<div className={style.error}>
								<TextField
									sx={{width:550, m: 3}}
									id="tel"
									name="tel"
									label="تلفن همراه"
									autoComplete="tel"
									error={Boolean(touched.tel && errors.tel)}
									helperText={touched.tel && errors.tel}
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.tel}
								/>
							</div>
						</div>
						<div className={style.row}>
							<div className={style.datePicker}>
								<DatePicker
									inputComponent={DatePickerInput}
									placeholder="انتخاب تاریخ تحویل"
									format="jYYYY/jMM/jDD"
									onChange={dateChange}
									id="deliveryRequestTime"
									name="deliveryRequestTime"
								/>
								{isValidDate && <p style={{color:'red'}}>تاریخ درخواست تحویل باید بعد از تاریخ جاری باشد</p>}
							</div>
						</div>
						<div className={style.row}>
							<Button
								type="submit"
								variant="contained"
								className={style.submit}
								disabled={Boolean(!isValid)}
							>
								پرداخت
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export {Checkout};

