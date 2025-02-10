import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
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
      console.log("Firebase Google Auth result:", result);
  
      const res = await fetch(`http://localhost:5500/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: result.user.displayName.split(" ")[0],
          lastName: result.user.displayName.split(" ")[1] || "Zyena",
          email: result.user.email.toLowerCase(), // Convert to lowercase
        }),
      });
  
      const data = await res.json();
      console.log("Google auth response from backend:", data);
  
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
  
        dispatch(loginUser({ token: data.token, user: data.user }));
  
        notifySuccess("Signed in Successfully!");
        navigate("/");
      } else {
        console.error("Google login failed:", data.message);
      }
    } catch (error) {
      console.log("Could not sign in with Google", error);
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
