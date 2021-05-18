import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import NewProductModal from "./extensions/NewProductModal";

const Nav = ({ addProduct = () => {} }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <a href='/'>
              <span className='sr-only'>Workflow</span>
              <img
                className='h-8 w-auto sm:h-10'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt=''
              />
            </a>
          </div>
          <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
            <button
              onClick={() => setShowModal(true)}
              className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
            >
              <span className='flex items-center justify-center text-white'>
                Add New Product
              </span>
              <PlusIcon className={"h-6 w-6"} />
            </button>
          </div>
        </div>
      </div>
      {/* New product modal */}
      <NewProductModal
        show={showModal}
        onSave={(data) => addProduct(data)}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Nav;
