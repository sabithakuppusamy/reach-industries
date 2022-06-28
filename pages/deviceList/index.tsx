import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import NoData from "../../components/NoData";

const DeviceList = () => {
  const [deviceData, setDeviceData] = useState([]);
  const router = useRouter();
  const { userId, orgId } = router.query;

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
      });
  };

  return (
    <div className="flex flex-col min-h-[100vh] justify-center">
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
