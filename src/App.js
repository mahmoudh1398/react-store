import {AppRoute} from 'route/App.route';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
   key: 'muirtl',
   stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
   return <CacheProvider value={cacheRtl}><AppRoute /></CacheProvider>;
}

// function App() {
//   return (
//     <>
//       <AppRoute />
//     </>
//   );
// }

export {RTL};
