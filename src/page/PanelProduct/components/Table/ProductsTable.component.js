import style from "./ProductsTable.module.scss";
import {BASE_URL} from "config/variables.config";
import * as React from "react";


const ProductsTable = ({products, changeCategory, categories, openEditModal, openDeleteModal}) => {
	
	function handleCategory(e) {
		changeCategory(e.target.value);
	}
	
	function handleEdit (product) {
		openEditModal(product);
	}
	
	function handleDelete(id, name) {
		openDeleteModal(id, name);
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
							<button onClick={() => handleDelete(product.id, product.name)}>حذف</button>
						</td>
					</tr>
				)
			)}
			</tbody>
		</table>
	);
}

export { ProductsTable };