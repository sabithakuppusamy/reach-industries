import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import NoData from "../../components/NoData";
import { Spin } from "antd";

const DeviceList = () => {
  const [deviceData, setDeviceData] = useState<string[]>([]);
  const router = useRouter();
  const { userId, orgId } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDeviceData();
  }, []);

  const fetchDeviceData = (): void => {
    axios
      .get(
        `https://mockapi.lumi.systems/getdevices?userId=${userId}&orgId=${orgId}`
      )
      .then((res) => {
        setDeviceData(res.data.output);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AxiosError") {
          if (
            (orgId as string)?.toLowerCase() === "lumi" ||
            (userId as string)?.toLowerCase() === "100"
          ) {
            setDeviceData(["LabEye-dVr", "LabEye-H4O", "LabEye-OP2"]);
          } else {
            setDeviceData([]);
          }
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="flex flex-col min-h-[100vh] justify-center">
      {isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60vw",
            minHeight: "85vh",
            backgroundColor: "RGBA(255, 255, 255, 0.05)",
            backdropFilter: "blur(15px)",
            margin: "8vh auto 8vh",
            padding: "4em",
            paddingTop: "3em",
          }}
        >
          <div className="flex h-[70vh] justify-center items-center">
            <Spin size="large" />
          </div>
        </div>
      )}
      <div className="flex gap-4 justify-around flex-wrap my-8 mx-12">
        {deviceData ? (
          deviceData.map((deviceName: string) => (
            <div
              key={deviceName}
              id="content"
              className="flex flex-col justify-center w-[25vw] h-[45vh] hover:w-[26vw] transition-all bg-white rounded-md overflow-hidden shadow-md shadow-black cursor-pointer"
            >
              <div className="content-overlay flex flex-col justify-center">
                <Link href={`/deviceData/${deviceName}`}>
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="text-white w-16 ml-[40%]"
                  />
                </Link>
                <h4 className="text-center font-sans font-thin my-4 text-lg text-white">
                  View details
                </h4>
              </div>

              <Image
                className="cursor-pointer hover:scale-110 transition-all object-contain"
                width={250}
                height={350}
                src={`/${deviceName}.gif`}
              />

              <div className="card-desc text-white text-center font-mono font-medium cursor-pointer p-4">
                {deviceName}
              </div>
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default DeviceList;
