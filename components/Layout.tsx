import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Layout = (props: any) => {
  const router = useRouter();

  return (
    <div className="layout">
      <Head>
        <title>Reach Industries</title>
        <link
          rel="icon"
          href="https://images.squarespace-cdn.com/content/v1/5da5d63bc3767433e9d17b8f/1571156645818-15NI62QOBNJQLFI82QV5/favicon.ico?format=100w"
        />
      </Head>
      <div className="flex flex-col">
        <div className="flex header fixed z-10 top-0 w-full">
          <img
            width={70}
            height={70}
            className="p-4"
            src="https://images.squarespace-cdn.com/content/v1/5da5d63bc3767433e9d17b8f/1571149443276-BDVW2RA2QMXQF3QMTIVA/ReachIndustries_Logo_09302016_white.png?format=1500w"
          ></img>
          <div className="flex flex-row justify-between w-full items-center mr-4">
            <h2 className="text-center font-thin text-3xl text-white">
              Reach Industries
            </h2>
            {router.pathname !== "/" && (
              <h5
                className="text-center font-thin text-sm text-white cursor-pointer hover:text-lg transition-all hover:font-light"
                onClick={() => {
                  router.push("/");
                }}
              >
                Change User
              </h5>
            )}
          </div>
        </div>
        {props.children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
