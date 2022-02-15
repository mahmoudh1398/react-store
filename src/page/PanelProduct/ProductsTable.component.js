import style from "./ProductsTable.module.scss";
import {BASE_URL} from "config/variables.config";
import * as React from "react";

const ProductsTable = ({products}) => {
	return(
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
			{products.map( product => (
					<tr key={product.id}>
						<td><img src={`${BASE_URL}/files/${product.thumbnail}`} alt={product.name}/></td>
						<td>{product.name}</td>
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
	);
}

export { ProductsTable };