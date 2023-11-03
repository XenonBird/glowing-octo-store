'use client';
import { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import InputField from '@/app/components/input-field';

function EditProduct({ params }) {
  const productId = params.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/${productId}`);
      const body = await res.json();
      console.log(body.data);
      setProduct(body.data);
    })();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...product };

    const keys = name.split('.');
    const lastKey = keys.pop();

    // Traverse the copy to the correct nested level
    let currentObject = updatedProduct;
    keys.forEach((key) => {
      currentObject[key] = { ...currentObject[key] };
      currentObject = currentObject[key];
    });

    currentObject[lastKey] = value;
    setProduct(updatedProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log('Product updated successfully', res);
      } else {
        console.error('Failed to update the product', res);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white">
      <Header fullHeader={false} />
      <hr className="my-4" />
      <main className="w-full overflow-y-scroll">
        <div className="max-w-6xl mx-auto p-4">
          {product ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                name="name"
                type="text"
                value={product.name}
                changeHandler={handleChange}
                label="Product Name"
                required={true}
              />
              <InputField
                name="brand"
                type="text"
                value={product.brand}
                changeHandler={handleChange}
                label="Brand"
                required={true}
              />
              <InputField
                name="imageUrl"
                type="text"
                value={product.imageUrl}
                changeHandler={handleChange}
                label="Image URL"
              />
              <InputField
                name="description"
                type="text"
                value={product.description}
                changeHandler={handleChange}
                label="Description"
              />
              <InputField
                name="price.min"
                type="number"
                value={product.price.min}
                changeHandler={handleChange}
                label="Minimum Price"
              />
              <InputField
                name="price.max"
                type="number"
                value={product.price.max}
                changeHandler={handleChange}
                label="Maximum Price"
              />
              <InputField
                name="price.note"
                type="text"
                value={product.price.note}
                changeHandler={handleChange}
                label="Price Note"
              />
              <InputField
                name="features.display"
                type="text"
                value={product.features.display}
                changeHandler={handleChange}
                label="Display"
              />
              <InputField
                name="features.processor"
                type="text"
                value={product.features.processor}
                changeHandler={handleChange}
                label="Processor"
              />
              <InputField
                name="features.ram"
                type="text"
                value={product.features.ram}
                changeHandler={handleChange}
                label="RAM"
              />
              <InputField
                name="features.storage"
                type="text"
                value={product.features.storage}
                changeHandler={handleChange}
                label="Storage"
              />
              <InputField
                name="features.camera"
                type="text"
                value={product.features.camera}
                changeHandler={handleChange}
                label="Camera"
              />
              <InputField
                name="features.connectivity"
                type="text"
                value={product.features.connectivity}
                changeHandler={handleChange}
                label="Connectivity"
              />
              <div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Update Product
                </button>
              </div>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default EditProduct;
