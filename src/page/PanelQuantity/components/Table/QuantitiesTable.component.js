// import style from "./QuantitiesTable.module.scss";
// import * as React from "react";
// import {PriceCount} from "api/price-count.api";
// import {useState} from "react";
// import {InputCount, InputPrice} from "components";
//
// const QuantitiesTable = ({quantities, refresh}) => {
//
// 	const [closeInput, setCloseInput] = useState(false);
//
// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const form = new FormData(e.target);
// 		const data = Object.fromEntries(form);
// 		const count = [];
// 		const price = [];
//
// 		for (const key in data) {
// 			if (data[key]) {
// 				if (key.split("_")[0] === "price") {
// 					const obj = {
// 						[key.split("_")[0]]: data[key],
// 						id: key.split("_")[1],
// 					};
// 					price.push(obj);
// 				}
// 			}
// 		}
//
// 		for (const key in data) {
// 			if (data[key]) {
// 				if (key.split("_")[0] === "count") {
// 					const obj = {
// 						[key.split("_")[0]]: data[key],
// 						id: key.split("_")[1],
// 					};
// 					count.push(obj);
// 				}
// 			}
// 		}
//
// 		price.forEach((item) => {
// 			PriceCount(item.id, { price: item.price });
// 		});
//
// 		count.forEach((item) => {
// 			PriceCount(item.id, { count: item.count });
// 		});
//
// 		setCloseInput(true);
// 		refresh();
// 	};
//
// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<table className={style.quantityTable}>
// 				<thead>
// 				<tr>
// 					<th>کالا</th>
// 					<th>قیمت</th>
// 					<th>موجودی</th>
// 				</tr>
// 				</thead>
// 				<tbody>
// 				{quantities.map( product =>
// 					<tr key={product.id}>
// 						<td>{product.name}</td>
// 						<InputPrice
// 							placeholder={product.price}
// 							value={product.price}
// 							name={product.id}
// 							func={closeInput}
// 						/>
// 						<InputCount
// 							placeholder={product.count}
// 							value={product.count}
// 							name={product.id}
// 							func={closeInput}
// 						/>
// 					</tr>
// 				)}
// 				</tbody>
// 			</table>
// 		</form>
// 	);
// }
//
// export { QuantitiesTable };