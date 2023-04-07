import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import { db } from "../../firebase/Config";
import { selectEmail, selectUSerID } from "../../redux/features/authSlice";
import {
  CALCULATE_SUBTOTAL,
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/cartSlice";
import { selectShippingAddress } from "../../redux/features/checkSlice";
import styles from "./Checkout.module.scss";

const Checkout = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  // const [state, setState] = useState("");
  // const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
  }, [dispatch]);
  const publicKey = process.env.REACT_APP_PAYSTACK_PK;
  let num1 = useSelector(selectCartTotalAmount);
  let num2 = "00";
  const amount = Number(num1.toString() + num2);

  const userId = useSelector(selectUSerID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  console.log(shippingAddress);
  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userId,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: num1,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order Save");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const componentProps = {
    email: email,
    amount: amount,
    metadata: {
      name: name,
      phone: phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => saveOrder(),
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div className="container">
      <Card cardClass={styles.card}>
        <div className={styles.checkout}>
          <h3>Billing Address</h3>
          <form>
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* <label>Address</label>
            <input
              type="text"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>City</label>
            <input
              type="text"
              id="city"
              onChange={(e) => setCity(e.target.value)}
            />
            <label>State</label>
            <input
              type="text"
              id="state"
              onChange={(e) => setState(e.target.value)}
            /> */}
          </form>
          <PaystackButton
            {...componentProps}
            style={{ width: "100%" }}
            className="--btn --btn-primary"
          />
        </div>
      </Card>
    </div>
  );
};

export default Checkout;
