import React from "react";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { useFetchUser } from "@/hooks/useFetchUser";

const UserInfoContainer: React.FC = () => {
  // const { user, loading, error } = useFetchUser();

  // if (loading) {
  //   return <p className="text-center text-gray-600">Loading user information...</p>;
  // }

  // if (error) {
  //   return <p className="text-center text-red-600">Error: {error}</p>;
  // }

  // if (!user) {
  //   return <p className="text-center text-gray-600">No user information available.</p>;
  // }

  // const { first_name, last_name, email } = user;

  return (
    <div className="flex justify-center mt-10">
      {/* <ProfileCard email={email} firstName={first_name} lastName={last_name} /> */}
      <ProfileCard email={'djodsods@gmail.com'} firstName={"first_name"} lastName={"last_name"} />
      </div>
  );
};

export default UserInfoContainer;
