import { useLocalStore, action, actionOn } from "easy-peasy";
import swal from "sweetalert";
import { ShoppingCartIcon } from "@heroicons/react/outline";

const noty = {
  closeOnClickOutside: true,
  closeOnEsc: true,
  title: "Alert",
  icon: "info",
  text: "",
  button: false,
  timer: 3000,
};

const App = () => {
  const [_state, _actions] = useLocalStore(() => ({
    items: [],
    add: action((state, obj) => {
      state.items.push(obj);
    }),
    remove: action((state, id = null) => {
      if (id) {
        state.items.splice(id, 1);
      } else {
        state.items = [];
      }
    }),
    onAddToCart: actionOn(
      (actions) => actions.add,
      (state, target) => {
        swal({
          ...noty,
          title: "Success",
          text: "Item added to cart",
          icon: "success",
        });
      }
    ),
    onRemoveFromCart: actionOn(
      (actions) => actions.remove,
      (state, target) => {
        swal({
          ...noty,
          title: "Removed",
          text: "Item removed from cart",
          icon: "error",
        });
      }
    ),
  }));

  // return (
  //   <div className='p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4'>
  //     <div className='flex-shrink-0'>
  //       <img className='h-12 w-12' src={logo} alt='ChitChat Logo' />
  //     </div>
  //     <div>
  //       <div className='text-xl font-medium text-black'>ChitChat</div>
  //       <p className='text-gray-500'>{_state.items.length}</p>
  //       <button onClick={() => _actions.add("hello")}>add to cart</button>
  //       <br />
  //       {_state.items.length > 0 && (
  //         <button onClick={() => _actions.remove()}>remove from cart</button>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6'>
      <div className='flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <a href='#'>
            <span className='sr-only'>Workflow</span>
            <img
              className='h-8 w-auto sm:h-10'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt=''
            />
          </a>
        </div>
        <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
          <button className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
            <ShoppingCartIcon className={"h-6 w-6"} />{" "}
            <span className='rounded-full h-5 w-5 flex items-center justify-center bg-white text-black'>
              {_state.items.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
