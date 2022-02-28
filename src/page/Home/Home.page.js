import styles from './Home.module.scss';
import Box from '@mui/material/Box';
import {ProductsList} from "./components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCategories} from "../../api/categories.api";
import {setCategories} from "../../redux/action/categoriesAction";


const Home = () => {
   
   const categories = useSelector((state) => state.allCategories.categories);
   const dispatch = useDispatch();
   useEffect(() => {
      getCategories().then((data) => {
         dispatch(setCategories(data));
      });
   }, []);
   
  return (
     <div className={styles.wrapper}>
        {categories && categories.map((category) => (
           <ProductsList category={category}/>
        ))}
     </div>
  );
}

export {Home};
