import React, { useState, useEffect, useContext } from 'react';
import screwfixDiv2CircleBWImage from '../images/screwfix_circle_logo.png';
import badgersDiv1CircleImage from '../images/badger_circle_logo.png';
import Image from '../ui/Image';
import { GeneralContext } from '../state/GeneralContextProvider';
import styled, { keyframes } from 'styled-components';

const gradientFloat = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &.stats-background::before {
    content: ${(props) => (props.$gameWeek ? `"${props.$gameWeek}"` : '""')};
    background: var(--gradient);
    background-size: 400% 400%;
    opacity: 0.75;
    font-size: 50rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation-name: ${gradientFloat};
    animation-duration: 8s;
    animation-iteration-count: infinite;
  }
`

const AllStatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const StatContainer = styled.div`
  max-width: 49%;
  min-width: 49%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(50px);
  padding: 1rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
`

const LeagueImg = styled.div`
  display: inline-flex;
  width: 10%;
`

const StatEmoji = styled.div`
  display: flex;
  font-size: 2rem;
  text-align: center;
  justify-content: center;
  width: 10%;
`

const ManagerName = styled.div`
  font-family: JetBrains Mono;
  font-size: 1.2rem;
`

const TeamName = styled(ManagerName)`
  font-family: 'Jockey One';
  font-size: 1.5rem;
`

const PointsTotal = styled.div`
  width: 10%;
  font-size: 3rem;
  text-align: right;
`

export const Home = ({}) => {


  const { gameweekContextData } = useContext(GeneralContext);
  const { gameweekAwards, currentGameweekNumber } = gameweekContextData

  const awardsForMapping = gameweekAwards && Object.entries(gameweekAwards)

  // console.log(awardsForMapping)

  console.log('context', gameweekContextData)

  const renderEmojiForAward = (awardName) => {
    if (awardName.includes('Highest')) {
        return '🐐';
    } else if (awardName.includes('Lowest')) {
        return '😭';
    } else if (awardName.includes('Top')) {
        return '🏆';
    } else if (awardName.includes('Bottom')) {
        return '‼️';
    } else {
        return '';
    }
  }


  return (
    <Background className="stats-background" $gameWeek={ currentGameweekNumber }>
    { gameweekContextData && awardsForMapping && (
      <AllStatsContainer>
        { awardsForMapping.map((award, key) => {
          const awardName = award[0]
          const awardData = award[1]
          return (
          <StatContainer key={key}>
            <LeagueImg>
              { awardName.includes('badgers')
                ? <Image src={badgersDiv1CircleImage} alt="Badgers division one" width="100%"/>
                : <Image
                  src={screwfixDiv2CircleBWImage}
                  alt="Screwfix division two"
                  width="100%"
                  /> }
            </LeagueImg>
            <StatEmoji>{renderEmojiForAward(awardName)}</StatEmoji>
            <div style={{ width: '50%' }}>
              <TeamName>
                <span>{awardData?.team} </span>
              </TeamName>
              <ManagerName>
                {awardData?.winner}
              </ManagerName>
            </div>
            <PointsTotal>
              <span>{awardData?.points}</span>
            </PointsTotal>
          </StatContainer>
          )
        })}
      </AllStatsContainer>
    )}
    </Background>
  );
};
