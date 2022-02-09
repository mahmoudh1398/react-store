import * as React from 'react';
import {Link} from "react-router-dom";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider, responsiveFontSizes} from '@mui/material/styles';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IconButton, InputAdornment, TextField} from "@mui/material";

let theme = createTheme({
	typography: {
		fontFamily: 'iransans',
	},
	direction: 'rtl'
});
theme = responsiveFontSizes(theme);

const PanelLogin = () => {
	
	const initialValues = {
		email: '',
		password: ''
	};
	
	const [formData, updateFormData] = React.useState(initialValues);
	
	const [values, setValues] = React.useState({
		email: '',
		password: '',
		showPassword: false,
	});
	
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
		updateFormData({
			...formData,
			
			// Trimming any whitespace
			[event.target.name]: event.target.value.trim()
		});
	};
	
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};
	
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
	};
	
	return (
		<ThemeProvider theme={theme}>
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
							email: Yup.string()
								.email('لطفا یک ایمیل معتبر وارد کنید')
								.required('ایمیل مورد نیاز است'),
							password: Yup.string()
								.required('لطفا رمز عبور خود را وارد کنید')
								.matches(
									/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
									'رمز عبور باید شامل 8 کاراکتر، یک حروف بزرگ، یک حروف کوچک، یک عدد و یک کاراکتر خاص باشد'
								)
						})}
						onSubmit={(values) => {
							console.log(values);
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
										error={Boolean(touched.email && errors.email)}
										fullWidth
										required
										helperText={touched.email && errors.email}
										label="ایمیل"
										name="email"
										onBlur={handleBlur}
										onChange={handleChange}
										type="text"
										value={values.email}
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
										type={values.showPassword ? 'text' : 'password'}
										value={values.password}
										variant="outlined"
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
												>
													{values.showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
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
		</ThemeProvider>
	);
}

export {PanelLogin};
