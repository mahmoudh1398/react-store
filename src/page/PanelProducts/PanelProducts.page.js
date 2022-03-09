import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import {getFilteredProducts} from "api/products.api";
import {getCategories} from "api/categories.api";
import {Pagination} from "components";
import {filteredProducts} from "redux/action/productsAction";
import {setCategories} from "redux/action/categoriesAction";

import {ProductsTable, AddModal, EditModal, DeleteModal} from './components';
import style from './PanelProducts.module.scss';


const PanelProducts = () => {
	
	const [totalProducts, setTotalProducts] = useState(0);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		postsPerPage: 6,
	});
	const [category, setCategory] = useState({
		category: 'لپتاپ'
	});
	const [refresh, setRefresh] = useState(false);
	const [editedProduct, setEditedProduct] = useState({});
	const [deletedProduct, setDeletedProduct] = useState({
		id: 0,
		name: '',
	});
	
	const dispatch = useDispatch();
	const products = useSelector((state) => state.allProducts.products);
	const categories = useSelector((state) => state.allCategories.categories);
	
	const paginate = pageNum => setPagination({...pagination, currentPage: pageNum});
	const nextPage = () => setPagination({...pagination, currentPage: pagination.currentPage + 1});
	const prevPage = () => setPagination({...pagination, currentPage: pagination.currentPage - 1});
	
	const handleAddModalOpen = () => setAddModalOpen(true);
	const handleAddModalClose = () => setAddModalOpen(false);
	const handleEditModalOpen = () => setEditModalOpen(true);
	const handleEditModalClose = () => setEditModalOpen(false);
	const handleDeleteModalOpen = () => setDeleteModalOpen(true);
	const handleDeleteModalClose = () => setDeleteModalOpen(false);
	const handleCategory = (category) => setCategory({category});
	const handleRefresh = () => setRefresh(!refresh);
	const handleProductEdit = (product) => {
		setEditedProduct(product);
		handleEditModalOpen();
	};
	const handleProductDelete = (id, name) => {
		setDeletedProduct({id, name});
		handleDeleteModalOpen();
	};
	
	useEffect(() => {
		getFilteredProducts(pagination.currentPage, category.category).then((response) => {
			setTotalProducts(+response[1]);
			dispatch(filteredProducts(response[0]));
		});
	}, [pagination.currentPage, category.category, refresh]);
	
	useEffect(() => {
		getCategories().then((data) => {
			dispatch(setCategories(data));
		});
	}, []);
	
	
	return (
		<div className={style.wrapper}>
			
			<div className={style.main_header}>
				<h3>مدیریت کالاها</h3>
				<button onClick={handleAddModalOpen}>افزودن کالا</button>
			</div>
			
			<ProductsTable products={products} changeCategory={handleCategory} categories={categories}
			               openEditModal={handleProductEdit} openDeleteModal={handleProductDelete}/>
			
			<Pagination postsPerPage={pagination.postsPerPage} totalPosts={totalProducts} paginate={paginate}
			            nextPage={nextPage} prevPage={prevPage}/>
			
			{addModalOpen && <AddModal open={addModalOpen} close={handleAddModalClose} categories={categories}
			                           refresh={handleRefresh}/>}
			
			{editModalOpen && <EditModal targetProduct={editedProduct} open={editModalOpen}
			                             close={handleEditModalClose} refresh={handleRefresh}/>}
			
			{deleteModalOpen && <DeleteModal products={products} targetProduct={deletedProduct}
			                                 open={deleteModalOpen} close={handleDeleteModalClose}
			                                 refresh={handleRefresh} prevPage={prevPage}/>}
			
		</div>
	);
};

export {PanelProducts};
