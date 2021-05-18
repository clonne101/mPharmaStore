import React from "react";
import * as Yup from "yup";

const ProductSchema = () => {
  return Yup.object().shape({
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
};

export default ProductSchema;
