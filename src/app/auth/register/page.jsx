'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function RegisterScreen() {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast.loading('Processing');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        credentials: 'same-origin',
      });

      const payload = await response.json();
      console.log(payload.message);
      if (response.status === 201) {
        setRegistrationComplete(true);
        toast.success('Registration done', { id: toastId });
      } else {
        toast.error(payload.message, { id: toastId });
      }
    } catch (error) {
      toast.error('Registration failed', { id: toastId });
      console.log('🔴', error);
    }
  };

  return (
    <main className="w-full p-8">
      {registrationComplete ? (
        <div className="mx-auto max-w-sm bg-white p-8 rounded-lg border shadow-lg flex flex-col gap-6">
          <p className="block rounded-md py-3 px-6 text-center">
            🎉 Congratulations 🎉
          </p>
          <Link
            href="/tabs/home"
            className="block text-white gradient-bg rounded-md py-3 px-6 text-center"
          >
            Home
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-sm bg-white p-8 rounded-lg border shadow-lg">
          <div className="flex justify-center items-center overflow-hidden mb-8">
            <Image
              src="/logo.png"
              width={100}
              height={40}
              className="h-10 w-auto"
              alt="site-logo"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4 capitalize">Register</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg shadow-sm "
                placeholder="abcd@example.com"
                onChange={changeHandler}
                value={formData.email}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="number"
                className="block font-medium text-gray-700"
              >
                Mobile no.
              </label>
              <input
                type="number"
                id="number"
                name="number"
                className="w-full px-3 py-2 border rounded-lg shadow-sm "
                placeholder="abcd@example.com"
                onChange={changeHandler}
                value={formData.number}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded-lg shadow-sm "
                placeholder="Tony Stark"
                onChange={changeHandler}
                value={formData.name}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg shadow-sm "
                placeholder="************"
                onChange={changeHandler}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2 gradient-bg font-semibold text-white rounded-lg hover:bg-blue-600 "
            >
              Register
            </button>

            <Toaster />
          </form>
          <div className="text-sm">
            <div className="my-8 border-t relative">
              <p className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 border rounded-md">
                OR
              </p>
            </div>
            <p>
              Already have account?{' '}
              <Link
                className="underline gradient-text font-semibold"
                href="/auth/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default RegisterScreen;
