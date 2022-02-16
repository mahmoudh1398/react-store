import style from './PanelQuantity.module.scss';
import * as React from "react";
import {Pagination} from "components/Pagination/Pagination.component";
import PropTypes from "prop-types";
import clsx from 'clsx';
import { useButton } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProducts} from "api/products.api";
import {setProducts} from "redux/action/productAction";
import {QuantitiesTable} from "./QuantitiesTable.component";
import http from "../../services/http.service";
import {BASE_URL} from "../../config/variables.config";

let productsCount;

const PanelQuantity = () => {
	
	async function getProductsCount() {
		const response = await http.get(BASE_URL + '/products');
		return response.data;
	};
	getProductsCount().then(response => productsCount = response.length);
	
	const products = useSelector((state) => state.allProducts.products);
	const dispatch = useDispatch();
	
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 10
	});
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	useEffect(() => {
		getProducts(pagination.currentPage).then((data) => dispatch(setProducts(data)));
	}, [pagination.currentPage]);
	
	const teal = {
		500: '#009688',
		600: '#00897B',
		700: '#00796B',
	};
	
	const CustomButtonRoot = styled('button')`
	  background-color: ${teal[500]};
	  border-radius: 3px;
	  color: #FFFAFA;
	  transition: all 150ms ease;
	  cursor: pointer;
	  border: none;
     text-align: center;
     width: 100px;

	  &:hover {
	    background-color: ${teal[600]};
	  }
	
	  &.active {
	    background-color: ${teal[700]};
	  }
	
	  &.focusVisible {
	    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
	    outline: none;
	  }
	
	  &.disabled {
	    opacity: 0.5;
	    cursor: not-allowed;
	  }
`;
	
	const CustomButton = React.forwardRef(function CustomButton(props, ref) {
		const { children } = props;
		const { active, disabled, focusVisible, getRootProps } = useButton({
			...props,
			ref,
			component: CustomButtonRoot,
		});
		
		const classes = {
			active,
			disabled,
			focusVisible,
		};
		
		return (
			<CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
				{children}
			</CustomButtonRoot>
		);
	});
	
	CustomButton.propTypes = {
		children: PropTypes.node,
	};
	
	return (
		<div className={style.wrapper}>

			<div className={style.main_header}>
				<h3>مدیریت موجودی و قیمت ها</h3>
				<CustomButton disabled>ذخیره</CustomButton>
			</div>
			
			<QuantitiesTable quantities={products}/>

			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={productsCount} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>

		</div>
	);
};

export {PanelQuantity};
