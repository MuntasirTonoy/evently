import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

import {
  TbEye,
  TbEyeOff,
  TbLink,
  TbLock,
  TbMail,
  TbUser,
} from "react-icons/tb";
import { toast } from "react-hot-toast";
import {
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { createUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo_url = form.photo_url.value;
    const password = form.password.value;

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Update user profile
        return updateProfile(user, {
          displayName: name,
          photoURL: photo_url || null, // Handle empty photo URL
        }).then(() => {
          return sendEmailVerification(user);
        });
      })
      .then(() => {
        setUserEmail(email);
        setShowModal(true);
        toast.success("Registration successful! Please verify your email.");
        form.reset();
      })
      .catch((error) => {
        console.error("Registration error:", error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered");
        } else {
          toast.error(`Registration failed: ${error.message}`);
        }
      });
  };
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100">
      <Helmet>
        <title>EventLy | Register </title>
      </Helmet>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg border border-gray-200 shadow-sm">
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
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="rounded-md space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbLink className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="photo_url"
                type="url"
                placeholder="Photo URL (optional)"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 characters)"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                minLength="6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <TbEyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                ) : (
                  <TbEye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
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
          Sign In with Google
        </button>
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Verify Your Email</h3>
              <p className="py-4">
                We've sent a verification email to <strong>{userEmail}</strong>.
                Please check your inbox and click the verification link.
              </p>
              <div className="modal-action flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost"
                >
                  Close
                </button>
                <div className="space-x-2">
                  <a
                    href={`https://mail.google.com/mail/?authuser=${userEmail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Open Gmail
                  </a>
                  <Link to="/login" className="btn">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
