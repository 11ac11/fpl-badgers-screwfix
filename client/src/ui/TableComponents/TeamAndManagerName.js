import React from 'react';
import styled from 'styled-components';
import { device } from '../../breakpoints';
import TeamForm from '../TeamForm';

const ManagerTeamCombined = styled.div`
  display: flex;
  flex-direction: ${({ $fixturesTable }) => $fixturesTable ? 'column' : 'row'};
  align-items: center;
  justify-content: space-between;
  min-height: 20px;
  padding: 0.3rem 1rem 0.3rem 0rem;
  width: 100%;
  @media ${device.sm} {
    flex-direction: column;
    padding: 0.2rem 0.2rem 0.2rem 0rem;
  }
`;

const TeamName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: ${({ $fixturesTable }) => ($fixturesTable ? '100%' : '50%')};
  text-align: ${({ $fixturesTable, $isHome }) => $fixturesTable && !$isHome ? 'right' : 'left'};

  @media ${device.xl} {
    font-size: 1.2rem;
  }

  @media ${device.sm} {
    font-size: 0.7rem;
    width: 100%;
    ${({ $fixturesTable }) => !$fixturesTable && 'text-align: left'};
    ${({ $fixturesTable }) => !$fixturesTable && 'letter-spacing: 1px'};
    ;
  }
`

const ManagerName = styled.p`
  font-family: JetBrains Mono;
  margin: 0;
  padding: 0;
  font-size: 0.6rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${({ $fixturesTable }) => $fixturesTable && `width: 100%`};
  max-width: ${({ $fixturesTable }) => ($fixturesTable ? '100%' : '40%')};
  text-align: ${({ $fixturesTable }) => ($fixturesTable ? 'center' : 'right')};
  text-align: ${({ $isHome }) => $isHome ? 'left' : 'right'};

  @media ${device.xl} {
    font-size: 0.8rem;
  }

  @media ${device.sm} {
    font-size: 0.5rem;
    width: 100%;
    max-width: 100%;
    ${({ $fixturesTable }) => !$fixturesTable && 'text-align: left'};
    ${({ $fixturesTable }) => !$fixturesTable && 'letter-spacing: 0.5px'};
  }
`

export const TeamAndManagerName = ({ rowInfo, fixturesTable = false, isHome = false }) => {
  const renderForm = window.innerWidth < 600
  return (
    <ManagerTeamCombined $isHome={isHome} $fixturesTable={fixturesTable}>
      <TeamName $fixturesTable={fixturesTable} $isHome={isHome}>{!isHome ? rowInfo.entry_name || rowInfo.entry_1_name : rowInfo.entry_2_name}</TeamName>
      <ManagerName $fixturesTable={fixturesTable} $isHome={isHome}>{!isHome ? rowInfo.player_name || rowInfo.entry_1_player_name : rowInfo.entry_2_player_name}</ManagerName>
      {renderForm && <TeamForm teamId={rowInfo.entry_2_entry} leagueId={rowInfo.league} isHome={isHome} />}
    </ManagerTeamCombined>
  )
}