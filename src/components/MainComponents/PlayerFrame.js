import React, { useEffect, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { PlayerHeader } from "./Header";

const Container = styled.div`
  width: ${(p) => p.width};
  height: 100vh;
  padding-top: 56px;
`;

const VideoSection = styled.div`
  width: 100%;
  height: 100%;
  background: #4b4b4b;

  .youtubeContainer {
    width: 100%;
    height: 100%;
  }
  .youtubeContainer iframe {
    width: 100%;
    height: 100%;
  }
`;

// const Video = styled.iframe`
//   width: 100%;
//   height: 100%;
// `;

const PlayerFrame = ({ title, videos, exitRoom }) => {
  const [playerState, setPlayerState] = useState();
  const [index, setIndex] = useState(0);
  const playerWidth = "calc(100% - 240px)";

  useEffect(() => {
    if (playerState === 0 && index < 2) {
      setIndex((prev) => prev + 1);
    }
  }, [playerState]);

  return (
    <Container width={playerWidth}>
      <PlayerHeader width={playerWidth} exitRoom={exitRoom}>
        {title}
      </PlayerHeader>
      <VideoSection>
        <YouTube
          videoId={
            videos &&
            videos[index].url.replace("https://www.youtube.com/embed/", "")
          }
          containerClassName="youtubeContainer"
          opts={{ playerVars: { autoplay: 1 }, width: "100%" }}
          onStateChange={({ data }) => setPlayerState(data)}
        />
      </VideoSection>
    </Container>
  );
};

export default PlayerFrame;
