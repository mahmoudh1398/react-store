import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'config/routes.config';
import {PanelLayout} from 'layout';
import {DEFAULT_PROPS, PROP_TYPES} from './PrivateRoute.config';
import {IS_LOGGED_IN} from "config/variables.config";

const TargetPage = ({Component, hasLayout}) => {
	
	const isLoggedIn = localStorage.getItem(IS_LOGGED_IN) === 'true';

  if (!isLoggedIn) {
    return <Navigate replace to={PATHS.PANEL_LOGIN} />
  }
	
  return hasLayout ? (
	  <PanelLayout>
		  <Component />
	  </PanelLayout>
	  ) :
	  <Component />
}

function PrivateRoute ({component, hasLayout}){
	return (
		<TargetPage Component={component} hasLayout={hasLayout}/>
	);
}

PrivateRoute.defaultProps = DEFAULT_PROPS;
PrivateRoute.propTypes = PROP_TYPES;

export {PrivateRoute};
