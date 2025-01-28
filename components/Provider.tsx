"use client";
import React, { useEffect } from "react";
import FrameSDK from "@farcaster/frame-sdk";
import { Toaster } from "react-hot-toast";
import { useFrameStore } from "./useStore";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [isSDKLoaded, setIsSDKLoaded] = React.useState(false);
  const { setUser } = useFrameStore();
  useEffect(() => {
    const load = async () => {
      console.log("Running Frame Action ready");
      // Add the FrameSDK.actions.ready() otherwise your app will get stuck in a loading state i.e. a Splash screen.
      FrameSDK.actions.ready();
      const frameuser = await FrameSDK.context;
      console.log("Frame Action ready", frameuser);
      if (frameuser?.user) {
        setUser({
          displayName: frameuser?.user.displayName || "",
          fid: frameuser?.user.fid,
          location: frameuser?.user.location || {
            placeId: "",
            description: "",
          },
          pfpUrl: frameuser?.user.pfpUrl || "",
          username: frameuser?.user.username || "",
        });
      } else {
        console.warn(
          "No user found in FrameSDK context or displayName is undefined."
        );
      }
    };
    if (FrameSDK && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded, setUser]);
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
};

export default Provider;
