'use client';
import { useState } from 'react';
import Header from '@/app/components/header';
import InputField from '@/app/components/input-field';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

const initialProductState = {
  name: '',
  brand: '',
  imageUrl: '/products/samsung-s22-ultra.jpg',
  description: '',
  priceMin: 0,
  priceMax: 0,
  priceNote: '',
  display: '',
  processor: '',
  ram: '',
  storage: '',
  camera: '',
  connectivity: '',
};
function NewProduct() {
  const [product, setProduct] = useState(initialProductState);
  const [publicId, setPublicId] = useState(undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleUpload = (result, widget) => {
    if (result.event !== 'success') {
      toast.error('Failed to upload, try again');
      return;
    }
    setPublicId(result.info.public_id);
    console.log(result.info.public_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const toastId = toast.loading('Please wait...');

      // Create form data
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('brand', product.brand);
      formData.append('description', product.description);
      formData.append('priceMin', product.priceMin);
      formData.append('priceMax', product.priceMax);
      formData.append('priceNote', product.priceNote);
      formData.append('display', product.display);
      formData.append('processor', product.processor);
      formData.append('ram', product.ram);
      formData.append('storage', product.storage);
      formData.append('camera', product.camera);
      formData.append('connectivity', product.connectivity);
      formData.append('imageUrl', publicId);
      if (!publicId) {
        toast.error('image is not selected', { id: toastId });
        return;
      }

      // Send POST request with form data
      const res = await fetch('/api/admin/new', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      });

      if (res.ok) {
        toast.success('Product added successfully', { id: toastId });
        setProduct(initialProductState);
        setImage(null);
      } else {
        const body = await res.json();
        toast.error(`Failed: ${body.message}`, { id: toastId });
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <InputField
                name="name"
                type="text"
                value={product.name}
                changeHandler={handleChange}
                label="Product Name"
                required={true}
              />

              {/* Input field for uploading an image */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <CldUploadWidget
                  uploadPreset="drglfiw8"
                  onUpload={handleUpload}
                >
                  {({ open }) => {
                    return (
                      <button
                        className="px-3 py-1 rounded-md gradient-bg text-white"
                        onClick={() => open()}
                      >
                        Upload an Image
                      </button>
                    );
                  }}
                </CldUploadWidget>
                {publicId && (
                  <CldImage
                    width="100"
                    height="100"
                    src={publicId}
                    className="border rounded-md my-2"
                    sizes="100vw"
                    alt="Description of my image"
                  />
                )}
              </div>

              <InputField
                name="brand"
                type="text"
                value={product.brand}
                changeHandler={handleChange}
                label="Brand"
                required={true}
              />
              <InputField
                name="description"
                type="text"
                value={product.description}
                changeHandler={handleChange}
                label="Description"
              />
              <InputField
                name="priceMin"
                type="number"
                value={product.priceMin}
                changeHandler={handleChange}
                label="Minimum Price"
                required={true}
              />
              <InputField
                name="priceMax"
                type="number"
                value={product.priceMax}
                changeHandler={handleChange}
                label="Maximum Price"
                required={true}
              />
              <InputField
                name="priceNote"
                type="text"
                value={product.priceNote}
                changeHandler={handleChange}
                label="Price Note"
              />
              <InputField
                name="display"
                type="text"
                value={product.display}
                changeHandler={handleChange}
                label="Display"
              />
              <InputField
                name="processor"
                type="text"
                value={product.processor}
                changeHandler={handleChange}
                label="Processor"
              />
              <InputField
                name="ram"
                type="text"
                value={product.ram}
                changeHandler={handleChange}
                label="RAM"
              />
              <InputField
                name="storage"
                type="text"
                value={product.storage}
                changeHandler={handleChange}
                label="Storage"
              />
              <InputField
                name="camera"
                type="text"
                value={product.camera}
                changeHandler={handleChange}
                label="Camera"
              />
              <InputField
                name="connectivity"
                type="text"
                value={product.connectivity}
                changeHandler={handleChange}
                label="Connectivity"
              />
            </div>
            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Add Product
              </button>
              <Link
                href="/admin/dashboard"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
        <Toaster />
      </main>
    </div>
  );
}

export default NewProduct;
