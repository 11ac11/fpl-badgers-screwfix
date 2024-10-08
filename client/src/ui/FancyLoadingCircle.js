import React from "react";
import styled, { keyframes } from "styled-components";
import { device } from "../breakpoints";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingCircle = styled.div`
  width: ${(props) => props.width || '80px'};
  max-width: 80px;
  aspect-ratio: 1/1;
  border: 10px solid var(--green);
  border-radius: 50%;
  border-top: 10px solid var(--turq);
  animation: ${spinAnimation} 1s linear infinite;
  margin: 1rem 0;

  @media ${device.sm} {
    width: ${(props) => (props.width / 1.5) || '50px'};
    margin: 0.5rem 0;
  }
`;

export const FancyLoadingCircle = ({ width }) => {
  return (
    <Container>
      <LoadingCircle width={width} />
    </Container>
  )
};