import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firbease";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../hooks/toastify";
import { loginUser } from "../store/auth-slice";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch(`http://localhost:5500/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: "include",
        body: JSON.stringify({
          firstName: result.user.displayName,
          lastName: result.user.displayName,
          email: result.user.email,
        }),
      });
      const data = await res.json();
      console.log("Google auth",data);
        dispatch(loginUser(data));
        notifySuccess("Signed in Successfully!")
        navigate('/');
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      variant="contained"
      className="!bg-black !text-white p-3  !normal-case !hover:opacity-95 !mt-2 w-full"
    >
      <img
        width="25"
        height="25"
        src="https://img.icons8.com/fluency/48/google-logo.png"
        alt="google-logo"
        className="mr-2"
      />
      Continue with google
    </Button>
  );
}
