import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="my-24">
      <Helmet>
        <title>EventLy | Profile</title>
      </Helmet>
      <div className="px-2 py-4 my-5 flex flex-col justify-center items-center text-center">
        <img
          className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 text-indigo-600 h-48 w-48"
          src={user?.photoURL}
          alt="user profile picture"
        />
        <h1 className="text-2xl text-gray-500 font-bold mt-2">
          {user?.displayName}
        </h1>
        <h2 className="text-base md:text-xl text-gray-500 font-bold">
          Email : {user?.email}
        </h2>
      </div>
    </div>
  );
};

export default Profile;
