import {PanelHeader} from "./components";

function PanelLayout(props) {
	return (
		<>
			<PanelHeader />
			{props.children}
		</>
	);
}

export {PanelLayout};
