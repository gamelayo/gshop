import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { db } from "../../firebase/Config";
import { selectUSerID, selectUserName } from "../../redux/features/authSlice";
import { selectProducts } from "../../redux/features/productSlice";
import Card from "../card/Card";
import styles from "./ReviewProducts.module.scss";
import SpinnerImg from "../../assets/spinner.jpg";
const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { document } = useFetchDocument("product", id);

  const userId = useSelector(selectUSerID);
  const userName = useSelector(selectUserName);
  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userId,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);

      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {product === null ? (
          <img src={SpinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product name: </b>
              {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;