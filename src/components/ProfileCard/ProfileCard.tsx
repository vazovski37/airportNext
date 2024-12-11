import React from "react";

type ProfileProps = {
  email: string;
  firstName: string;
  lastName: string;
};

const ProfileCard: React.FC<ProfileProps> = ({ email, firstName, lastName }) => {
  return (
    <div className="max-w-sm mx-auto p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-2">
        {firstName} {lastName}
      </h2>
      <p className="text-sm text-gray-600 mb-4">{email}</p>
    </div>
  );
};

export default ProfileCard;
