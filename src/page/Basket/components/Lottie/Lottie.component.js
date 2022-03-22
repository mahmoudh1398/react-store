import {useEffect, useRef} from "react";
import style from "./Lottie.module.scss";
import lottie from "lottie-web";

const Lottie = () => {
	
	const container = useRef(null);
	
	useEffect(() => {
		lottie.loadAnimation({
			container: container.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: require('asset/lottie/3617-shopping-bag-error.json')
		})
	}, []);
	
	return (
		<div className={style.basket_lottie} ref={container}></div>
	);
};

export {Lottie};