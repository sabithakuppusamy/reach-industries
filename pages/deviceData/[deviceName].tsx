import Slider from "@mui/material/Slider";
import { makeStyles, withStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import cvmData from "../../public/deviceData.js";
import { InputNumber, Popover, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/NoData";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

const CustomRedSlider = withStyles({
  rail: {
    backgroundImage: "linear-gradient(.25turn, #000, #f00)",
    height: 24,
    opacity: 1,
  },
  track: {
    backgroundImage: "linear-gradient(.25turn, #000, #f00)",
    border: "transparent",
  },
})(Slider);

const CustomGreenSlider = withStyles({
  rail: {
    backgroundImage: "linear-gradient(.25turn, #000, #0f0)",
    height: 24,
    opacity: 1,
  },
  track: {
    backgroundImage: "linear-gradient(.25turn, #000, #0f0)",
    border: "transparent",
  },
})(Slider);

const CustomBlueSlider = withStyles({
  rail: {
    backgroundImage: "linear-gradient(.25turn, #000, #00f)",
    height: 24,
    opacity: 1,
  },
  track: {
    backgroundImage: "linear-gradient(.25turn, #000, #00f)",
    border: "transparent",
  },
})(Slider);

export default function DynamicPage() {
  const router = useRouter();
  const videoEl = useRef(null);
  const [redValue, setRedValue] = useState(1200);
  const [greenValue, setGreenValue] = useState(1200);
  const [blueValue, setBlueValue] = useState(1200);
  const [color, setColor] = useState("rgb(151,154,162)");
  const [frameNumber, setFrameNumber] = useState(0);
  const [histogram, setHistogram] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const popoverContent = (
    <div bg-black text-white>
      <div className="flex justify-center align-middle">
        <span className=" mt-1 mr-4"> RGB: </span>
        <span
          className="w-[80px] h-[30px]"
          style={{ backgroundColor: color }}
        ></span>
      </div>
      <div className="flex justify-center align-middle mt-2">
        <span className=" mr-4"> Frame Number: </span>
        <span>{frameNumber}</span>
      </div>
      <div className="flex justify-center align-middle mt-2">
        <span className=" mr-4"> Histogram: </span>
        <span>{histogram}</span>
      </div>
    </div>
  );

  const {
    query: { deviceName },
  } = router;

  return (
    <>
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
        <div>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="w-6 z-10 text-white cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />
        </div>

        {deviceName === "LabEye-dVr" ? (
          <div className="relative my-4 mt-4">
            <Popover
              content={popoverContent}
              visible={!isLoading}
              placement="right"
            >
              <div
                className="absolute w-[30%] h-[45%] border-solid border-8 left-[8em] top-[12em] right-0"
                style={{
                  borderColor: color,
                  transition: "border-color 0.4s linear",
                }}
              ></div>
            </Popover>

            <h1 className="text-white font-light text-left text-2xl mb-4">
              {deviceName} {" details:"}
            </h1>
            <video
              className="rounded-sm border-white border-[5px] shadow-md shadow-black"
              controls={true}
              ref={videoEl}
              autoPlay
              onTimeUpdate={(e) => {
                Object.entries(cvmData.frame_data).forEach((item) => {
                  if (
                    Math.ceil(parseInt(item[0]) / 12) ===
                    Math.ceil((e.target as HTMLMediaElement).currentTime)
                  ) {
                    setFrameNumber(parseInt(item[0]));
                    setHistogram(item[1].histDiff);
                    setRedValue(Math.ceil(item[1].avgR));
                    setGreenValue(Math.ceil(item[1].avgG));
                    setBlueValue(Math.ceil(item[1].avgB));
                    setColor(`rgb(${redValue}, ${greenValue}, ${blueValue})`);
                  }
                });
              }}
            >
              <source src="https://frontend-test-2022-bucket.s3.eu-west-2.amazonaws.com/frontend_test.mp4" />
            </video>
            <div className="flex flex-row gap-4 justify-between mt-8">
              <div
                className={classes.root}
                style={{ display: "flex", gap: 10 }}
              >
                Red:{" "}
                <CustomRedSlider max={1289} min={0} value={redValue} step={1} />
                <InputNumber
                  className="antd-input-number"
                  min={0}
                  max={255}
                  value={redValue}
                  readOnly
                />
              </div>
              <div
                className={classes.root}
                style={{ display: "flex", gap: 10 }}
              >
                Green:{" "}
                <CustomGreenSlider
                  max={1289}
                  min={0}
                  value={greenValue}
                  step={1}
                />
                <InputNumber
                  className="antd-input-number"
                  min={0}
                  max={255}
                  value={greenValue}
                  readOnly
                />
              </div>
              <div
                className={classes.root}
                style={{ display: "flex", gap: 10 }}
              >
                Blue:{" "}
                <CustomBlueSlider
                  max={1289}
                  min={0}
                  value={blueValue}
                  step={1}
                />
                <InputNumber
                  className="antd-input-number"
                  min={0}
                  max={255}
                  value={blueValue}
                  readOnly
                />
              </div>
            </div>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
