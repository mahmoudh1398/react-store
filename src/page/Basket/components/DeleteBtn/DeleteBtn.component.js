import {useState} from "react";
import { useSelector ,useDispatch} from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import style from './DeleteBtn.module.scss';


const modalStyle = {
	width: 500,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'center',
	height: 200,
};

const deleteModalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	height: 200,
	bgcolor: 'background.paper',
	border: '.2px solid #000',
	boxShadow: 1,
	p: 4,
};

const DeleteBtn = ({personOrder, personOrders}) => {
	
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch()
	let basketStatusUpdate = useSelector(state => state.basketStatusUpdate.basketStatusUpdate)
	
	
	const handelDeleteOrder= ({target}) => {
		const id = +target.id
		const newOrders= personOrders.filter(item => item.id !== id)
		localStorage.setItem( 'PERSON_ORDERS' , JSON.stringify(newOrders))
		dispatch({type: 'RE_RENDER_STATUS', payload: !basketStatusUpdate})
		handleClose();
		// lottieShow();
	}
	
	
	return (
		<>
			<Button size="large" onClick={handleOpen} className={style.deleteBtn}>حذف</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<Box sx={modalStyle}>
					<DialogTitle id="responsive-dialog-title" className={style.heading}>
						از حذف این کالا اطمینان دارید؟
					</DialogTitle>
					<DialogContent>
						<DialogContentText className={style.content}>
							{personOrder.name}
						</DialogContentText>
					</DialogContent>
					<DialogActions className={style.actions}>
						<Button autoFocus onClick={handleClose} className={style.cancelBtn}>
							خیر
						</Button>
						<Button onClick={handelDeleteOrder} autoFocus className={style.submitBtn} id={personOrder.id}>
							بله
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</>
	);
}

export  {DeleteBtn};