import { Outlet, useParams } from "react-router-dom"

const Test = () => {
    const { productId } = useParams();
  return (
    <div>{productId}
    <Outlet/>
    
    </div>
  )
}

export  {Test}