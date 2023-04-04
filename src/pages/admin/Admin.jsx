import React from "react";
import style from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar";
import Home from "../../components/admin/home/Home";
import Order from "../../components/admin/order/Order";
import ViewProduct from "../../components/admin/viewProduct/ViewProduct";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
const Admin = () => {
  return (
    <div className={style.admin}>
      <div className={style.navbar}>
        <Navbar />
      </div>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="orders" element={<Order />} />
        <Route path="view-product" element={<ViewProduct />} />
        <Route path="add-product/:id" element={<AddProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
