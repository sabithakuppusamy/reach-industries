import React from "react";
import Image from "next/image";

const NoData = () => {
  return (
    <div className="login-card rounded-sm shadow-md shadow-black">
      <div className="p-4">
        <Image width={400} height={300} src={"/NoData.png"}></Image>
        <p className="text-2xl text-center font-mono text-white mb-4">
          Oops! No records found
        </p>
      </div>
    </div>
  );
};

export default NoData;
