"use client";
import React from "react";
import FrameSDK from "@farcaster/frame-sdk";
import { useFrameStore } from "./useStore";
import toast from "react-hot-toast";

const AddFrame = () => {
  const { user } = useFrameStore();
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    try {
      console.log("FrameSDK", FrameSDK);
      if (!user) {
        console.log("FrameSDK is not defined");
        toast.error("Use Farcaster Frame to add Yapster to your home screen");
        return;
      }
      setLoading(true);
      const result = await FrameSDK.actions.addFrame();
      if (result) {
        toast.success("Added frame to join waitlist");
      } else {
        toast.error("Error adding frame");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding frame");
      setLoading(false);
    }
  };
  return (
    <button
      className="mt-6 px-6 py-3 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-black via-green-700 to-green-500 shadow-lg shadow-green-900 transition-transform transform hover:scale-105 hover:shadow-green-500  "
      onClick={() => handleClick()}
      disabled={loading}
    >
      {loading ? "saving..." : "Save to Join Waitlist"}
    </button>
  );
};

export default AddFrame;
