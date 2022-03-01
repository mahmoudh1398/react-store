import style from './PanelProduct.module.scss';
import * as React from "react";
import {Pagination} from "components";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import {filteredProducts} from "redux/action/productsAction";
import {getFilteredProducts} from "api/products.api";
import {ProductsTable} from './components';
import {getCategories} from "api/categories.api";
import {setCategories} from "redux/action/categoriesAction";
import {AddModal} from "./components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {EditModal} from "./components";
import {DeleteModal} from "./components";

toast.configure();
let productsCount;

const PanelProduct = () => {
	
	const [addModalOpen, setAddModalOpen] = React.useState(false);
	const handleAddModalOpen = () => setAddModalOpen(true);
	const handleAddModalClose = () => setAddModalOpen(false);
	const [editModalOpen, setEditModalOpen] = React.useState(false);
	const handleEditModalOpen = () => setEditModalOpen(true);
	const handleEditModalClose = () => setEditModalOpen(false);
	const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
	const handleDeleteModalOpen = () => setDeleteModalOpen(true);
	const handleDeleteModalClose = () => setDeleteModalOpen(false);
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		postsPerPage: 6,
	});
	const [category, setCategory] = React.useState({
		category: 'لپتاپ'
	});
	const [refresh, setRefresh] = React.useState(false);
	const [editedProduct, setEditedProduct] = React.useState({});
	const [deletedProduct, setDeletedProduct] = React.useState({
		id: 0,
		name: '',
	});
	
	const filtered_Products = useSelector((state) => state.allProducts.products);
	const categories = useSelector((state) => state.allCategories.categories);
	const dispatch = useDispatch();
	
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	const handleCategory = (category) => {
		setCategory({category});
	};
	const handleRefresh = () => {setRefresh(!refresh);};
	
	useEffect(() => {
		getFilteredProducts(pagination.currentPage, category.category).then((response) => {
			productsCount = +response[1];
			dispatch(filteredProducts(response[0]));
		});
	}, [pagination.currentPage, category.category, refresh]);
	
	useEffect(() => {
		getCategories().then((data) => {
			dispatch(setCategories(data));
		});
	}, []);
	
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
	
	const handleProductEdit = (product) => {
		setEditedProduct(product);
		handleEditModalOpen();
	};
	const handleProductDelete = (id, name) => {
		setDeletedProduct({...deletedProduct, id, name});
		handleDeleteModalOpen();
	};
	
	return (
		<div className={style.wrapper}>
			
			<div className={style.main_header}>
				<h3>مدیریت کالاها</h3>
				<button onClick={handleAddModalOpen}>افزودن کالا</button>
			</div>
			
			<ProductsTable products={filtered_Products} changeCategory={handleCategory} categories={categories}
			               openEditModal={handleProductEdit} openDeleteModal={handleProductDelete}/>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={productsCount} paginate={paginate}
			            nextPage={nextPage} prevPage={prevPage}/>
			
			{addModalOpen && <AddModal open={addModalOpen} close={handleAddModalClose} categories={categories}
			                           refresh={handleRefresh} toast={notify}/>}
			
			{editModalOpen && <EditModal targetProduct={editedProduct} open={editModalOpen} toast={notify}
			                             close={handleEditModalClose} refresh={handleRefresh}/>}
			
			{deleteModalOpen && <DeleteModal products={filtered_Products} targetProduct={deletedProduct}
			                                 open={deleteModalOpen} close={handleDeleteModalClose}
			                                 refresh={handleRefresh} toast={notify} prevPage={prevPage}/>}
			
			<ToastContainer newestOnTop={true} rtl pauseOnFocusLoss />
		</div>
	);
};

export {PanelProduct};
