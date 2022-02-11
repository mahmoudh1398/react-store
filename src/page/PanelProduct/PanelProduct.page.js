import style from './PanelProduct.module.scss';
import * as React from "react";
import {Pagination} from "components";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import { setProducts } from "redux/action/productAction";
import { getProducts } from "api/products.api";
import {BASE_URL} from "config/variables.config";
import axios from "axios";

const PanelProduct = () => {
	const product = useSelector((state) => state.allProducts.products);
	const dispatch = useDispatch();
	
	useEffect(() => {
		getProducts().then((data) => dispatch(setProducts(data)));
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
	
	return (
		<div className={style.wrapper}>
			
			<div className={style.main_header}>
				<h3>مدیریت کالاها</h3>
				<button>افزودن کالا</button>
			</div>
			
			<table className={style.productTable}>
				<thead>
					<tr>
						<th>تصویر</th>
						<th>نام کالا</th>
						<th>دسته بندی</th>
						<th>عملیات</th>
					</tr>
				</thead>
				<tbody>
					{currentProducts.map( product => (
						<tr key={product.id}>
							<td><img src={`${BASE_URL}/files/fc5cb2cb11a7cff0d2d05b09e2d65b82`} alt={product.firstname}/></td>
							<td>{product.firstName}</td>
							<td>{product.category.name}</td>
							<td>
								<button>ویرایش</button>
								<button>حذف</button>
							</td>
						</tr>
						)
					)}
				</tbody>
			</table>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={product.length} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
		
		</div>
	);
};

export {PanelProduct};
