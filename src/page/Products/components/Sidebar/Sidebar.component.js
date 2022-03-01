import styles from "./Sidebar.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import * as React from "react";

const Sidebar = ({categories, changeCategory}) => {
	
	return (
		<Box className={styles.sidebar}>
			<List>
				{categories.map((categoryItem) => (
					<ListItem button key={categoryItem.id} onClick={() => changeCategory(categoryItem)}>
						<ListItemText primary={categoryItem.name} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export {Sidebar}