import style from "./ProductsTable.module.scss";
import {BASE_URL} from "config/variables.config";
import * as React from "react";
import http from "services/http.service";


const ProductsTable = ({products, changeCategory, categories, refresh, toast, openEditModal}) => {
	
	function handleCategory(e) {
		changeCategory(e.target.value);
	}
	
	function handleEdit (product) {
		openEditModal(product);
	}
	
	function handleDelete(id) {
		try {
			http
				.delete(`/products/${id}`)
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						refresh();
						toast('کالا با موفقیت حذف شد', 'success');
					}
				});
		} catch (e) {
			console.log(e);
			toast('خطا در حذف کالا', 'error');
		}
	}
	
	return(
		<table className={style.productTable}>
			<thead>
			<tr>
				<th>تصویر</th>
				<th>نام کالا</th>
				<th className={style.category}>
					<label htmlFor="categories">دسته بندی</label>
					<select name="category" id="categories" onChange={handleCategory}>
						{categories.map((category) => (
							<option key={category.id} value={category.name}>{category.name}</option>
						))}
					</select>
				</th>
				<th>عملیات</th>
			</tr>
			</thead>
			<tbody>
			{products.map( product => (
					<tr key={product.id}>
						<td><img className={style.image} src={`${BASE_URL}/files/${product.thumbnail}`} alt={product.name}/></td>
						<td>{product.name}</td>
						<td>{product.category.name}</td>
						<td className={style.actions}>
							<button onClick={() => handleEdit(product)}>ویرایش</button>
							<button onClick={() => handleDelete(product.id)}>حذف</button>
						</td>
					</tr>
				)
			)}
			</tbody>
		</table>
	);
}

export { ProductsTable };