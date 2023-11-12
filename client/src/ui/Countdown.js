import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FancyLoadingCircle } from "./FancyLoadingCircle";

const CountdownWrapper = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  z-index: 50;
  flex-direction: column;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
`;

const ModalWrap = styled.div`
  background: var(--lightgrey);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 50%;
  width: 50%;
  padding: 1rem;
  border-radius: 1rem;
`

const CountdownTitle = styled.span`
  font-size: 2rem;
`

const CountdownText = styled.div`
  font-size: 1.2rem;
`
const CountdownTime = styled.span`
  font-family: monospace;
  font-size: 5rem;
  font-variant-numeric: tabular-nums;
`

const PostCountdownText = styled(CountdownText)``

export const Countdown = ({ startTime, countdownTitle, displayText, countdownCompleteText }) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [time]);

  return (
    <CountdownWrapper>
      <ModalWrap>
        <CountdownTitle>{countdownTitle}</CountdownTitle>
        <CountdownText>{displayText}</CountdownText>
        <span>Please wait...</span>
        <FancyLoadingCircle />
        {time > 0 ? <CountdownTime>00:{time < 10 ? `0${time}` : time}</CountdownTime> : <PostCountdownText>{countdownCompleteText}</PostCountdownText>}
      </ModalWrap>
    </CountdownWrapper>
  );
};