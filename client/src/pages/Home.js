import React, { useState, useEffect, useContext } from 'react';
import screwfixDiv2CircleBWImage from '../images/screwfix_circle_logo.png';
import badgersDiv1CircleImage from '../images/badger_circle_logo.png';
import Image from '../ui/Image';
import { GeneralContext } from '../state/GeneralContextProvider';
import styled, { keyframes } from 'styled-components';
import { device } from '../breakpoints';

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

  @media ${device.md} {
    &.stats-background::before {
      font-size: 30rem;
    }
  }

  @media ${device.sm} {
    &.stats-background::before {
      font-size: 20rem;
    }
  }
`

const AllStatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  @media ${device.sm} {
    gap: 0.75rem;
  }
`

const StatContainer = styled.div`
  max-width: 49%;
  min-width: 49%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(50px);
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
  @media ${device.md} {
    gap: 0.5rem;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
  @media ${device.sm} {
    padding: 0.5rem;
  }
`

const PointsStatsContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    justify-content: space-between;

    & .total_points {
    width: unset;
    max-width: unset;
    min-width: unset;
    flex: 1;
  }
  @media ${device.md} {
    & .lrg {
      width: 25%;
    }
  }
`

const LeagueImg = styled.div`
  display: inline-flex;
  width: 10%;
  min-width: 35px;
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
  @media ${device.md} {
    font-size: 1rem;
  }
  @media ${device.sm} {
    font-size: 0.8rem;
  }
`

const TeamName = styled(ManagerName)`
  font-family: 'Jockey One';
  font-size: 1.5rem;
  @media ${device.md} {
    font-size: 1.25rem;
  }
  @media ${device.sm} {
    font-size: 1rem;
  }
`

const PointsTotal = styled.div`
  width: fit-content;
  font-size: 3rem;
  text-align: right;

  @media ${device.sm} {
    font-size: 2rem;
  }
`

export const Home = ({}) => {
  const { gameweekContextData } = useContext(GeneralContext);
  const { gameweekAwards, currentGameweekNumber, badgersTotalPoints, screwfixTotalPoints } = gameweekContextData

  const awardsForMapping = gameweekAwards && Object.entries(gameweekAwards)

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
        <PointsStatsContainer>
          <StatContainer className="total_points">
            <LeagueImg className="lrg">
              <Image src={badgersDiv1CircleImage} alt="Badgers division one" width="100%"/>
            </LeagueImg>
            <PointsTotal>
              {badgersTotalPoints}
            </PointsTotal>
          </StatContainer>
          <StatContainer className="total_points">
            <LeagueImg className="lrg">
              <Image
                src={screwfixDiv2CircleBWImage}
                alt="Screwfix division two"
                width="100%"
                />
            </LeagueImg>
            <PointsTotal>
              {screwfixTotalPoints}
            </PointsTotal>
          </StatContainer>
        </PointsStatsContainer>
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
