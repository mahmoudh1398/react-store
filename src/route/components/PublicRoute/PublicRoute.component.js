import {Component} from 'react';
import {StoreLayout} from 'layout';
import {DEFAULT_PROPS, PROP_TYPES} from './PublicRoute.config';

const TargetPage = ({Component, hasLayout}) => {
   return hasLayout ? (
         <StoreLayout>
            <Component />
         </StoreLayout>
      ) :
      <Component />
}

function PublicRoute({component, hasLayout}) {
   return (
      <TargetPage Component={component} hasLayout={hasLayout}/>
   );
}

PublicRoute.defaultProps = DEFAULT_PROPS;
PublicRoute.propTypes = PROP_TYPES;

export {PublicRoute};
