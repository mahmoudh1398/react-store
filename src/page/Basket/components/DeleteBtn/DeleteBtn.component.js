import * as React from 'react';
import { useSelector ,useDispatch} from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import {deleteData} from 'api/panel.data.api';
import DeleteIcon from '@mui/icons-material/Delete';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '30%',
	bgcolor: 'background.paper',
	border: '.2px solid #000',
	boxShadow: 1,
	p: 4,
};

const DeleteBtn = ({personOrder, personOrders}) => {
	
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch()
	let basketStatusUpdate = useSelector(state => state.basketStatusUpdate.basketStatusUpdate)
	
	
	const handelDelOrder= ({target}) => {
		const id = +target.id
		const newOrders= personOrders.filter(item => item.id !== id)
		localStorage.setItem( 'PERSON_ORDERS' , JSON.stringify(newOrders))
		dispatch({type: 'RE_RENDER_STATUS', payload: !basketStatusUpdate})
		handleClose()
	}
	
	
	return (
		<>
			<Button size="large" onClick={handleOpen} style={{color: 'red', fontSize: '1rem'}}>حذف</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{
							mb:5 ,
							display: 'flex',
							justifyContent:'center'
						}}
					>از حذف محصول اطمینان دارید ؟
					</Typography>
					<Box  sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-around' }}>
						<Button
							size="large"
							variant="outlined"
							color="error"
							id={personOrder.id}
							onClick={handelDelOrder}
							startIcon={<DeleteIcon />}
							sx={{
								m:5,
								width:'150px',
								height:'42px',
							}}
						>بله
						</Button>
						<Button
							size="large"
							variant="outlined"
							color="success"
							onClick={handleClose}
							sx={{
								m:5,
								width:'150px',
								height:'42px',
							}}
						>خیر
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	
	);
}

export  {DeleteBtn};