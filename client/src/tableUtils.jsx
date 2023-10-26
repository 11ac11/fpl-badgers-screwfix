import styled from 'styled-components';
import { device } from './breakpoints';
import Image from './ui/Image';
import screwfixDiv2CircleImage from './images/screwfix_circle_logo.png';
import badgersDiv1CircleImage from './images/badger_circle_logo.png';

const TeamName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: ${({ fixturesTable }) => (fixturesTable ? '100%' : '75%')};;
`

const ManagerName = styled.p`
  font-family: JetBrains Mono;
  margin: 0;
  padding: 0;
  font-size: 0.6rem;
  ${({ fixturesTable }) => fixturesTable && `width: 100%`};
  max-width: ${({ fixturesTable }) => (fixturesTable ? '100%' : '40%')};
  text-align: ${({ fixturesTable }) => (fixturesTable ? 'center' : 'right')};
  text-align: ${({ player2 }) => player2 ? 'left' : 'right'};
`

const ManagerTeamCombined = styled.div`
  display: flex;
  flex-direction: ${({ fixturesTable }) => (fixturesTable ? 'column' : 'row')};
  align-items: center;
  justify-content: space-between;
`;

const LeagueTeamAndManagerName = (row, fixturesTable = false, player2 = false) => {
  return (
    <ManagerTeamCombined style={{ textAlign: fixturesTable && !player2 ? 'right' : 'left'}} fixturesTable={fixturesTable}>
      <TeamName fixturesTable={fixturesTable}>{!player2 ? row.entry_name || row.entry_1_name : row.entry_2_name}</TeamName>
      <ManagerName fixturesTable={fixturesTable} player2={player2}>{!player2 ? row.player_name || row.entry_1_player_name : row.entry_2_player_name}</ManagerName>
    </ManagerTeamCombined>
    )
}

const renderLeagueImage = (row) => {
  console.log(row)
  const isBadger = (row.league == 'badgers')
  console.log(isBadger)
  return (
    <Image src={isBadger ? badgersDiv1CircleImage : screwfixDiv2CircleImage} width={'20px'} />
  )
}

export const leagueColumns = [
  {
    Header: '#',
    accessor: 'rank',
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    sortable: false,
    canSort: false
  },
  {
    Header: 'League',
    accessor: (row) => renderLeagueImage(row),
    width: 50,
    minWidth: 50
  },
  {
    Header: 'Team',
    accessor: (row) => LeagueTeamAndManagerName(row),
    width: 300,
    style: { textAlign: 'left' },
    sortable: false,
  },
  {
    Header: 'W',
    accessor: 'matches_won',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    style: { textAlign: 'center' },
    sortable: false,
  },
  {
    Header: 'D',
    accessor: 'matches_drawn',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    style: { textAlign: 'center' },
    sortable: false,
  },
  {
    Header: 'L',
    accessor: 'matches_lost',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    style: { textAlign: 'center' },
    sortable: false,
  },
  {
    Header: 'League points',
    accessor: 'total',
    width: 40,
    minWidth: 40,
    maxWidth: 40,
    fontSize: 8,
    sortable: true, // Enable sorting for this column
  },
  {
    Header: 'Total Points',
    accessor: 'points_for',
    width: 40,
    minWidth: 40,
    maxWidth: 40,
    fontSize: '8px',
    sortable: true, // Enable sorting for this column
  },
];

export const fixtureColumns = [
  {
    Header: 'Home',
    accessor: (row) => LeagueTeamAndManagerName(row, true),
    width: '35%',
    style: { textAlign: 'right' },
  },
  {
    Header: '',
    accessor: 'entry_1_points',
    width: '5%',
  },
  {
    Header: '',
    accessor: 'entry_2_points',
    width: '5%',
  },
  {
    Header: 'Away',
    accessor: (row) => LeagueTeamAndManagerName(row, true, true),
    width: '35%',
  }
];