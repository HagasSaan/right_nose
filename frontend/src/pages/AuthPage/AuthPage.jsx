import "./AuthPage.scss";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCredential } from "../../slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function authenticateWithRedirect() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      dispatch(setCredential(JSON.stringify(credential)));
      navigate("../rooms");
    } catch (err) {
      console.error("Auth failed", err);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome to the Online IDE</h1>
        <p>Log in with your Google account to continue</p>
        <button className="google-btn" onClick={authenticateWithRedirect}>
          <FcGoogle className="icon" /> Sign in with Google
        </button>
      </div>
    </div>
  );
}

