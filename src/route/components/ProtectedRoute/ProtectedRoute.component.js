import {Navigate} from 'react-router-dom';
import {PATHS} from 'config/routes.config';
import {PanelLayout} from 'layout';
import {DEFAULT_PROPS, PROP_TYPES} from './ProtectedRoute.config';

const TargetPage = ({Component, hasLayout}) => {
	
	const isLoggedIn = localStorage.getItem('IS_LOGGED_IN') === 'true';

  if (isLoggedIn) {
    return <Navigate replace to={PATHS.HOME} />
  }
	
	return hasLayout ? (
			<PanelLayout>
				<Component />
			</PanelLayout>
		) :
		<Component />
}

function ProtectedRoute({component, hasLayout}){
	return (
		<TargetPage Component={component} hasLayout={hasLayout}/>
	);
}

ProtectedRoute.defaultProps = DEFAULT_PROPS;
ProtectedRoute.propTypes = PROP_TYPES;

export {ProtectedRoute};
