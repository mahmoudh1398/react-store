import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './VerifyBtn.module.scss';
import {editOrder} from "api/orders.api";
import {useState} from "react";
import moment from "jalali-moment";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {IMAGE_URL} from "config/variables.config";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TableContainer from "@mui/material/TableContainer";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {notify} from "utils/notify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#004D40',
		color: '#FFF',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
}));

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	width: 500,
	overflow:'scroll',
	height:'90%',
	display:'block',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	border: '.2px solid #000',
	boxShadow: 1,
	p: 4,
};

const VerifyBtn = ({orders, targetOrder, prevPage, open, close, refresh}) => {
	
	const handleEdit =  (e) => {
		e.preventDefault();
		const data = {...targetOrder};
		if(targetOrder.delivered === false){
			data.delivered = !targetOrder.delivered;
			data.orderDeliveryEndTime = moment(new Date(), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
		}
		try {
			editOrder(targetOrder.id ,data)
				.then(res => {
					console.log(res);
					if (orders.length-1 === 0 || orders.length-1 <= 0) {
						prevPage();
					}
					close();
					refresh();
					notify('سفارش با موفقیت ویرایش شد', 'success');
				})
		} catch (e) {
			notify('خطا در ویرایش سفارش', 'error');
			return Promise.reject(e)
		}
	}
	
	return (
		<>
			<Modal
				open={open}
				// onClose={close}
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
							justifyContent:'flex-start',
							fontWeight: 'bold',
						}}
					>بررسی سفارش
					</Typography>
					<Typography id={targetOrder.id} variant="h6"> نام مشتری: {targetOrder.name} {targetOrder.family ? targetOrder.family : ''}</Typography>
					<Typography id={targetOrder.id} variant="h6"> آدرس: {targetOrder.address}</Typography>
					<Typography id={targetOrder.id} variant="h6"> تلفن: {targetOrder.tel}</Typography>
					<Typography id={targetOrder.id} variant="h6"> تاریخ درخواست تحویل: {targetOrder.deliveryRequestTime}</Typography>
					<Typography id={targetOrder.id} variant="h6"> تاریخ ثبت سفارش: {moment(new Date(targetOrder.createdAt), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</Typography>
					<TableContainer component={Paper} sx={{my: 1}}>
						<Table sx={{ minWidth: 500 }} aria-label="customized table">
							<TableHead>
								<TableRow>
									<StyledTableCell align="left">کالا</StyledTableCell>
									<StyledTableCell align="left">قیمت</StyledTableCell>
									<StyledTableCell align="left">تعداد</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{targetOrder.personOrders.map((order) => (
									<StyledTableRow key={order.id}>
										<StyledTableCell align="left">{order.name}</StyledTableCell>
										<StyledTableCell align="left">{order.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</StyledTableCell>
										<StyledTableCell align="left">{order.userCount}</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{targetOrder.delivered ?
						<Typography id={targetOrder.id} variant="h6"> تاریخ تحویل: {targetOrder.orderDeliveryEndTime}</Typography>
						:
						<Box   noValidate  >
							<Button
								type="submit"
								
								onClick={handleEdit}
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2, height: '50px', backgroundColor: '#004D40', ":hover" :{backgroundColor: '#00695C'} }}
							>
								تحویل شد
							</Button>
						</Box>
					}
				</Box>
			</Modal>
		</>
	
	);
}

export  {VerifyBtn};