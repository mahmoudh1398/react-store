import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {editData} from 'api/products.api'
import {IMAGE_URL} from 'config/variables.config';
import Badge from '@mui/material/Badge';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { uploadImg } from 'api/products.api';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


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

const EditModal = ({targetProduct, open, toast, close, refresh}) => {
	
	const [name, setName] = React.useState(targetProduct.name);
	const [price , setPrice] = React.useState(targetProduct.price);
	const [count , setCount] = React.useState(targetProduct.count);
	const [description , setDescription] = React.useState(targetProduct.description);
	const [imageIds , setImageIds] = React.useState(targetProduct.image);
	const [thumbnail , setThumbnail] = React.useState(targetProduct.thumbnail);
	const [id , setId] = React.useState(targetProduct.id);

	const handleImagesUpload = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append('image', e.target.image.files[0]);
		try {
			uploadImg( data )
				.then(res => {
					imageIds ? setImageIds([...imageIds, res.filename])
						: setImageIds([res.filename]);
					toast('تصویر با موفقیت آپلود شد', 'success');
				})
		} catch (e) {
			toast('خطا در آپلود تصویر', 'error');
			return Promise.reject(e)
		}
	}

	const handleThumbnailUpload =(e) => {
		e.preventDefault();
		let data = new FormData();
		data.append('image', e.target.thumbnail.files[0])
		try {
			uploadImg( data )
				.then(res => {
					setThumbnail(res.filename)
					console.log(res);
					toast('تصویر با موفقیت آپلود شد', 'success');
				})
		} catch (e) {
			toast('خطا در آپلود تصویر', 'error');
			return Promise.reject(e)
		}
	}

	const handleValueChange = ({target}) => {
		if(target.name === 'name'){
			setName(target.value);
		}if(target.name === 'price'){
			setPrice(target.value);
		}if(target.name === 'count'){
			setCount(target.value);
		}if(target.name === 'description'){
			setDescription(target.value);
		}
	};

	const deleteImageHandler= ({target}) => {
		setImageIds(imageIds.filter(imageId => imageId !== target.id));
	}
	const deleteThumbnailHandler= ({target}) => {
		setThumbnail(null)
	}


	const handleEdit =  (e) => {
		e.preventDefault();
		const data = {...targetProduct};
		data.name = name;
		data.price = price;
		data.count = count;
		data.image = imageIds;
		data.thumbnail = thumbnail;
		data.description = description;
		try {
			editData({id ,data})
				.then(res => {
					console.log(res);
					toast('کالا با موفقیت ویرایش شد', 'success');
				})
		} catch (e) {
			toast('خطا در ویرایش کالا', 'error');
			return Promise.reject(e)
		}
		close();
		refresh();
	}

	return (
		<ThemeProvider theme={theme}>
			<Modal
				open={open}
				// onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
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
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{
							mb:1 ,
							display: 'flex',
							justifyContent:'center',
							fontWeight: 'bold',
						}}
					>ویرایش جزییات محصول
					</Typography>
					<Box sx={{bgcolor:'var(--snow)' , p:1}}>
						<Typography
							id="modal-modal-title"
							variant="h8"
							sx={{
								mb:5 ,
								fontWeight: 'bold',
							}}
						> تصاویر کالا :
						</Typography>
						<Box component="form" onSubmit={handleImagesUpload} sx={{
							display: 'flex',
							justifyContent: 'space-between',
							width: 1
						}}>
							<TextField
								margin="normal"
								required
								id="image"
								label="اضافه کردن عکس جدید  "
								name="image"
								type="file"
								autoComplete="name"
								autoFocus
								focused
								sx={{
									mb: 2,
									mt:3,
									p:0,
									width: '70%',
									borderRightRadius:0,
									borderBottomRightRadius:0
								}}
							/>
							<Button
								type="submit"
								variant="contained"
								sx={{
									mt:3,
									mr: 0,
									height: '45px' ,
									width : '25%',
									boxShadow: 0 ,
									borderRadius: 1
								}}>
								<Typography  variant="h8"   sx={{ color:"white" }}>آپلود تصاویر</Typography>
							</Button>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-start',
								flexWrap: 'wrap',
								mt: 2,
								mb: 1,
								borderRadius: 1,
							}}
						>
							{imageIds.length>0 ? imageIds.map((img , index) => (
								<Box
									key={img}
									sx={{
										mb: 2 ,
										mr: 4,
										transitionDuration: '0.3s',
										width:'70',
										'&:hover': {
											transform: 'scale(2)',
											zIndex: '100',
										},
									}}
								>
									<Badge
										badgeContent={
											<HighlightOffIcon
												id={img}
												onClick={deleteImageHandler}
												color="error"
												sx={{
													fontSize: 20
												}}
											/>
										}
										sx={{color:'var(--white)'}}
									>
										<img src={`${IMAGE_URL}${img}`} alt=""   width= '70'  height='60' />
									</Badge>
								</Box>
							)) :<Typography color='error' variant="subtitle2" sx={{ mb:3}} >تصویری  برای نمایش وجود ندارد</Typography>}
						</Box>
					</Box>
					<Box sx={{ p:1}}>
						<Typography
							id="modal-modal-title"
							variant="h8"
							sx={{
								mb:5 ,
								fontWeight: 'bold',
							}}
						>تصویر بند انگشتی :
						</Typography>
						<Box component="form" onSubmit={handleThumbnailUpload} sx={{
							display: 'flex',
							justifyContent: 'space-between',
							width: 1
						}}>
							<TextField
								margin="normal"
								required
								id="thumbnail"
								label="اضافه کردن عکس جدید  "
								name="thumbnail"
								type="file"
								autoComplete="name"
								autoFocus
								focused
								sx={{
									mb: 2,
									mt:3,
									p:0,
									width: '70%',
									borderRightRadius:0,
									borderBottomRightRadius:0
								}}
							/>
							<Button
								type="submit"
								variant="contained"
								sx={{
									mt:3,
									mr: 0,
									height: '45px' ,
									width : '25%',
									boxShadow: 0 ,
									borderRadius: 1
								}}>
								<Typography  variant="h8"   sx={{ color:"white" }}>آپلود تصویر</Typography>
							</Button>
						</Box>
						<Box>
							{thumbnail ? (
								<Box
									sx={{
										display: 'flex',
										flexWrap: 'wrap',
										mt: 2,
										mb: 1,
										bgcolor: 'background.paper',
										maxWidth: 300,
										borderRadius: 1,
									}}
								>
									<Box
										key={thumbnail}
										sx={{
											mb: 2 ,
											mr: 4,
											transitionDuration: '0.3s',
											width:'20%',
											'&:hover': {
												transform: 'scale(2)',
												zIndex: '100',
											},
										}}>
										<Badge
											badgeContent={
												<HighlightOffIcon
													id={thumbnail}
													onClick={deleteThumbnailHandler}
													color="error"
													sx={{
														fontSize: 20
													}}
												/>
											}
											sx={{color:'var(--white)'}}
										>
											<img src={`${IMAGE_URL}${thumbnail}`} alt=""   width= '70' />
										</Badge>
									</Box>

								</Box>
							) : <Typography
								variant="subtitle2"
								color='error'
								sx={{ mb:3 , mt:3}}
							>تصویری  برای نمایش وجود ندارد
							</Typography>
							}
						</Box>
					</Box>
					<Box   Validate  >
						<TextField
							margin="normal"
							required
							fullWidth
							value={name || ''}
							onChange={handleValueChange}
							name="name"
							label="نام کالا"
							id="name"
							focused
							sx={{
								mb: 2,
							}}
						/>
						{/*<Box  sx={{ display: 'flex', justifyContent: 'space-between'}}>*/}
						{/*</Box>*/}
						<TextField
							margin="normal"
							required
							fullWidth
							value={description || ''}
							onChange={handleValueChange}
							name="description"
							label="توضیحات"
							id="description"
							focused
							sx={{
								mb: 2,
								mr:3,
							}}
						/>

						<Button
							type="submit"
							onClick={handleEdit}
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 , height: '50px'}}
						>
							ذخیره
						</Button>
					</Box>
				</Box>
			</Modal>
		</ThemeProvider>
	);
}

export  {EditModal};