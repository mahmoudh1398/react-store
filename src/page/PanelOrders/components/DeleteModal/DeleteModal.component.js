import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Box from "@mui/material/Box";

import http from "services/http.service";
import {notify} from "utils/notify";

import style from "./DeleteModal.module.scss";

const modalStyle = {
	width: 500,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'center',
	height: 200,
};

function DeleteModal({orders, targetOrder, open, close, refresh, prevPage}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	
	const handleClose = () => close();
	
	
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
					notify('سفارش با موفقیت حذف شد', 'success');
				});
		} catch (e) {
			console.log(e);
			notify('خطا در حذف سفارش', 'error');
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
					<DialogTitle id="responsive-dialog-title" className={style.heading}>
						از حذف سفارش این شخص مطمئنی؟
					</DialogTitle>
					<DialogContent>
						<DialogContentText className={style.content}>
							{targetOrder.name} {targetOrder.family}
						</DialogContentText>
					</DialogContent>
					<DialogActions className={style.actions}>
						<Button autoFocus onClick={handleClose} className={style.cancelBtn}>
							خیر
						</Button>
						<Button onClick={handleDelete} autoFocus className={style.submitBtn}>
							بله
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
}

export { DeleteModal };
