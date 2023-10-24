'use client';
import { useState } from 'react';

const CustomMenu = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className="h-[40px] aspect-square flex justify-center items-center gradient-bg rounded-md"
        onClick={handleToggle}
      >
        {open ? (
          <i class="fi fi-rr-cross text-xl text-white flex items-center"></i>
        ) : (
          <i className="fi fi-rr-bars-sort text-xl text-white flex items-center"></i>
        )}
      </div>

      <div
        className={`fixed w-[300px] h-full z-[2] top-0 right-0 transition bg-white border shadow-lg`}
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <MenuContent />
      </div>
    </>
  );
};

function MenuContent() {
  return (
    <>
      <p className="flex justify-center items-center w-36 h-36 m-4 mx-auto rounded-[50%] border shadow-lg gradient-bg">
        <i className="fi fi-rr-user text-5xl text-white"></i>
      </p>

      <div className="px-4 py-2">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <p className="text-gray-600">Web Developer</p>
      </div>

      <div className="px-4 py-2">
        <h3 className="text-lg font-semibold">About Me</h3>
        <p className="text-gray-600">
          I am a passionate web developer with a love for coding and creating
          web applications. I enjoy learning new technologies and improving my
          skills.
        </p>
      </div>

      <div className="px-4 py-2">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <ul className="text-gray-600">
          <ul className="text-gray-600">
            <li>
              Email:{' '}
              <a className="underline" href="mailto:john@example.com">
                john@example.com
              </a>
            </li>
            <li>
              Phone:{' '}
              <a className="underline" href="tel:+91 9933112244">
                (+91) 9933112244
              </a>
            </li>
            <li>
              WhatsApp:{' '}
              <a className="underline" href="https://wa.me/+919933112244">
                (+91) 9933112244
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </>
  );
}

export default CustomMenu;
