'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      const response = await fetch('/api/profile-data', {
        method: 'GET',
        credentials: 'same-origin',
      });
      const body = await response.json();

      setLoading(false);

      if (response.status === 200) {
        setUser({ ...body.data });
        setLinks([...body.links]);
      }
    };
    getProfileData();
  }, []);

  if (loading) {
    return <p className="text-lg text-center">Loading...</p>;
  }

  if (user) {
    return (
      <Frame>
        <>
          <p className="flex justify-center items-center w-36 h-36 m-4 mx-auto rounded-[50%] border shadow-lg gradient-bg">
            <i className="fi fi-rr-user text-5xl text-white"></i>
          </p>

          <div className="mb-6">
            <p className="text-gray-700 text-3xl font-semibold">
              <span className="opacity-60">Hi</span> <span>{user.name}</span>
            </p>
          </div>

          {links.length > 0 && (
            <div className="my-4 w-full max-w-sm mx-auto grid grid-cols-2 gap-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  className="block text-white p-3 py-2 gradient-bg px-6 font-semibold rounded-xl"
                  href={link.url || ''}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}

          <table className="mx-auto text-left">
            <tbody>
              <tr>
                <td className="p-2">Name </td>
                <td className="p-2 font-semibold">{user.name}</td>
              </tr>
              <tr>
                <td className="p-2">Email </td>
                <td className="p-2 font-semibold">{user.email}</td>
              </tr>
              <tr>
                <td className="p-2">Mobile no</td>
                <td className="p-2 font-semibold"> {user.mobile}</td>
              </tr>
            </tbody>
          </table>
          <p className="pt-10">
            <Link
              className="mx-auto gradient-text p-3 py-2 gradient-border px-6 font-semibold rounded-xl"
              href="/auth/logout"
            >
              Logout
            </Link>
          </p>
        </>
      </Frame>
    );
  }

  return (
    <Frame>
      <>
        <p className="flex justify-center items-center w-36 h-36 m-4 mx-auto rounded-[50%] border shadow-lg gradient-bg">
          <i className="fi fi-rr-user text-5xl text-white"></i>
        </p>

        <p className="text-gray-700 text-lg">Please login</p>
        <p className="my-12 ">
          <Link
            className="mx-auto text-lg gradient-bg text-white py-2 px-6 font-semibold rounded-xl"
            href="/auth/login"
          >
            Login
          </Link>
        </p>
      </>
    </Frame>
  );
};

const Frame = ({ children }) => {
  return (
    <main className="p-4 grow overflow-y-scroll">
      <div className="max-w-md mx-auto overflow-hidden">
        <div className="text-center my-12">{children}</div>
      </div>
    </main>
  );
};

export default ProfilePage;
