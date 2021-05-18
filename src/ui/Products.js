import React from "react";
import _ from "lodash";

const GetLatestPrice = (prices, returnLatest = false) => {
  const price = _.orderBy(prices, ["date"], ["desc"]);
  if (returnLatest) return price[0];
  return price;
};

const Products = ({
  items = [],
  onDelete = () => {},
  onActivation = () => {},
}) => {
  return (
    <div className='container mx-auto mt-10 px-4'>
      {items.length === 0 ? (
        <div className='font-medium text-gray-500 text-center'>Loading...</div>
      ) : (
        <div className='flex flex-col'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Price (GHS)
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Price History
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {items.map((item, index) => {
                      const latestPrice = GetLatestPrice(item.prices, true);
                      return (
                        <tr key={index}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='text-sm font-medium text-gray-900'>
                                {item.name}
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-900'>
                              {latestPrice.price.toFixed(2)}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {item.isActive ? (
                              <div className='text-green-500'>Active</div>
                            ) : (
                              <div className='text-red-500'>Deleted</div>
                            )}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <button className='text-indigo-600 hover:text-indigo-900'>
                              View Prices
                            </button>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {item.isActive ? (
                              <button
                                onClick={() => onDelete(index)}
                                className='text-red-600 hover:text-red-900'
                              >
                                Delete
                              </button>
                            ) : (
                              <button
                                onClick={() => onActivation(index)}
                                className='text-green-600 hover:text-green-900'
                              >
                                Activate
                              </button>
                            )}
                            {" | "}
                            <button className='text-indigo-600 hover:text-indigo-900'>
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
