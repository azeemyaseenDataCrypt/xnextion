import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  productsState,
  deleteProduct,
} from "../../app/products/productSlice";

const ProductsListing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts());
  }, [dispatch]);

  const { data } = useSelector(productsState);

  const handlePreview = (productId: number) => {
    console.log(`Preview product with id ${productId}`);
  };

  const handleEdit = (productId: number) => {
    console.log(`Edit product with id ${productId}`);
  };

  const handleDelete = (productId: any) => {
    // @ts-ignore
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl text-white">Products</h2>
      <div className="mt-6 space-y-10">
        {data?.products?.map((item: any) => (
          <div
            key={item.id}
            className="group relative flex items-center justify-between border border-gray-500 p-4 rounded-lg"
          >
            <div className="flex items-start gap-10">
              <div className="w-32 h-32 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div>
                <h3 className="text-sm text-gray-200">
                  <p className="text-2xl">{item.title}</p>
                </h3>
                <p className="text-lg mt-2 font-medium text-gray-200">
                  {item.price}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button" disabled
                className="focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:focus:ring-green-800 disabled:bg-green-900 cursor-not-allowed"
                onClick={() => handlePreview(item.id)}
              >
                Preview
              </button>
              <button disabled
                type="button"
                className="text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-900  cursor-not-allowed"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsListing;
