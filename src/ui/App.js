import React from "react";
import { useLocalStore, action, actionOn } from "easy-peasy";
import swal from "sweetalert";
import { useEffect } from "react";
import superagent from "superagent";

import Nav from "./Nav";
import Products from "./Products";

// Alert box global schema
const NotificationSchema = {
  closeOnClickOutside: true,
  closeOnEsc: true,
  title: "Alert",
  icon: "info",
  text: "",
  button: false,
  timer: 3000,
};

const App = () => {
  /**
   * This manages the state and its corresponding actions,
   * - adding products
   * - removing products
   * - parsing initial mock products
   * - events attached to product actions
   */
  const [_state, _actions] = useLocalStore(() => ({
    products: [],
    setInitial: action((state, data) => {
      state.products = data.map((value) => ({
        ...value,
        isActive: true,
      }));
    }),
    add: action((state, product) => {
      let newProduct = {};

      newProduct.id = state.products.length - 1;
      newProduct.name = product.name;
      newProduct.prices = [
        ...product.prices.map((value, index) => ({
          date: Date.now(),
          price: value,
          id: index,
        })),
      ];

      state.products.push(newProduct);
    }),
    remove: action((state, id) => {
      const products = state.products;

      state.products = products.map((value, index) => {
        if (id === index) {
          return {
            ...value,
            isActive: false,
          };
        }

        return value;
      });
    }),
    activate: action((state, id) => {
      const products = state.products;

      state.products = products.map((value, index) => {
        if (id === index) {
          return {
            ...value,
            isActive: true,
          };
        }

        return value;
      });
    }),
    onAdd: actionOn(
      (actions) => actions.add,
      (state, target) => {
        swal({
          ...NotificationSchema,
          title: "Success",
          text: "Product added successfully",
          icon: "success",
        });
      }
    ),
    onRemove: actionOn(
      (actions) => actions.remove,
      (state, target) => {
        swal({
          ...NotificationSchema,
          title: "Removed",
          text: "Product removed successfully",
          icon: "error",
        });
      }
    ),
    onActivation: actionOn(
      (actions) => actions.activate,
      (state, target) => {
        swal({
          ...NotificationSchema,
          title: "Activated",
          text: "Product activated successfully",
          icon: "success",
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
      <Nav addProduct={(value) => _actions.add(value)} />
      <Products
        items={_state.products}
        onDelete={(id) => _actions.remove(id)}
        onActivation={(id) => _actions.activate(id)}
      />
    </>
  );
};

export default App;
