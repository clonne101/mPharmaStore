import { useLocalStore, action, actionOn } from "easy-peasy";
import swal from "sweetalert";
import { useEffect } from "react";
import superagent from "superagent";
import _ from "lodash";
import { PlusIcon } from "@heroicons/react/outline";

const noty = {
  closeOnClickOutside: true,
  closeOnEsc: true,
  title: "Alert",
  icon: "info",
  text: "",
  button: false,
  timer: 3000,
};

const GetLatestPrice = (prices, returnLatest = false) => {
  const price = _.orderBy(prices, ["date"], ["desc"]);

  if (returnLatest) return price[0];

  return price;
};

const App = () => {
  const [_state, _actions] = useLocalStore(() => ({
    products: [],
    setInitial: action((state, data) => {
      state.products = data;
    }),
    add: action((state, product) => {
      state.products.push(product);
    }),
    remove: action((state, id = null) => {
      if (id) {
        state.products.splice(id, 1);
      } else {
        state.products = [];
      }
    }),
    onAdd: actionOn(
      (actions) => actions.add,
      (state, target) => {
        swal({
          ...noty,
          title: "Success",
          text: "Item added to product list",
          icon: "success",
        });
      }
    ),
    onRemove: actionOn(
      (actions) => actions.remove,
      (state, target) => {
        swal({
          ...noty,
          title: "Removed",
          text: "Item removed from product list",
          icon: "error",
        });
      }
    ),
  }));

  useEffect(() => {
    async function fetchData() {
      const res = await superagent.get(
        "http://www.mocky.io/v2/5c3e15e63500006e003e9795"
      );
      _actions.setInitial(res.body.products);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Render navigation */}
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
              onClick={() => _actions.add("hello")}
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
      {/* Render product table */}
      {_state.products.length === 0 ? (
        <div>Loading...</div>
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
                      <th scope='col' className='relative px-6 py-3'>
                        <span className='sr-only'>View Prices</span>
                      </th>
                      <th scope='col' className='relative px-6 py-3'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {_state.products.map((item) => {
                      const latestPrice = GetLatestPrice(item.prices, true);
                      return (
                        <tr key={item.id}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='text-sm font-medium text-gray-900'>
                                {item.name}
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-900'>
                              {latestPrice.price}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              View Prices
                            </a>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Edit
                            </a>
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
      ;
    </>
  );
};

export default App;
