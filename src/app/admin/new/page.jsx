'use client';
import { useState } from 'react';
import Header from '@/app/components/header';
import InputField from '@/app/components/input-field';

function NewProduct() {
  const initialProductState = {
    name: '',
    brand: '',
    imageUrl: '/products/samsung-s22-ultra.jpg',
    description: '',
    price: {
      min: 0,
      max: 0,
      note: '',
    },
    features: {
      display: '',
      processor: '',
      ram: '',
      storage: '',
      camera: '',
      connectivity: '',
    },
  };

  const [product, setProduct] = useState(initialProductState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Create a deep copy of the current state
    const updatedProduct = { ...product };

    // Split the name attribute into nested object keys
    const keys = name.split('.');
    const lastKey = keys.pop();

    // Traverse the copy to the correct nested level
    let currentObject = updatedProduct;
    keys.forEach((key) => {
      currentObject[key] = { ...currentObject[key] };
      currentObject = currentObject[key];
    });

    // Update the value at the deepest level
    currentObject[lastKey] = value;

    // Set the updated product state
    setProduct(updatedProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log('Product added successfully', res);
      } else {
        console.error('Failed to add the product', res);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // setProduct(initialProductState);
  };

  return (
    <div className="bg-white">
      <Header fullHeader={false} />
      {/* <pre>{JSON.stringify(final, null, 4)}</pre> */}
      <hr className="my-4" />
      <main className="w-full overflow-y-scroll">
        <div className="max-w-6xl mx-auto p-4">
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
              readonly={true}
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
                Add Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default NewProduct;
