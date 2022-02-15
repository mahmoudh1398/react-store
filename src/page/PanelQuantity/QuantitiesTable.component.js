import style from "./QuantitiesTable.module.scss";
import * as React from "react";

const QuantitiesTable = ({quantities}) => {
	return (
		<table className={style.quantityTable}>
			<thead>
			<tr>
				<th>کالا</th>
				<th>قیمت</th>
				<th>موجودی</th>
			</tr>
			</thead>
			<tbody>
			{quantities.map( product =>
				<tr key={product.id}>
					<td>{product.name}</td>
					<td>{product.price}</td>
					<td>{product.count}</td>
				</tr>
			)}
			</tbody>
		</table>
	);
}

export { QuantitiesTable };