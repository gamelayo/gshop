import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/features/authSlice";

const AdminOnly = ({ children }) => {
  const EMAIL = process.env.REACT_APP_ADMIN_USER;

  const userEmail = useSelector(selectEmail);
  if (userEmail === EMAIL) {
    return children;
  } else {
    return (
      <section style={{ height: "80vh" }}>
        <div className="container">
          <h2>Permission Denied.</h2>
          <p>This page can only be view by an Admin user</p>
          <br />
          <Link to="/">
            <button className="--btn">&larr; Back to Home</button>
          </Link>
        </div>
      </section>
    );
  }
};
export const AdminOnlyLink = ({ children }) => {
  const EMAIL = process.env.REACT_APP_ADMIN_USER;
  const userEmail = useSelector(selectEmail);
  if (userEmail === EMAIL) {
    return children;
  } else {
    return null;
  }
};

export default AdminOnly;
