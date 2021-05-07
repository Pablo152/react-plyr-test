import React from "react";
import ReactPlyr, { Provider, Event } from "../components/ReactPlyr";

const Room: React.VFC = (): JSX.Element => {
  const sources = [
    {
      src: "https://www.youtube.com/watch?v=pV6VauzOwTk",
      provider: "youtube" as Provider,
    },
  ];

  const onPlay = (event: Event): void => {
    console.log("HELLO FROM PARENT", event);
  };

  const onSeeking = (event: Event): void => {
    console.log("HELLO FROM PARENT -- Seeking", event);
  };

  return (
    <div>
      <ReactPlyr
        sources={sources}
        type="video"
        onPlay={onPlay}
        onSeeking={onSeeking}
      />
    </div>
  );
};

export default Room;
