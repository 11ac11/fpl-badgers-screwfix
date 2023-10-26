import React from 'react';
import styled, { keyframes } from 'styled-components';
import screwfixDiv2CircleBWImage from '../../images/screwfix_circle_logo_bw.png';
import badgersDiv1CircleImage from '../../images/badger_circle_logo.png';
import Image from '../Image';
import { device } from '../../breakpoints';
import { Hamburger } from './Hamburger';

const TopbarContainer = styled.div`
  max-width: 100%;
  width: 100%;
  height: 10vh;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  @media ${device.sm} {
    background: var(--gradient);
    height: 8vh;
    min-height: 30px;
    padding: 0 0.5rem;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;

  @media ${device.sm} {
    gap: 1rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 2rem;
  height: 90%;
  max-height: 50px;
  align-items: center;

  @media ${device.sm} {
    gap: 1rem;
    height: 60%;
    min-height: 30px;
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

const gradientFloat = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const GameweekNumber = styled.span`
  margin: 0 1rem;
  height: 3rem;
  width: 3rem;
  display: flex;
  font-size: 40px;
  background: var(--gradient);
  background-size: 400% 400%;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  animation-name: ${gradientFloat};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  @media ${device.sm} {
    padding: 0 0.5rem;
    font-size: 2rem;
    background: var(--black);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

`;


export const Topbar = ({ gameweekNumber, sidebarIsOpen, setSidebarIsOpen }) => {
  return (
    <TopbarContainer>
      <LeftSide>
        <Hamburger
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          isOpen={sidebarIsOpen}
        />
        <ImageContainer>
          <HeaderLogo src={badgersDiv1CircleImage} alt="Badgers division one" />
          <HeaderLogo
            src={screwfixDiv2CircleBWImage}
            alt="Screwfix division two"
          />
        </ImageContainer>
      </LeftSide>
      <GameweekContainer>
        <GameweekText>Gameweek:</GameweekText>
        <GameweekNumber>{gameweekNumber}</GameweekNumber>
      </GameweekContainer>
    </TopbarContainer>
  );
};
