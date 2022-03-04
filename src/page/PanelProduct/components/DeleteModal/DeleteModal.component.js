import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import http from "services/http.service";


function DeleteModal({products, targetProduct, open, close, refresh, toast, prevPage}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	
	const handleClose = () => {
		close();
	};
	
	const handleDelete = () => {
		try {
			http
				.delete(`/products/${targetProduct.id}`)
				.then((res) => {
					console.log(res);
					if (products.length-1 === 0 || products.length-1 <= 0) {
						prevPage();
					}
					refresh();
					close();
					toast('کالا با موفقیت حذف شد', 'success');
				});
		} catch (e) {
			console.log(e);
			toast('خطا در حذف کالا', 'error');
		}
	}
	
	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					آیا از حذف این کالا مطمئن هستید؟
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{targetProduct.name}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						خیر
					</Button>
					<Button onClick={handleDelete} autoFocus>
						بله
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export { DeleteModal };
