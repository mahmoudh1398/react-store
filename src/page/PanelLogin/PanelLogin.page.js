import * as React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {TextField} from "@mui/material";
import {PATHS} from "config/routes.config";
import {loginUser} from "api/login.api";
import {ACCESS_TOKEN, IS_LOGGED_IN} from "config/variables.config";


const PanelLogin = () => {
	const navigate = useNavigate()
	
	const initialValues = {
		username: '',
		password: ''
	};
	
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					p: 2,
					boxShadow: 3,
					borderRadius: '16px',
				}}
			>
				<Typography component="h1" variant="h4">
					ورود به پنل مدیریت فروشگاه
				</Typography>
				<Formik
					initialValues={{
						...initialValues
					}}
					validationSchema={Yup.object().shape({
						username: Yup.string()
							.min(2, 'خیلی کوتاه')
							.max(50, 'خیلی بلند')
							.required('نام کاربری مورد نیاز است'),
						password: Yup.string()
							.required('لطفا رمز عبور خود را وارد کنید')
							.matches(
								/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
								'رمز عبور باید شامل 8 کاراکتر، یک حروف بزرگ، یک حروف کوچک، یک عدد و یک کاراکتر خاص باشد'
							)
					})}
					onSubmit={(values) => {
						loginUser(values).then((res) => {
							localStorage.setItem(ACCESS_TOKEN, res.token);
							localStorage.setItem(IS_LOGGED_IN, true.toString());
							navigate(PATHS.PANEL_PRODUCT);
						});
					}}
				>
					{({
						  errors,
						  handleBlur,
						  handleChange,
						  handleSubmit,
						  isSubmitting,
						  isValid,
						  dirty,
						  touched,
						  values
					  }) => (
						<form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Box sx={{ lg: { mt: 3 }}}>
								<TextField
									error={Boolean(touched.username && errors.username)}
									fullWidth
									required
									helperText={touched.username && errors.username}
									label="نام کاربری"
									name="username"
									onBlur={handleBlur}
									onChange={handleChange}
									type="text"
									value={values.username}
									variant="outlined"
									sx={{my: 2}}
								/>
								<TextField
									error={Boolean(touched.password && errors.password)}
									fullWidth
									required
									helperText={touched.password && errors.password}
									label="رمز عبور"
									name="password"
									onBlur={handleBlur}
									onChange={handleChange}
									type='password'
									value={values.password}
									variant="outlined"
									sx={{my: 2}}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									disabled={Boolean(!isValid)}
								>
									ورود
								</Button>
								<Link to='/' style={{color: "red"}}>بازگشت به سایت</Link>
							</Box>
						</form>
					)
					}
				</Formik>
			</Box>
		</Container>
	);
}

export {PanelLogin};

