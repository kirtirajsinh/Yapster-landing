"use client";
import React from "react";
import FrameSDK from "@farcaster/frame-sdk";
import { useFrameStore } from "./useStore";

const AddFrame = () => {
  const { user } = useFrameStore();
  const handleClick = async () => {
    try {
      console.log("FrameSDK", FrameSDK);
      if (!user) {
        console.log("FrameSDK is not defined");
        return;
      }
      const result = await FrameSDK.actions.addFrame();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="" onClick={() => handleClick()}>
      Save to Join Waitlist
    </button>
  );
};

export default AddFrame;
