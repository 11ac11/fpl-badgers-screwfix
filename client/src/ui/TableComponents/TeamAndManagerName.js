import React from 'react';
import styled from 'styled-components';
import { device } from '../../breakpoints';
import useInnerWidth from '../../utils/InnerWidth';
import { TeamForm } from './TeamForm';

const ManagerTeamCombined = styled.div`
  display: flex;
  flex-direction: ${({ $fixturesTable }) => $fixturesTable ? 'column' : 'row'};
  align-items: center;
  justify-content: space-between;
  min-height: 20px;
  padding: 0.3rem 1rem 0.3rem 0rem;
  width: 100%;

  a {
    width: 100%;
    color: inherit;
  }

  a:hover {
    color: var(--turq);
    text-shadow: 1px 1px #5bff89;
  }

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
    font-size: 0.8rem;
    width: 100%;
    ${({ $fixturesTable }) => !$fixturesTable && 'text-align: left;'}
    ${({ $fixturesTable }) => !$fixturesTable && 'letter-spacing: 1px;'}
  }

  @media ${device.xs} {
    font-size: 0.7rem;
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
  ${({ $fixturesTable }) => $fixturesTable && `width: 100%;`}
  max-width: ${({ $fixturesTable }) => ($fixturesTable ? '100%' : '40%')};
  text-align: ${({ $fixturesTable }) => ($fixturesTable ? 'center' : 'right')};
  text-align: ${({ $isHome }) => $isHome ? 'left' : 'right'};

  @media ${device.xl} {
    font-size: 0.8rem;
  }

  @media ${device.sm} {
    font-size: 0.6rem;
    width: 100%;
    max-width: 100%;
    ${({ $fixturesTable }) => !$fixturesTable && 'text-align: left;'}
    ${({ $fixturesTable }) => !$fixturesTable && 'letter-spacing: 0.5px;'}
  }

  @media ${device.xs} {
    font-size: 0.5rem;
  }
`

export const TeamAndManagerName = ({
  rowInfo,
  fixturesTable = false,
  isHome = false,
  gameweekToView,
  badgersData,
  allGamesFinished
}) => {
  const innerWidth = useInnerWidth();
  const homeId = rowInfo.entry_1_entry
  const awayId = rowInfo.entry_2_entry
  const homeTeamName = rowInfo.entry_1_name
  const awayTeamName = rowInfo.entry_2_name
  const homeManagerName = rowInfo.entry_1_player_name
  const awayManagerName = rowInfo.entry_2_player_name
  const canRenderForm = gameweekToView === badgersData?.currentGameweekNumber + 1 && innerWidth < 600

  if (fixturesTable) {
    return (
      <ManagerTeamCombined $isHome={isHome} $fixturesTable={fixturesTable}>
        <a href={`https://fantasy.premierleague.com/entry/${isHome ? homeId : awayId}/event/${badgersData?.currentGameweekNumber}`} target='_blank' rel="noreferrer" >
          <TeamName $isHome={isHome} $fixturesTable={fixturesTable}>
            {isHome ? homeTeamName : awayTeamName}
          </TeamName>
          <ManagerName $isHome={isHome} $fixturesTable={fixturesTable}>
            {isHome ? homeManagerName : awayManagerName}
          </ManagerName>
          {canRenderForm && innerWidth < 600 && <TeamForm
            teamId={isHome ? homeId : awayId}
            leagueId={rowInfo.league}
            isHome={isHome}
          />}
        </a>
      </ManagerTeamCombined>
    )
  }

  // for leagues for manager and team
  return (
    <ManagerTeamCombined $isHome={isHome} $fixturesTable={fixturesTable}>
      <TeamName $isHome={isHome} $fixturesTable={fixturesTable}>
        {rowInfo.entry_name}
      </TeamName>
      <ManagerName $isHome={isHome} $fixturesTable={fixturesTable}>
        {rowInfo.player_name}
      </ManagerName>
      {canRenderForm && innerWidth < 600 && <TeamForm
        teamId={isHome ? homeId : awayId}
        leagueId={rowInfo.league}
        isHome={isHome}
      />}
    </ManagerTeamCombined>
  )
}