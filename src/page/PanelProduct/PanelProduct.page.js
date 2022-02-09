import style from './PanelProduct.module.scss';
import * as React from "react";
import {Pagination} from "./components";

const PanelProduct = () => {
	const myArray = [
		{
			"createdAt": "2022-01-22T18:06:02.961Z",
			"category": "Design",
			"title": "repudiandae quia aut",
			"teacher": "Cedric Lehner",
			"company": "Kihn LLC",
			"position": "Regional Program Administrator",
			"price": "737.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "1"
		},
		{
			"createdAt": "2022-01-22T14:10:16.455Z",
			"category": "Design",
			"title": "vel fugiat ut",
			"teacher": "Loretta Cronin",
			"company": "Von, Kulas and Kertzmann",
			"position": "Principal Metrics Consultant",
			"price": "342.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "2"
		},
		{
			"createdAt": "2022-01-22T20:59:35.843Z",
			"category": "Design",
			"title": "fuga atque est",
			"teacher": "Ginger Barton",
			"company": "Williamson and Sons",
			"position": "Dynamic Metrics Officer",
			"price": "614.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "3"
		},
		{
			"createdAt": "2022-01-22T14:03:38.004Z",
			"category": "Design",
			"title": "minima id earum",
			"teacher": "Robyn Brown",
			"company": "Crist Group",
			"position": "Central Program Administrator",
			"price": "107.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "4"
		},
		{
			"createdAt": "2022-01-23T00:41:19.655Z",
			"category": "Design",
			"title": "hic sapiente et",
			"teacher": "Veronica King I",
			"company": "Simonis, Emmerich and Roob",
			"position": "Product Tactics Assistant",
			"price": "45.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "5"
		},
		{
			"createdAt": "2022-01-22T20:03:53.021Z",
			"category": "Design",
			"title": "fugiat dolor hic",
			"teacher": "Tommie Lowe",
			"company": "Feil - Wyman",
			"position": "Regional Accounts Agent",
			"price": "266.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "6"
		},
		{
			"createdAt": "2022-01-22T12:46:38.891Z",
			"category": "Design",
			"title": "porro illum magni",
			"teacher": "Olive Robel",
			"company": "Moen, McLaughlin and Schultz",
			"position": "Human Metrics Specialist",
			"price": "401.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "7"
		},
		{
			"createdAt": "2022-01-22T11:54:51.921Z",
			"category": "Design",
			"title": "ullam ipsam non",
			"teacher": "Sonia Kozey DDS",
			"company": "Botsford, Towne and Bayer",
			"position": "Legacy Applications Engineer",
			"price": "120.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "8"
		},
		{
			"createdAt": "2022-01-22T23:17:11.327Z",
			"category": "Design",
			"title": "culpa dolorum vero",
			"teacher": "Latoya Reichel",
			"company": "Schmidt - Lang",
			"position": "Internal Group Consultant",
			"price": "910.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "9"
		},
		{
			"createdAt": "2022-01-22T21:10:32.506Z",
			"category": "Design",
			"title": "eum quia qui",
			"teacher": "Brandi Rosenbaum",
			"company": "Volkman - Christiansen",
			"position": "Future Branding Agent",
			"price": "593.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "10"
		},
		{
			"createdAt": "2022-01-22T08:58:02.751Z",
			"category": "Design",
			"title": "omnis enim accusamus",
			"teacher": "Oscar Walter",
			"company": "Ryan - Bernier",
			"position": "Customer Quality Producer",
			"price": "582.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "11"
		},
		{
			"createdAt": "2022-01-22T11:15:54.810Z",
			"category": "Design",
			"title": "ipsum perspiciatis reprehenderit",
			"teacher": "Elsie Mosciski",
			"company": "Fadel Group",
			"position": "Central Web Strategist",
			"price": "787.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "12"
		},
		{
			"createdAt": "2022-01-22T22:19:18.136Z",
			"category": "Design",
			"title": "culpa dolorem sint",
			"teacher": "Mercedes Boyer IV",
			"company": "Lang, Mitchell and Quitzon",
			"position": "Forward Operations Supervisor",
			"price": "201.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "13"
		},
		{
			"createdAt": "2022-01-22T11:59:07.760Z",
			"category": "CSS",
			"title": "nulla eos nemo",
			"teacher": "Mrs. Clyde Kassulke",
			"company": "Mraz, Schulist and Satterfield",
			"position": "International Brand Assistant",
			"price": "353.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "14"
		},
		{
			"createdAt": "2022-01-22T20:01:55.166Z",
			"category": "CSS",
			"title": "sint et temporibus",
			"teacher": "Marsha Hammes",
			"company": "Bechtelar - Goyette",
			"position": "National Marketing Producer",
			"price": "535.00",
			"courseImage": "http://placeimg.com/640/480/abstract",
			"companyLogo": "http://placeimg.com/640/480/business",
			"id": "15"
		},
	]
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 10
	});
	const indexOfLastItem = pagination.currentPage * pagination.postsPerPage;
	const indexOfFirstItem = indexOfLastItem - pagination.postsPerPage;
	const currentProducts = myArray.slice(indexOfFirstItem, indexOfLastItem);
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	return (
		<div className={style.wrapper}>
			
			<div className={style.main_header}>
				<h3>مدیریت کالاها</h3>
				<button>افزودن کالا</button>
			</div>
			
			<table>
				<tr>
					<th>تصویر</th>
					<th>نام کالا</th>
					<th>دسته بندی</th>
					<th>عملیات</th>
				</tr>
				{currentProducts.map( product =>
					<tr key={product.id}>
						<td><img src={product.companyLogo} alt=""/></td>
						<td>کره سنتی شکلی 100 گرمی</td>
						<td>مواد غذایی / لبنیات</td>
						<td>
							<button>ویرایش</button>
							<button>حذف</button>
						</td>
					</tr>
				)}
			</table>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={myArray.length} paginate={paginate}
			            nextPage={nextPage}
			            prevPage={prevPage}/>
		
		</div>
	);
};

export {PanelProduct};
