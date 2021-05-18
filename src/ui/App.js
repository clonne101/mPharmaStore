import React from "react";
import { useLocalStore, action, actionOn } from "easy-peasy";
import swal from "sweetalert";
import { useEffect } from "react";
import superagent from "superagent";

import Nav from "./Nav";
import Products from "./Products";

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
    products: [],
    setInitial: action((state, data) => {
      state.products = data;
    }),
    add: action((state, product) => {
      console.log(product);
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
          text: "Product added successfully",
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
          text: "Product removed successfully",
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
      <Nav addProduct={(value) => _actions.add(value)} />
      <Products products={_state.products} />
    </>
  );
};

export default App;
