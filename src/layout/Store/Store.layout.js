import {StoreHeader} from "./components";

function StoreLayout({children}) {
   return (
      <>
         <StoreHeader />
         {children}
      </>
   );
}

export {StoreLayout};
