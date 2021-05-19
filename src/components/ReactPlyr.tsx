import React, { useEffect } from "react";
import Plyr from "plyr";
import socket from "../socket/socket";

export type Provider = Plyr.Provider;
export type Event = Plyr.PlyrEvent;

type ReactPlyrProps = {
  sources: Plyr.Source[];
  type: Plyr.MediaType;
  id: string;
  onProgress?: (event: Event) => void;
  onPlay?: (event: Event) => void;
  onPlaying?: (event: Event) => void;
  onPause?: (event: Event) => void;
  onTimeUpdate?: (event: Event) => void;
  onVolumeChange?: (event: Event) => void;
  onSeeking?: (event: Event) => void;
  onSeeked?: (event: Event) => void;
  onRateChange?: (event: Event) => void;
  onEnterFullScreen?: (event: Event) => void;
  onExitFullScreen?: (event: Event) => void;
  onCaptionsEnabled?: (event: Event) => void;
  onCaptionsDisabled?: (event: Event) => void;
  onLanguageChange?: (event: Event) => void;
  onControlsHidden?: (event: Event) => void;
  onControlsShown?: (event: Event) => void;
  onReady?: (event: Event) => void;
};

const ReactPlyr: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ReactPlyrProps
> = ({ sources, type, id, ...props }, ref): JSX.Element => {
  useEffect(() => {
    const player = new Plyr("#player");

    socket.on("play_socket", (_) => {
      player.play();
    });

    socket.on("pause_socket", (_) => {
      player.pause();
    });

    socket.on("seeked_socket", (currentTime) => {
      player.currentTime = currentTime;
    });

    // events
    // https://github.com/sampotts/plyr#standard-media-events

    // progress event, pass in onProgress as props
    player.on("progress", (event) => {
      props.onProgress?.(event);
    });

    // play event, pass in onPlay as props
    player.on("play", (event: Event) => {
      props.onPlay?.(event);
    });

    // playing event, pass in onPlaying as props
    player.on("playing", (event: Event) => {
      props.onPlaying?.(event);
      socket.emit("play", id);
    });

    // pause event, pass in onPause as props
    player.on("pause", (event: Event) => {
      console.log("pause");
      props.onPause?.(event);
      socket.emit("pause", id);
    });

    // playing event, pass in onTimeUpdate as props
    player.on("timeupdate", (event: Event) => {
      props.onTimeUpdate?.(event);
    });

    // volumechange event, pass in onVolumeChange as props
    player.on("volumechange", (event: Event) => {
      props.onVolumeChange?.(event);
    });

    // seeking event, pass in onSeeking as props
    player.on("seeking", (event: Event) => {
      props.onSeeking?.(event);
    });

    // seeked event, pass in onSeeked as props
    player.on("seeked", (event: Event) => {
      props.onSeeked?.(event);
      socket.emit("seeked", id, player.currentTime);
    });

    // ratechange event, pass in onRateChange as props
    player.on("ratechange", (event: Event) => {
      props.onRateChange?.(event);
    });

    // enterfullscreen event, pass in onEnterFullScreen as props
    player.on("enterfullscreen", (event: Event) => {
      props.onEnterFullScreen?.(event);
    });

    // exitfullscreen event, pass in onExitFullScreen as props
    player.on("exitfullscreen", (event: Event) => {
      props.onExitFullScreen?.(event);
    });

    // captionsenabled event, pass in onCaptionsEnabled as props
    player.on("captionsenabled", (event: Event) => {
      props.onCaptionsEnabled?.(event);
    });

    // captionsdisabled event, pass in onCaptionsDisabled as props
    player.on("captionsdisabled", (event: Event) => {
      props.onCaptionsDisabled?.(event);
    });

    // languagechange event, pass in onLanguageChange as props
    player.on("languagechange", (event: Event) => {
      props.onLanguageChange?.(event);
    });

    // controlshidden event, pass in onControlsHidden as props
    player.on("controlshidden", (event: Event) => {
      props.onControlsHidden?.(event);
    });

    // controlsshown event, pass in onControlsShown as props
    player.on("controlsshown", (event: Event) => {
      props.onControlsShown?.(event);
    });

    // ready event, pass in onReady as props
    player.on("ready", (event: Event) => {
      props.onReady?.(event);
    });
  }, [sources, type, props, id, ref]);

  return (
    <div
      className="plyr__video-embed"
      id="player"
      style={{ minHeight: "100vh" }}
    >
      <iframe
        key={sources[0].src}
        title="hello"
        allowTransparency
        src={`${sources[0].src}?iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default React.forwardRef(ReactPlyr);
