import { useEffect, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux'
import {useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import  style  from './Basket.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {IMAGE_URL} from 'config/variables.config';
import {PATHS} from "config/routes.config";
import {DeleteBtn} from "./components";

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


const Basket = () => {
	
	const navigate = useNavigate();
	const [personOrders, setPersonOrders] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	let basketStatusUpdate = useSelector(state => state.basketStatusUpdate.basketStatusUpdate)
	
	useEffect(() => {
		const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? []
		setPersonOrders(personOrders)
	}, [])
	
	useEffect(() => {
		const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? []
		setPersonOrders(personOrders)
	}, [basketStatusUpdate])
	
	useEffect(() => {
		let sum = 0;
		personOrders.map(order => {
			sum += (order.price * order.userCount)
		})
		setTotalPrice(sum)
	}, [personOrders])
	
	const handleSubmit = () =>  {
		const personOrders = JSON.parse(localStorage.getItem('PERSON_ORDERS')) ?? []
		localStorage.setItem( 'TOTAL_COUNT' , JSON.stringify(totalPrice))
		if(personOrders.length > 0 ){
			navigate(`${PATHS.CHECKOUT}`)
		}
	};
	
	
	return (
		<div className={style.basket_wrapper}>
			<div style={{margin:'4rem 0'}}>
				<h2>سبد خرید</h2>
			</div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="left">نام کالا </StyledTableCell>
							<StyledTableCell align="left">تصویر کالا </StyledTableCell>
							<StyledTableCell align="left"> قیمت </StyledTableCell>
							<StyledTableCell align="left">تعداد </StyledTableCell>
							<StyledTableCell align="right" sx={{pr:8}}> </StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{personOrders.map((personOrder) => (
							<StyledTableRow key={personOrder.id}>
								<StyledTableCell
									component="th"
									scope="row"
									sx={{
										cursor: 'pointer',
									}}
									onClick={() => navigate('/product/'+personOrder.id) }
								>{personOrder.name}
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									<img src={`${IMAGE_URL}${personOrder.image[0]}`} alt="" width='80' />
								</StyledTableCell>
								<StyledTableCell align="left" >{personOrder.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</StyledTableCell>
								<StyledTableCell align="left" >{personOrder.userCount}</StyledTableCell>
								<StyledTableCell align="right" sx={{pr:5}}>
									<DeleteBtn  personOrder={personOrder} personOrders={personOrders}/>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<div style={{margin:'4rem 0', display:'flex', justifyContent:'space-between'}}>
				<span>جمع:  {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} هزار تومان  </span>
				{personOrders.length > 0 ?
					<Button variant="contained" className={style.submitBtn} size='large'  onClick={handleSubmit}>نهایی کردن سبد خرید</Button>
					:
					<Button variant="contained" className={style.disabledSubmitBtn} size='large'>نهایی کردن سبد خرید</Button>
				}
			</div>
		</div>
	);
};

export {Basket};
