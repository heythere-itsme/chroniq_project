import React from "react";

const RightSection = () => {
  return (
    <div className="w-100">
      <h2 className="font-medium pt-2 px-2">
        {new Date().toLocaleString("en-GB", { month: "short", day: "2-digit" })}
        , {new Date().getFullYear()}
      </h2>
    </div>
  );
};

export default RightSection;
