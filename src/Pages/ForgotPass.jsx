import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
const ForgotPass = () => {
  const handleReset = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    console.log(email);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("password reset link sent to your mail");
        form.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="min-h-[600px] flex items-center justify-center px-4 py-12 bg-gray-50">
      <Helmet>
        <title>EventLy | Forgot Password</title>
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
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">
            Password Reset
          </h2>
        </div>
        <form onSubmit={handleReset} className="mt-8 space-y-6">
          <div className="rounded-md  space-y-4">
            <div>
              <label htmlFor="email " className="font-semibold ">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Send Verification Code
          </button>
          <Link
            to="/login"
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-200 hover:bg-gray-300"
          >
            Back to Log in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
