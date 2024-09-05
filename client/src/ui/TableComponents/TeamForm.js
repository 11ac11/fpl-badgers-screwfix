import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../breakpoints';
import { BadgersContext } from '../../state/BadgersContextProvider';

const Container = styled.div`
  ${({ $isHome }) => $isHome ? 'padding-left: 0.2rem' : 'padding-right: 0.2rem'};
  font-size: 1.4rem;
  white-space: nowrap;
  text-align: ${({ $isHome }) => $isHome ? 'left' : 'right'};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  @media ${device.sm} {
    margin-top: 5px;
    padding-right: 0;
    padding-left: 0;
    font-size: 0.8rem;
    white-space: unset;
    width: 100%;
    & > div {
      justify-content: ${({ $isHome }) => $isHome ? 'flex-start' : 'flex-end'};
    }
  }
`;

const FormDisplayContainer = styled.div`
  display: flex;
  gap: 0.2rem;
`

const OpacityContainer = styled.div`
  opacity: ${({ opacity }) => opacity};
`

const ResultCircle = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 100%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.sm} {
    height: 10px;
    width: 10px;
    font-size: 0px;
  };
`

const Win = styled(ResultCircle)`
  background: var(--green);
`

const Draw = styled(ResultCircle)`
  background: lightgrey;
`

const Loss = styled(ResultCircle)`
  background: var(--red);
  color: var(--white);
`

const TeamForm = ({ teamId, leagueId, isHome }) => {
  const { badgersData } = useContext(BadgersContext);
  const prev5Results = badgersData?.prev5Results

  if (!prev5Results) return

  const teamForm = []

  Object.values(prev5Results).forEach((gameweekRound) => {
    gameweekRound.map((fixtureInRound) => {
      const { entry_1_entry, entry_1_draw, entry_1_loss, entry_1_win, entry_2_entry, entry_2_win, entry_2_draw, entry_2_loss } = fixtureInRound
      const isAtHome = teamId === entry_1_entry
      const isAway = teamId === entry_2_entry
      const homeWin = (isAtHome && !!entry_1_win)
      const awayWin = (isAway && !!entry_2_win)
      const homeDraw = (isAtHome && !!entry_1_draw)
      const awayDraw = (isAway && !!entry_2_draw)
      const homeLoss = (isAtHome && !!entry_1_loss)
      const awayLoss = (isAway && !!entry_2_loss)
      if (homeWin || awayWin) {
        teamForm.push(3)
      } else if (homeDraw || awayDraw) {
        teamForm.push(1)
      } else if (homeLoss || awayLoss) {
        teamForm.push(0)
      }
    })
  })

  const renderFixture = (result, key) => {
    if (result === 3) {
      return <Win key={key}><p>W</p></Win>
    }
    if (result === 1) {
      return <Draw key={key}><p>D</p></Draw>
    }
    if (result === 0) {
      return <Loss key={key}><p>L</p></Loss>
    }
  }

  return (
    <Container $isHome={isHome}>
      <FormDisplayContainer $isHome={isHome}>
        {isHome
          ? teamForm.map((result, index) => (
            <OpacityContainer
              key={index}
              opacity={(1 / teamForm?.length) * (index + 1) + 0.1}
              $isHome={isHome}
            >
              {renderFixture(result, index)}
            </OpacityContainer>
          ))
          : teamForm.reverse().map((result, index) => (
            <OpacityContainer
              key={index}
              opacity={(1 / teamForm?.length) * (teamForm?.length - index) + 0.1}
            >
              {renderFixture(result, index)}
            </OpacityContainer>
          ))}
      </FormDisplayContainer>
    </Container>
  )
};

export default TeamForm;
