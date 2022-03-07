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
import Box from "@mui/material/Box";

const modalStyle = {
	width: 500,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: 200,
};

function DeleteModal({orders, targetOrder, open, close, refresh, toast, prevPage}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	
	const handleClose = () => {
		close();
	};
	
	const handleDelete = () => {
		try {
			http
				.delete(`/orders/${targetOrder.id}`)
				.then((res) => {
					console.log(res);
					if (orders.length-1 === 0 || orders.length-1 <= 0) {
						prevPage();
					}
					refresh();
					close();
					toast('سفارش با موفقیت حذف شد', 'success');
				});
		} catch (e) {
			console.log(e);
			toast('خطا در حذف سفارش', 'error');
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
				<Box sx={modalStyle}>
					<DialogTitle id="responsive-dialog-title">
						آیا از حذف این سفارش مطمئن هستید؟
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{targetOrder.name} {targetOrder.family}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button autoFocus onClick={handleClose} sx={{color: 'red'}}>
							خیر
						</Button>
						<Button onClick={handleDelete} autoFocus sx={{color: 'green'}}>
							بله
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
}

export { DeleteModal };
