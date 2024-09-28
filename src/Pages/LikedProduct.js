import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayNARCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";

const LikedProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context); // Assume liked products data comes from here
  const loadingProducts = new Array(context.likedProductCount).fill(null);

  const fetchLikedProducts = async () => {
    try {
      const response = await fetch(SummaryApi.viewLikedProduct.url, {
        method: SummaryApi.viewLikedProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching liked products:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchLikedProducts();
    setLoading(false);
  }, []);

  const deleteLikedProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteLikedProduct.url, {
        method: SummaryApi.deleteLikedProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchLikedProducts(); // Refresh liked products list
        context.fetchUserLikedProduct(); // Update the global context
      }
    } catch (error) {
      console.error('Error deleting liked product:', error);
    }
  };

  return (
    <div className="container mx-auto mt-14 lg:mt-0">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && <p className="bg-white py-5">No liked products</p>}
      </div>

      <div className="flex flex-col p-4 lg:flex-row gap-10 lg:justify-between">
        {/* View Liked Products */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingProducts.map((_, index) => (
              <div
                key={"LikedProductLoading" + index}
                className="w-full bg-slate-200 h-32 border border-slate-300 my-2 animate-pulse rounded"
              ></div>
            ))
          ) : (
            data.map((product, index) => (
              <div
                key={product?._id + "LikedProduct"}
                className="w-full bg-white h-32 border border-slate-300 my-2 rounded grid grid-cols-[128px,1fr]"
              >
                <div className="w-32 h-32 bg bg-slate-200">
                  <img
                    src={product?.productId?.productImage[0]}
                    className="w-full h-full object-scale-down mix-blend-multiply"
                    alt={product?.productId?.productName}
                  />
                </div>
                <div className="px-4 py-2 relative">
                  {/* Delete liked product */}
                  <div
                    className="absolute right-0 text-yellow-600 rounded-full p-2 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    onClick={() => deleteLikedProduct(product?._id)}
                  >
                    <MdDelete />
                  </div>
                  <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                    {product?.productId?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product?.productId?.category}</p>
                  <p className="text-black font-medium text-lg">
                    {displayNARCurrency(product?.productId?.sellingPrice)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {data[0] && (
          <div className="mt-4 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-yellow-100">
                <h2 className="text-white bg-yellow-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 font-medium text-lg text-slate-600 gap-2">
                  <p>Total Products Liked</p>
                  <p>{data.length}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedProducts;
