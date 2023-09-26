import React from 'react';
import styled from 'styled-components';
import screwfixDiv2Image from '../images/screwfix-div-2.png';
import badgersDiv1CircleImage from '../images/badger_circle_logo.png';
import Image from './Image';

const TopbarContainer = styled.div`
  max-width: -webkit-fill-available;
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const ImageContainer = styled.div`
  dispay: flex;
  gap: 2rem;
  margin-left: 1rem;
  display: flex;
  width: 150px;
  align-items: center;
`;

const GameweekContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GameweekText = styled.span`
  font-size: 28px;
`;

const GameweekNumber = styled.span`
  margin: 0 1rem;
  font-size: 80px;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Topbar = ({ gameweekNumber }) => {
  return (
    <TopbarContainer>
      <ImageContainer>
        <Image
          src={badgersDiv1CircleImage}
          alt="Badgers divison one"
          height="3rem"
          grayscale={true}
        />
        <Image
          src={screwfixDiv2Image}
          alt="Screwfix divison two"
          grayscale={true}
        />
      </ImageContainer>
      <GameweekContainer>
        <GameweekText>Gameweek:</GameweekText>
        <GameweekNumber>{8}</GameweekNumber>
      </GameweekContainer>
    </TopbarContainer>
  );
};
