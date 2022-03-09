import { toast } from 'react-toastify';

toast.configure();


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

export {notify};