import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { MinusIcon } from "@heroicons/react/outline";

const NewProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name cannot be empty"),
  prices: Yup.array()
    .min(1, "At least one price should be set")
    .of(
      Yup.number("Price should only be a number").required(
        "Price cannot be empty"
      )
    )
    .required("Pricing cannot be empty"),
});

const NewProductModal = ({
  show = false,
  onSave = () => {},
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
                    Add New Product
                  </Dialog.Title>
                </div>
                <div className='hidden sm:block' aria-hidden='true'>
                  <div className='py-5'>
                    <div className='border-t border-gray-200' />
                  </div>
                </div>
                <div>
                  <Formik
                    initialValues={{
                      name: "",
                      prices: [],
                    }}
                    validationSchema={NewProductSchema}
                    onSubmit={(values, actions) => {
                      onSave(values);
                      actions.setSubmitting(false);
                      actions.resetForm();
                      onClose();
                    }}
                  >
                    {({ values }) => (
                      <Form>
                        <div className='px-4 py-5 bg-white sm:p-6'>
                          <div className='grid grid-cols-6 gap-6'>
                            <div className='col-span-6'>
                              <label
                                htmlFor='name'
                                className='block text-sm font-medium text-gray-700'
                              >
                                Product Name:
                              </label>
                              <Field
                                id='name'
                                type='text'
                                name='name'
                                placeholder='Product XYZ...'
                                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                              />
                              <ErrorMessage
                                name='name'
                                render={(msg) => (
                                  <div className={"text-red-500 text-sm"}>
                                    {msg}
                                  </div>
                                )}
                              />
                            </div>

                            <div className='col-span-6'>
                              <label
                                htmlFor='name'
                                className='block text-sm font-medium text-gray-700'
                              >
                                Prices:
                              </label>
                              <FieldArray
                                name='prices'
                                render={(arrayHelpers) => (
                                  <>
                                    {values.prices &&
                                      values.prices.length > 0 &&
                                      values.prices.map((price, index) => (
                                        <div
                                          key={index}
                                          className='grid grid-flow-col grid-cols-2 grid-rows-1 gap-1'
                                        >
                                          <div className='col-span-2'>
                                            <Field
                                              type='number'
                                              name={`prices.${index}`}
                                              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                            />
                                            <ErrorMessage
                                              name={`prices.${index}`}
                                              render={(msg) => (
                                                <div
                                                  className={
                                                    "text-red-500 text-sm"
                                                  }
                                                >
                                                  {msg}
                                                </div>
                                              )}
                                            />
                                          </div>

                                          <div>
                                            <button
                                              type='button'
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                              className='inline-flex items-left px-4 py-2 text-red-700 hover:text-red-500 focus:outline-none text-sm'
                                            >
                                              <MinusIcon
                                                className={"w-6 h-6 text-sm"}
                                              />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    <button
                                      type='button'
                                      onClick={() => arrayHelpers.push("")}
                                      className='inline-flex items-left px-4 py-2 text-blue-700 hover:text-blue-500 focus:outline-none'
                                    >
                                      <span className='flex items-center text-sm'>
                                        + Add new price
                                      </span>
                                    </button>
                                  </>
                                )}
                              />
                              <ErrorMessage
                                name='prices'
                                render={(msg) => (
                                  <div className={"text-red-500 text-sm"}>
                                    {msg}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                          <button
                            type='submit'
                            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'
                          >
                            Save
                          </button>
                          <button
                            type='button'
                            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={() => onClose()}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewProductModal;
