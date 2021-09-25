import { actLogoutUser } from "containers/shared/Auth/Login/module/action";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.authUserReducer);
  const handleLogout = () => {
    dispatch(actLogoutUser());
    history.push("/");
  };
  return (
    <div>
      {currentUser ? (
        <div>
          <button onClick={handleLogout} className="btn btn-danger">
            LOG OUT
          </button>
          <Link to="/admin">
            <button className="btn btn-dark">ADMIN PAGE</button>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <button className="btn btn-success">LOG IN</button>
        </Link>
      )}
    </div>
  );
}
