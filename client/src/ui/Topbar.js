import React from 'react';
import styled from 'styled-components';
import screwfixDiv2Image from '../images/screwfix-div-2.png';
import badgersDiv1CircleImage from '../images/badger_circle_logo.png';
import Image from './Image';
import { device } from '../breakpoints';

const TopbarContainer = styled.div`
  max-width: 100%;
  width: 100vw;
  height: 10vh;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @media ${device.sm} {
    background: var(--gradient);
    min-height: 50px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 1rem;
  height: 90%;
  max-height: 90%;
  align-items: center;

  @media ${device.sm} {
    gap: 1rem;
  }
`;

const HeaderLogo = styled(Image)``;

const GameweekContainer = styled.div`
  display: flex;
  align-items: center;
  @media ${device.sm} {
  }
`;

const GameweekText = styled.span`
  font-size: 28px;
  @media ${device.sm} {
    font-size: 0.8rem;
  }
`;

const GameweekNumber = styled.span`
  margin: 0 1rem;
  font-size: 80px;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media ${device.sm} {
    margin: 0 0.5rem;
    font-size: 2rem;
    background: var(--black);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Topbar = ({ gameweekNumber }) => {
  return (
    <TopbarContainer>
      <ImageContainer>
        <HeaderLogo
          src={badgersDiv1CircleImage}
          alt="Badgers division one"
          grayscale={true}
        />
        <HeaderLogo
          src={screwfixDiv2Image}
          alt="Screwfix division two"
          grayscale={true}
        />
      </ImageContainer>
      <GameweekContainer>
        <GameweekText>Gameweek:</GameweekText>
        <GameweekNumber>{gameweekNumber}</GameweekNumber>
      </GameweekContainer>
    </TopbarContainer>
  );
};
