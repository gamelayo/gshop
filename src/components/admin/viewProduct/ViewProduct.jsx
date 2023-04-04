import { useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/Config";
import { toast } from "react-toastify";
import styles from "./ViewProduct.module.scss";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/features/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const ViewProduct = () => {
  const { data, isLoading } = useFetchCollection("product");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  // useEffect(() => {
  //   getProducts();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const getProducts = () => {
  //   setIsLOading(true);
  //   try {
  //     const productRef = collection(db, "product");

  //     const q = query(productRef, orderBy("createdAt", "desc"));

  //     // const q = query(collection(db, "cities"), where("state", "==", "CA"));
  //     onSnapshot(q, (snapshot) => {
  //       // console.log(snapshot.docs);
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(allProducts);
  //       setProducts(allProducts);
  //       setIsLOading(false);
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLOading(false);
  //     toast.error(error.message);
  //   }
  // };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "product", id));

      const storageRef = ref(storage, imageURL);

      await deleteObject(storageRef);

      toast.success("product delete successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Product</h2>
        {products.length === 0 ? (
          <p>No Product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>
                      <span>&#8358;</span>
                      {`${price}`}
                    </td>
                    {/* <td>{category}</td> */}
                    <td className={styles.icon}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        style={{ cursor: "pointer" }}
                        onClick={() => confirmDelete(id, imageURL)}
                        size={18}
                        color="red"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProduct;
