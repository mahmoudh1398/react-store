import {useEffect, useRef, useState} from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormData from "form-data";

import http from "services/http.service";
import {notify} from "utils/notify";

import style from "./AddModal.module.scss";
import Badge from "@mui/material/Badge";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {IMAGE_URL} from "../../../../config/variables.config";
import * as React from "react";


const addModalStyle = {
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

const signInSchema = Yup.object().shape({
	name: Yup.string().required('پر کردن این فیلد اجباری است'),
});

const initialValues = {
	image: [],
	thumbnail: [],
	name: '',
	category: '',
	description: '',
};

function AddModal({open, close, categories, refresh}) {
	
	const imageInput = useRef();
	const thumbnailInput = useRef();
	const [selectedImage, setSelectedImage] = useState();
	const [selectedThumbnail, setSelectedThumbnail] = useState();
	const [previewImage, setPreviewImage] = useState();
	const [previewThumbnail, setPreviewThumbnail] = useState();
	const [uploadedImages, setUploadedImages] = useState([]);
	const [thumbnail , setThumbnail] = useState('');
	const [category, setCategory] = useState({
		id: null,
		name: '',
	});
	const [description, setDescription] = useState('');
	
	useEffect(() => {
		if (!selectedImage) {
			setPreviewImage(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedImage);
		setPreviewImage(objectUrl);
		
		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedImage]);
	
	useEffect(() => {
		if (!selectedThumbnail) {
			setPreviewThumbnail(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedThumbnail);
		setPreviewThumbnail(objectUrl);
		
		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedThumbnail]);
	
	const handleImagesSelect = (event) => {
		
		if (!event.target.files || event.target.files.length === 0) {
			setSelectedImage(undefined);
			return;
		}
		
		if (event.target.files[0]) {
			const image = event.target.files[0];
			if (image.type !== 'image/jpeg') {
				alert('فرمت تصویر باید jpeg باشد');
				event.target.value = '';
				return;
			}
			if (image.size > 2 * 1024 * 1024) {
				alert('حجم تصویر باید کمتر از 2 مگابایت باشد');
				event.target.value = '';
				return;
			}
			setSelectedImage(event.target.files[0]);
			initialValues.image = Array.from(event.target.files);
		}
	};
	
	const deleteSelectedImage = () => {
		setSelectedImage(undefined);
		imageInput.current.value = '';
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
						uploadedImages ? setUploadedImages([...uploadedImages, res.data.filename]) : setUploadedImages([res.data.filename]);
						notify('تصویر با موفقیت آپلود شد', 'success');
					});
			}
			catch (error) {
				console.log(error);
				notify('خطا در آپلود تصویر', 'error');
			}
		}
	};
	
	const handleThumbnailSelect = (event) => {
		
		if (!event.target.files || event.target.files.length === 0) {
			setSelectedThumbnail(undefined);
			return;
		}
		
		if (event.target.files[0]) {
			const thumbnail = event.target.files[0];
			if (thumbnail.type !== 'image/jpeg') {
				alert('فرمت تصویر باید jpeg باشد');
				event.target.value = '';
				return;
			}
			if (thumbnail.size > 2 * 1024 * 1024) {
				alert('حجم تصویر باید کمتر از 2 مگابایت باشد');
				event.target.value = '';
				return;
			}
			setSelectedThumbnail(event.target.files[0])
			initialValues.thumbnail = Array.from(event.target.files);
		}
	};
	
	const deleteSelectedThumbnail = () => {
		setSelectedThumbnail(undefined);
		thumbnailInput.current.value = '';
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
						setThumbnail(res.data.filename);
						// thumbnail ? setThumbnail(res.data.filename) : setThumbnail('');
						notify('تصویر با موفقیت آپلود شد', 'success');
					});
			}
			catch (error) {
				console.log(error);
				notify('خطا در آپلود تصویر', 'error');
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
					notify('کالا با موفقیت اضافه شد', 'success');
				});
		}
		catch (error) {
			console.log(error);
			notify('خطا در افزودن کالا', 'error');
		}
	};
	
	
	return (
		<div>
			<Modal
				open={open}
				// onClose={close}
			>
				<Box sx={addModalStyle}>
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
					<h3>افزودن کالا</h3>
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
								<Form className={style.product_modal}>
									<div>
										<label htmlFor="image">آلبوم تصاویر:</label>
										<input
											type="file"
											name="image"
											id="image"
											onChange={handleImagesSelect}
											accept="image/jpeg"
											ref={imageInput}
										/>
										{selectedImage &&
											<Badge color="error" anchorOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}>
												<HighlightOffIcon
													onClick={deleteSelectedImage}
													color="error"
													sx={{
														fontSize: 20,
														cursor: 'pointer'
													}}
												/>
												<img src={previewImage} alt="" className={style.selected_image} />
											</Badge>
										}
										<Button variant="contained" sx={{mt: 1, backgroundColor: '#004D40', ":hover" :{backgroundColor: '#00695C'}}} component="span" onClick={handleImagesUpload}>
											آپلود تصاویر
										</Button>
									</div>
									
									<div>
										<label htmlFor="thumbnail">تصویر بند انگشتی:</label>
										<input
											type="file"
											name="thumbnail"
											id="thumbnail"
											onChange={handleThumbnailSelect}
											accept="image/jpeg"
											ref={thumbnailInput}
										/>
										{selectedThumbnail &&
											<Badge color="error" anchorOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}>
												<HighlightOffIcon
													onClick={deleteSelectedThumbnail}
													color="error"
													sx={{
														fontSize: 20,
														cursor: 'pointer'
													}}
												/>
												<img src={previewThumbnail} alt="" className={style.selected_image} />
											</Badge>
										}
										<Button variant="contained" sx={{mt: 1, backgroundColor: '#004D40', ":hover" :{backgroundColor: '#00695C'}}} component="span" onClick={handleThumbnailUpload}>
											آپلود تصویر
										</Button>
									</div>
									
									<div>
										<label htmlFor="name">نام:</label>
										<Field
											type="text"
											name="name"
											id="name"
										/>
										<ErrorMessage name="name" component="span" className={style.error}/>
									</div>
									
									<div>
										<label htmlFor="category">دسته بندی:</label>
										<Field as="select" name="category" id="category"
										       onChange={handleCategory} value={category.name}>
											{categories.map((category) => (
												<option key={category.id} value={category.name}>{category.name}</option>
											))}
										</Field>
										<ErrorMessage name="category" component="span" className={style.error}/>
									</div>
									
									<div>
										<label htmlFor="description">توضیحات:</label>
										<CKEditor
											editor={ClassicEditor}
											name="description"
											config={{ language : 'fa' }}
											onChange={handleCKEditorState}
										/>
									</div>
									
									<button
										type="submit"
										className={!(dirty && isValid) ? style.disabled_btn : null}
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
	);
}

export {AddModal}
