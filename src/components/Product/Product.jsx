import { useParams } from "react-router-dom"
import { getProductById } from "../../mock/asyncMock";
import { useEffect, useState } from "react";
import "./Product.css"


export default function Product(){

    const {productId} = useParams();
    const [product, setProduct] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        getProductById(parseInt(productId))
        .then((data) => setProduct(data))
        .finally(() => setCargando(false));
}, [productId]);

if (cargando) return <h1>Cargando...</h1>

return(
    <div className="card-single-product">
        <div className="img-single-product">
            <img className="img-single-product-single" src={product.ubicacionImagen} alt={product.nombre} />
        </div>
        <div className="description-single-product">
            <div className="title-single-product">
                <h2>{product.nombre}</h2>
            </div>
            <div className="price-single-product">
                <h3>${product.precio}</h3>
                <h4>Stock:{product.stock}</h4>
            </div>
        </div>
    </div>
)

}