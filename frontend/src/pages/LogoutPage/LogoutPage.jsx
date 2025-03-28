import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { setCredential } from "../../slices/AuthSlice";
import { auth } from "../../Constants";
import "./LogoutPage.scss";

export default function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const credential = useSelector((state) => state.auth.credential);

  useEffect(() => {
    async function handleLogout() {
      if (!credential) {
        navigate("/");
        return;
      }

      try {
        await signOut(auth);
        dispatch(setCredential(null));
        navigate("/");
      } catch (error) {
        console.error("Error signing out:", error);
        navigate("/");
      }
    }

    handleLogout();
  }, [navigate, dispatch, credential]);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h1>Logging out...</h1>
        <p>Please wait while we sign you out.</p>
      </div>
    </div>
  );
} 