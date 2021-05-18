import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ViewPricesModal = ({
  show = false,
  product = {},
  onClose = () => {},
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        open={show}
        onClose={() => onClose()}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Viewing Prices For: <b>{product.name}</b>
                  </Dialog.Title>
                </div>
                <div className='hidden sm:block' aria-hidden='true'>
                  <div className='py-5'>
                    <div className='border-t border-gray-200' />
                  </div>
                </div>
                <div>
                  {/* Table */}
                  <div className='flex flex-col'>
                    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                      <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                        <div className='overflow-hidden'>
                          <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                              <tr>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Amount (GHS)
                                </th>
                                <th
                                  scope='col'
                                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                  Date
                                </th>
                              </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                              {product.prices &&
                                product.prices.length > 0 &&
                                product.prices.map((item, index) => (
                                  <tr key={index}>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                      <div className='text-sm text-gray-900'>
                                        {item.price}
                                      </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                      <div className='text-sm text-gray-900'>
                                        {new Date(item.date).toUTCString()}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                    <button
                      type='button'
                      className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                      onClick={() => onClose()}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ViewPricesModal;
