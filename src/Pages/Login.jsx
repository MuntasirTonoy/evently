import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signIn, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          setUser(user);
          toast.success("login done"); // ✅ Only now, because verified
          navigate(`${location?.state ? location.state : "/"}`);
        } else {
          toast.error("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName || "Anonymous";
      const photoURL = user.photoURL || "";

      // Optional: ensure profile is updated
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Logged in with Google!");
      setUser(user);
      console.log(user);

      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center px-4 py-12 bg-gray-50">
      <Helmet>
        <title>EventLy | Login</title>
      </Helmet>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center mb-4">
            <img
              className="h-12 w-auto"
              src="https://i.ibb.co.com/vxyvV9Mh/logo.png"
              alt="Evently Logo"
            />
            <h1 className="text-3xl font-bold text-indigo-600">Evently</h1>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Please Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
        {/* Login form    */}
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md  space-y-4">
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="tonoy947@gmail.com"
              />
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                defaultValue="123456"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <TbEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <TbEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <Link
              to="/forgot-password"
              className="cursor-pointer hover:underline text-red-600 text-sm "
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <div className="divider  ">or</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center gap-1 py-2 px-4 border-1 border-gray-400/50 rounded-md text-sm font-medium text-gray-800 bg-white  hover:bg-gray-100"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
