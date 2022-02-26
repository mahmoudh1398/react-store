import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./AddModal.module.scss";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import FormData from "form-data";
import http from "services/http.service";
import Button from "@mui/material/Button";
import {useState} from "react";


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	overflow:'scroll',
	height:'90%',
	display:'block',
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
	name: Yup.string().required('پر کردن این فیلد اجباری است'),
	// price: Yup.number().required('پر کردن این فیلد اجباری است'),
	// count: Yup.number().required('پر کردن این فیلد اجباری است'),
});

const initialValues = {
	image: [],
	thumbnail: [],
	name: '',
	// price: 0,
	// count: 0,
	category: '',
	description: '',
};

function AddModal({open, close, categories, refresh, toast}) {
	
	const [uploadedImages, setUploadedImages] = useState([]);
	const [thumbnail , setThumbnail] = React.useState('');
	const [category, setCategory] = React.useState({
		id: null,
		name: '',
	});
	const [description, setDescription] = React.useState('');
	
	const handleImagesSelect = (event) => {
		initialValues.image = Array.from(event.target.files);
	};
	
	const handleImagesUpload = () => {
		if (initialValues.image.length !== 0) {
			let data = new FormData();
			data.append('image', initialValues.image[0]);
			try {
				http
					.post(`/upload`, data, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
					.then((res) => {
						console.log(res);
						uploadedImages ? setUploadedImages([...uploadedImages, res.data.filename]) : setUploadedImages([res.data.filename]);
						toast('تصویر با موفقیت آپلود شد', 'success');
					});
			}
			catch (error) {
				console.log(error);
				toast('خطا در آپلود تصویر', 'error');
			}
		}
	};
	
	const handleThumbnailSelect = (event) => {
		initialValues.thumbnail = Array.from(event.target.files);
	};
	
	const handleThumbnailUpload = () => {
		if (initialValues.thumbnail.length !== 0) {
			let data = new FormData();
			data.append('image', initialValues.thumbnail[0]);
			try {
				http
					.post(`/upload`, data, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
					.then((res) => {
						console.log(res);
						setThumbnail(res.data.filename);
						// thumbnail ? setThumbnail(res.data.filename) : setThumbnail('');
						toast('تصویر با موفقیت آپلود شد', 'success');
					});
			}
			catch (error) {
				console.log(error);
				toast('خطا در آپلود تصویر', 'error');
			}
		}
	};
	
	const handleCategory = (event) => {
		switch (event.target.value) {
			case 'لپتاپ':
				setCategory({
					id: 1,
					name: 'لپتاپ',
				});
				break;
			case 'گوشی':
				setCategory({
					id: 2,
					name: 'گوشی',
				});
				break;
			case 'هدفون':
				setCategory({
					id: 3,
					name: 'هدفون'
				})
				break;
			default:
				break;
		}
	};
	
	const handleCKEditorState = (event, editor) => {
		setDescription(editor.getData());
	};
	
	const handleSubmit = (formValues) => {
		formValues.image = uploadedImages;
		formValues.thumbnail= thumbnail;
		formValues.category = category;
		formValues.description = description;
		try {
			http
				.post(`/products?`, formValues)
				.then((res) => {
					console.log(res);
					close();
					refresh();
					toast('کالا با موفقیت اضافه شد', 'success');
				});
		}
		catch (error) {
			console.log(error);
			toast('خطا در افزودن کالا', 'error');
		}
	};
	
	
	return (
		<ThemeProvider theme={theme}>
			<div>
				<Modal
					open={open}
					// onClose={close}
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
								handleSubmit(values);
							}}
						>
							{(formik) => {
								const { isValid, dirty } = formik;
								return (
									<Form className={styles.product_modal}>
										<div>
											<label htmlFor="image">تصاویر کالا:</label>
											<input
												type="file"
												name="image"
												id="image"
												multiple
												onChange={handleImagesSelect}
											/>
											<Button variant="contained" sx={{mt: 1}} component="span" onClick={handleImagesUpload}>
												آپلود تصاویر
											</Button>
										</div>
										
										<div>
											<label htmlFor="thumbnail">تصویر بند انگشتی کالا:</label>
											<input
												type="file"
												name="thumbnail"
												id="thumbnail"
												onChange={handleThumbnailSelect}
											/>
											<Button variant="contained" sx={{mt: 1}} component="span" onClick={handleThumbnailUpload}>
												آپلود تصویر
											</Button>
										</div>
										
										<div>
											<label htmlFor="name">نام کالا:</label>
											<Field
												type="text"
												name="name"
												id="name"
											/>
											<ErrorMessage name="name" component="span" className={styles.error}/>
										</div>
										
										{/*<div>*/}
										{/*	<label htmlFor="name">قیمت کالا:</label>*/}
										{/*	<Field*/}
										{/*		type="number"*/}
										{/*		name="price"*/}
										{/*		id="price"*/}
										{/*	/>*/}
										{/*	<ErrorMessage name="price" component="span" className={styles.error}/>*/}
										{/*</div>*/}
										
										{/*<div>*/}
										{/*	<label htmlFor="name">تعداد کالا:</label>*/}
										{/*	<Field*/}
										{/*		type="number"*/}
										{/*		name="count"*/}
										{/*		id="count"*/}
										{/*	/>*/}
										{/*	<ErrorMessage name="count" component="span" className={styles.error}/>*/}
										{/*</div>*/}
										
										<div>
											<label htmlFor="category">دسته بندی:</label>
											<Field as="select" name="category" id="category"
											       onChange={handleCategory} value={category.name}>
												{categories.map((category) => (
													<option key={category.id} value={category.name}>{category.name}</option>
												))}
											</Field>
											<ErrorMessage name="category" component="span" className={styles.error}/>
										</div>
										
										<div>
											<label htmlFor="description">توضیحات:</label>
											<CKEditor
												editor={ClassicEditor}
												onChange={handleCKEditorState}
											/>
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

export {AddModal}
