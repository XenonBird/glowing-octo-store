'use client';
import { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import InputField from '@/app/components/input-field';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

function EditProduct({ params }) {
  const productId = params.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const loadingToast = toast.loading('Loading');
      const res = await fetch(`/api/admin/${productId}`);
      const body = await res.json();
      const data = body.data;
      console.log(data);
      setProduct({
        name: data.name,
        brand: data.brand,
        imageUrl: data.imageUrl,
        description: data.description,
        priceMin: data.price.min,
        priceMax: data.price.max,
        priceNote: data.price.note,
        display: data.features.display,
        processor: data.features.processor,
        ram: data.features.ram,
        storage: data.features.storage,
        camera: data.features.camera,
        connectivity: data.features.connectivity,
      });
      toast.success('Now edit', { id: loadingToast });
    })();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleUpload = (result, widget) => {
    if (result.event !== 'success') {
      toast.error('Failed to upload, try again');
      return;
    }
    setProduct({ ...product, imageUrl: result.info.public_id });
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
      formData.append('imageUrl', product.imageUrl);

      // Send POST request with form data
      const res = await fetch('/api/admin/' + productId, {
        method: 'PUT',
        body: formData,
        credentials: 'same-origin',
      });

      if (res.ok) {
        toast.success('Product updated successfully', { id: toastId });
        const body = await res.json();
        console.log(body);
        setProduct({
          name: body.name,
          brand: body.brand,
          imageUrl: body.imageUrl,
          description: body.description,
          priceMin: body.price.min,
          priceMax: body.price.max,
          priceNote: body.price.note,
          display: body.features.display,
          processor: body.features.processor,
          ram: body.features.ram,
          storage: body.features.storage,
          camera: body.features.camera,
          connectivity: body.features.connectivity,
        });
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
          {product ? (
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
                <InputField
                  name="brand"
                  type="text"
                  value={product.brand}
                  changeHandler={handleChange}
                  label="Brand"
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
                          onClick={(e) => {
                            e.preventDefault();
                            open();
                          }}
                        >
                          Upload an Image
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                  {product.imageUrl && (
                    <CldImage
                      width="100"
                      height="100"
                      src={product.imageUrl}
                      className="border rounded-md my-2"
                      sizes="100vw"
                      alt="Description of my image"
                    />
                  )}
                </div>

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
                />
                <InputField
                  name="priceMax"
                  type="number"
                  value={product.priceMax}
                  changeHandler={handleChange}
                  label="Maximum Price"
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
              <div className="flex gap-6">
                <button
                  type="submit"
                  className="block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Update Product
                </button>
                <Link
                  href="/admin/dashboard"
                  className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Back
                </Link>
              </div>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default EditProduct;
