import React, { useContext } from 'react'
import { ProductsContext } from './ProductsContext';

export default function Product({_id, name, pictures, description, price }) {
    const picture = pictures.slice(0, 8) + "s" + pictures.slice(8);
    const {setSelectedProducts} =useContext(ProductsContext)

    function addProduct(){
        setSelectedProducts(prev=>[...prev,_id])

    }
    return (

        <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
                <img src={picture} alt="iamge" />
            </div>
            <div className="mt-2">
                <h3 className="font-bold text-lg">{name}</h3>
            </div>
            <p className="text-sm mt-1 leading-5 ">{description}</p>
            <div className="flex mt-1">
                <div className="text-2xl font-bold grow">${price}</div>
                <button onClick={addProduct} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
            </div>
        </div>

    )
}
