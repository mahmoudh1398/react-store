import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./AddOrEditModal.module.scss";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
let theme = createTheme({
	typography: {
		fontFamily: 'iransans',
	},
	direction: 'rtl'
});
theme = responsiveFontSizes(theme);

const signInSchema = Yup.object().shape({
	photo: Yup.string().required('پر کردن این فیلد اجباری است'),
	productName: Yup.string().required('پر کردن این فیلد اجباری است'),
	category: Yup.string().required('پر کردن این فیلد اجباری است'),
	description: Yup.string().required('پر کردن این فیلد اجباری است'),
});
const initialValues = {
	photo: '',
	productName: '',
	category: '',
	description: '',
};

function AddOrEditModal({open, close, categories}) {
	
	return (
		<ThemeProvider theme={theme}>
			<div>
				<Modal
					open={open}
					onClose={close}
				>
					<Box sx={style}>
						<IconButton
							aria-label="close"
							onClick={close}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" component="h2">
							افزودن / ویرایش کالا
						</Typography>
						<Formik
							initialValues={initialValues}
							validationSchema={signInSchema}
							onSubmit={(values) => {
							
							}}
						>
							{(formik) => {
								const { errors, touched, isValid, dirty } = formik;
								return (
									<Form className={styles.product_modal}>
										<div>
											<label htmlFor="photo">تصویر کالا:</label>
											<Field
												type="file"
												name="photo"
												id="photo"
											/>
											<ErrorMessage name="photo" component="span" className={styles.error} />
										</div>
										
										<div>
											<label htmlFor="productName">نام کالا:</label>
											<Field
												type="text"
												name="productName"
												id="productName"
											/>
											<ErrorMessage name="productName" component="span" className={styles.error}/>
										</div>
										
										<div>
											<label htmlFor="category">دسته بندی:</label>
											<Field as="select" name="category" id="category">
												{categories.map((category) => (
													<option key={category.id} value={category.name}>{category.name}</option>
												))}
											</Field>
											<ErrorMessage name="category" component="span" className={styles.error}/>
										</div>
										
										<div>
											<label htmlFor="description">توضیحات:</label>
											<Field as="textarea" name="description" id="description" rows="5"/>
											<ErrorMessage name="description" component="span" className={styles.error}/>
										</div>
										
										<button
											type="submit"
											className={!(dirty && isValid) ? styles.disabled_btn : null}
											disabled={!(dirty && isValid)}
										>
											ذخیره
										</button>
									</Form>
								);
							}}
						</Formik>
					</Box>
				</Modal>
			</div>
		</ThemeProvider>
	);
}

export {AddOrEditModal}
