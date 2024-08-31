"use client"
import React, { useState, useEffect } from 'react';
import InputBox from "@/components/InputBox";
import Product from "@/components/Product";
import axios from "axios";
import Footer from '@/components/Footer';
import Layouts from '@/components/Layouts';

async function getUser() {
  const data = await axios.get("http://localhost:3000/api").then((res) => res.data);
  return data;
}

export default function Home() {
  const [phrase, setPhrase] = useState("");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUser();
      setProductData(data);
    }
    fetchData();
  }, []);

  const categoriesNames = [...new Set(productData.map((p) => p.category))];
  let products = phrase
    ? productData.filter((p) => p.name.toLowerCase().includes(phrase.toLowerCase()))
    : productData;

  return (
    <Layouts>

    <div className="p-5">
      <InputBox phrase={phrase} setPhrase={setPhrase} />
      <div>
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            {products.find(p => p.category == categoryName) && (<div>
              <h2 className="text-2xl font-medium py-5 capitalize">{categoryName}</h2>
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                {products.filter((p) => p.category === categoryName).map((productInfo) => (
                  <div key={productInfo._id} className="px-5 snap-start">
                    <Product {...productInfo} />
                  </div>
                ))}
              </div>
            </div>)}

          </div>
        ))}
        <div className="py-4"></div>
      </div>
    </div>
          
    </Layouts>
  );
}
