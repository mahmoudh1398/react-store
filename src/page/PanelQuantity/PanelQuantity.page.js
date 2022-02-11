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

const PanelQuantity = () => {
	const product = useSelector((state) => state.allProducts.products);
	const dispatch = useDispatch();
	
	useEffect(() => {
		getProducts().then((data) => dispatch(setProducts(data)));
		console.log(product);
	}, []);
	
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 10
	});
	const indexOfLastItem = pagination.currentPage * pagination.postsPerPage;
	const indexOfFirstItem = indexOfLastItem - pagination.postsPerPage;
	const currentProducts = product.slice(indexOfFirstItem, indexOfLastItem);
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	const blue = {
		500: '#00BCD4',
		600: '#00ACC1',
		700: '#0097A7',
	};
	
	const CustomButtonRoot = styled('button')`
	  background-color: ${blue[500]};
	  border-radius: 3px;
	  color: #FFFAFA;
	  transition: all 150ms ease;
	  cursor: pointer;
	  border: none;
     text-align: center;
     width: 100px;

	  &:hover {
	    background-color: ${blue[600]};
	  }
	
	  &.active {
	    background-color: ${blue[700]};
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

			<table className={style.quantityTable}>
				<thead>
					<tr>
						<th>کالا</th>
						<th>قیمت</th>
						<th>موجودی</th>
					</tr>
				</thead>
				<tbody>
					{currentProducts.map( product =>
						<tr key={product.id}>
							<td>{product.firstName}</td>
							<td>{product.price}</td>
							<td>{product.count}</td>
						</tr>
					)}
				</tbody>
			</table>

			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={product.length} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>

		</div>
	);
};

export {PanelQuantity};
