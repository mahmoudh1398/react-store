import {AppRoute} from 'route/App.route';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material/styles";

// Create rtl cache
const cacheRtl = createCache({
   key: 'muirtl',
   stylisPlugins: [prefixer, rtlPlugin],
});

let theme = createTheme({
   typography: {
      fontFamily: 'iransans',
   },
   direction: 'rtl'
});
theme = responsiveFontSizes(theme);

function App() {
   return (
      <ThemeProvider theme={theme}>
         <CacheProvider value={cacheRtl}>
            <AppRoute />
         </CacheProvider>
      </ThemeProvider>
   );
}

export {App};
