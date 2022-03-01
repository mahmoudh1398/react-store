import style from './PanelQuantity.module.scss';
import * as React from "react";
import {Pagination} from "components/Pagination/Pagination.component";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getProducts} from "api/products.api";
import {setProducts} from "redux/action/productsAction";
import {PriceCount} from "api/price-count.api";
import {InputCount, InputPrice} from "components";
import Button from "@mui/material/Button";
import {toast, ToastContainer} from "react-toastify";

let productsCount;
toast.configure();

const PanelQuantity = () => {
	
	const products = useSelector((state) => state.allProducts.products);
	const dispatch = useDispatch();
	const [reRender, setReRender] = useState(false);
	const [disable, setDisable] = React.useState(true);
	const [closeInput, setCloseInput] = useState(false);
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 6
	});
	
	const notify = (message, type) => {
		if (type === 'success') {
			toast.success(message, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else if (type === 'error') {
			toast.error(message, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};
	
	useEffect(() => {
		setCloseInput(false);
	}, [reRender]);
	
	useEffect(() => {
		getProducts(pagination.currentPage).then((response) => {
			productsCount = +response[1];
			dispatch(setProducts(response[0]))});
	}, [pagination.currentPage, reRender]);
	
	
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const data = Object.fromEntries(form);
		const count = [];
		const price = [];
		
		for (const key in data) {
			if (data[key]) {
				if (key.split("_")[0] === "price") {
					const obj = {
						[key.split("_")[0]]: data[key],
						id: key.split("_")[1],
					};
					price.push(obj);
				}
			}
		}
		
		for (const key in data) {
			if (data[key]) {
				if (key.split("_")[0] === "count") {
					const obj = {
						[key.split("_")[0]]: data[key],
						id: key.split("_")[1],
					};
					count.push(obj);
				}
			}
		}
		
		price.forEach((item) => {
			PriceCount(item.id, { price: item.price }).then((response) => {
				if (response.status === 200) {
					notify('ویرایش با موفقیت انجام شد', 'success');
				} else {
					notify('ویرایش با موفقیت انجام نشد', 'error');
				}
			});
		});
		count.forEach((item) => {
			PriceCount(item.id, { count: item.count }).then((response) => {
				if (response.status === 200) {
					notify('ویرایش با موفقیت انجام شد', 'success');
				} else {
					notify('ویرایش با موفقیت انجام نشد', 'error');
				}
			});
		});
		
		setCloseInput(true);
		handleSubmitBtn(true);
		setReRender(!reRender);
	};
	const handleSubmitBtn = (className) => {
		if (className === false) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};
	
	return (
		<div className={style.wrapper}>
			<form onSubmit={handleSubmit}>
				<div className={style.main_header}>
					<h3>مدیریت موجودی و قیمت ها</h3>
					<Button variant="contained" disabled={disable} type="submit" className={style.submitBtn}>
						ذخیره
					</Button>
				</div>
				<table className={style.quantityTable}>
					<thead>
						<tr>
							<th>کالا</th>
							<th>موجودی</th>
							<th>قیمت</th>
						</tr>
					</thead>
					<tbody>
						{products.map( (product) =>
							<tr key={product.id}>
								<td>{product.name}</td>
								<InputCount
									placeholder={product.count}
									value={product.count}
									name={product.id}
									func={closeInput}
									disableSubmitBtn={handleSubmitBtn}
								/>
								<InputPrice
									placeholder={product.price}
									value={product.price}
									name={product.id}
									func={closeInput}
									disableSubmitBtn={handleSubmitBtn}
								/>
							</tr>
						)}
					</tbody>
				</table>
				{/*<QuantitiesTable quantities={products} reRender={handleRefresh}/>*/}
			</form>
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={productsCount} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
			
			<ToastContainer newestOnTop={true} rtl pauseOnFocusLoss />

		</div>
	);
};

export {PanelQuantity};
