import Box  from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {IMAGE_URL} from 'config/variables.config';
import {PATHS} from "config/routes.config";
import style from './ProductItem.module.scss';
import {Link} from "react-router-dom" ;

const ProductItem = ({productItem}) => {
	return (
		<Link to={`${PATHS.PRODUCT}/${productItem.id}`} className={style.card_link}>
			<Card
				sx={{
					backgroundColor: "primary",
					width: 340,
					height: 270,
					padding: "1rem",
					'&:hover': {
						boxShadow: '0 5px 5px rgba(182, 182, 182, 0.75)'
					}
				}}>
				<CardMedia
					component="img"
					height="150"
					image={`${IMAGE_URL}${productItem ? productItem.image[0] : ''}`}
					alt={productItem.name}
					className={style.card_image}
				/>
				<Box  >
					<Typography
						variant="h5"
						color="text.secondary"
						sx={{ fontFamily : 'iransans', fontSize : '1.4rem','&:hover': {color: "#7FD3B0"} }}
						className={style.card_title}
					>
						{productItem ? productItem.name : ''}
					</Typography>
				</Box>
				<CardActions  sx={{ display: 'flex' , justifyContent: 'space-between'}}>
					<Box  sx={{ display: 'flex' , justifyContent: 'space-between', alignItems: 'center' }}>
						<IconButton aria-label="add to cart" >
							<ShoppingCartIcon
								sx={{
									color: "#004D40",
									fontSize: 20 ,
									'&:hover': {
										color: "#7FD3B0",
									},}}
							/>
						</IconButton>
					</Box>
					<Typography
						variant="h5"
						color="text.secondary"
						sx={{
							display: 'flex' ,
							justifyContent: 'flex-end',
							pr: 2 ,
							fontFamily : 'iransans',
							fontSize : '1.4rem',
							'&:hover': {
								color: "#7FD3B0",
							}}}
					>
						{productItem ? productItem.price : ''} تومان
					</Typography>
				</CardActions>
			</Card>
		</Link>
	);
};

export { ProductItem };