import { useRouter } from "next/router";
import React, { useState } from "react";

export const HomeContent = () => {
  const [userId, setUserId] = useState("");
  const [orgId, setOrgId] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col h-[100vh] justify-center align-middle">
      <div className="form-container">
        <p className="text-2xl font-thin text-white mb-4">
          {" "}
          Hello, Welcome back!
        </p>
        <div className="google-input">
          <input
            type="text"
            id="template-input"
            name="userId"
            onChange={(e: any) => {
              setUserId(e.target.value);
            }}
            placeholder=""
          />
          <label htmlFor="template-input">User ID</label>
        </div>
        <div className="google-input">
          <input
            type="text"
            id="template-input"
            name="orgId"
            onChange={(e: any) => {
              setOrgId(e.target.value);
            }}
            placeholder=""
          />
          <label htmlFor="template-input">Organization ID</label>
        </div>
        <div className="form-footer">
          <input
            type="submit"
            value="Login"
            className="success"
            disabled={!userId.length || !orgId.length}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/deviceList?userId=${userId}&&orgId=${orgId}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
