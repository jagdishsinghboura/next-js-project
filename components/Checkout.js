"use client"
import React, { useContext, useEffect, useState } from 'react';
import Layouts from './Layouts';
import { ProductsContext } from './ProductsContext';
import axios from 'axios';

export default function Checkout() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productInfos, setProductInfos] = useState([]);


  const [address, setAdress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const products = selectedProducts.join(',');

  useEffect(() => {
    const uniqueIds = [...new Set(selectedProducts)];
    if (uniqueIds.length > 0) {
      fetch(`/api/products/?ids=${uniqueIds.join(',')}`)
        .then((res) => res.json()).then((json) => setProductInfos(json))

    }
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts(prev => [...prev, id])
  }
  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts(prev => {
        return prev.filter((value, index) => index !== pos)
      })
    }
  }
  const deliveryPrice = 5;
  let subTotal = 0;
  if (selectedProducts?.length) {
    for (const id of selectedProducts) {
      const price = productInfos.find(p => p._id === id)
      if (price == undefined) {
        continue;
      }
      subTotal += price.price;


    }
  }
  const total = subTotal + deliveryPrice;
  return (
    <div>
      <Layouts>
        {productInfos.length === 0 && (
          <div>No products in your shopping cart</div>
        )}
        {productInfos.length > 0 && productInfos.map((productInfo) => (
          <div key={productInfo._id} className='flex mb-5 '>
            <div className='bg-gray-100 p-3 rounded-3 shrink-0 rounded-xl '>
              <img className="w-24 " src={productInfo.pictures.slice(0, 8) + "s" + productInfo.pictures.slice(8)} />
            </div>
            <div className='pl-4'>
              <h3 className='font bold text-lg'>{productInfo.name} </h3>
              <p className="text-sm leading-4 text-gray-500">{productInfo.description}</p>
              <div className='flex my-3'>
                <div className='grow'>${productInfo.price}</div>
                <div>
                  <button onClick={() => lessOfThisProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-lg text-emerlad-500">-</button>
                  <span className='px-2'></span>
                  {selectedProducts.filter(id => id === productInfo._id).length}
                  <button onClick={() => moreOfThisProduct(productInfo._id)} className=" bg-emerald-500 px-2 rounded-lg text-white">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='mt-4'>
          <input name='address' value={address} onChange={(e) => setAdress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type='text' placeholder='street adress , number' />
          <input name='city' value={city} onChange={(e) => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type='text' placeholder='city and postal , pincode' />
          <input name='name' value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type='text' placeholder='your name ' />
          <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type='text' placeholder='email address ' />
        </div>
        <div className='mt-4'>
          <div className='flex my-3'>
            <h3 className='grow font-bold text-gray-400'>SubsubTotal:</h3>
            <h3 className='font-bold'>${subTotal}</h3>
          </div>
          <div className='flex my-3'>
            <h3 className='grow font-bold text-gray-400'>Delivery</h3>
            <h3 className='font-bold'>${deliveryPrice}</h3>
          </div>
          <div className='flex my-3 border-t mt-3 border-dashed border-emerald-600'>
            <h3 className='grow font-bold text-gray-400'>subTotal</h3>
            <h3 className='font-bold'>${total}</h3>
          </div>
        </div>

        <input type="hidden" name="products" value={`${selectedProducts.join(',')}`} />
        <button onClick={async () => {
          await axios.post("http://localhost:3000/api/checkout", {
            name,
            email,
            address,
            city,
            products,
          })
        }} className='bg-emerald-500 px-5 rounded-xl py-3 font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg'>Pay {total}</button>
      </Layouts>
    </div>
  );
}
