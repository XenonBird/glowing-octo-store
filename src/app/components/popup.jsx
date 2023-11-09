'use client';

const Popup = ({ children, closer, openStatus }) => {
  return (
    <div
      className="z-[3] p-8 fixed left-0 top-0 w-full h-full bg-[#000000aa] flex justify-center items-start"
      style={{
        visibility: openStatus ? 'visible' : 'collapse',
      }}
    >
      <div className="mx-auto bg-white rounded-lg p-4 w-full max-w-md">
        <div className="mb-4 flex justify-end">
          <i
            onClick={() => closer(false)}
            className="fi fi-rr-cross text-xl gradient-text flex items-center p-3 border"
          ></i>
        </div>
        <div className="my-8">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
