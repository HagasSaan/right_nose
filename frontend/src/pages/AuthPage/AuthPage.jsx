import "./AuthPage.scss";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { useDispatch } from "react-redux";
import { setCredential } from "../../slices/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function authenticateWithRedirect() {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    dispatch(setCredential(JSON.stringify(credential)));
    navigate("../rooms");
  }

  return (
    <>
      <button onClick={authenticateWithRedirect}>Sign In with Google</button>
    </>
  );
}
