import styled from 'styled-components';

const TeamName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
`

const ManagerName = styled.p`
  font-family: JetBrains Mono;
  margin: 0;
  padding: 0;
  font-size: 0.6rem;
`

const ManagerTeamCombined = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const LeagueTeamAndManagerName = (row, table = true, player2 = false) => {

  return (
  <ManagerTeamCombined style={{ textAlign: !table && !player2 ? 'right' : 'left'}}>
    <TeamName>{!player2 ? row.entry_name || row.entry_1_name : row.entry_2_name}</TeamName>
    <ManagerName>{!player2 ? row.player_name || row.entry_1_player_name : row.entry_2_player_name}</ManagerName>
  </ManagerTeamCombined>
  )
}

export const leagueColumns = [
  {
    Header: '#',
    accessor: 'rank',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    sortable: false,
    canSort: false
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

export const badgeFixColumns = [
  {
    Header: '#',
    accessor: 'index',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    sortable: false
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
    Header: 'League Rank',
    accessor: 'rank',
    width: 40,
    minWidth: 40,
    maxWidth: 40,
    fontSize: 8,
    sortable: false, // Enable sorting for this column
  },
  {
    Header: 'Total Points',
    accessor: 'points_for',
    width: 40,
    minWidth: 40,
    maxWidth: 40,
    fontSize: '8px',
    sortable: false, // Enable sorting for this column
    sortType: 'basic',
  },
];

export const fixtureColumns = [
  {
    Header: 'Home',
    accessor: (row) => LeagueTeamAndManagerName(row, false),
    width: 200,
    minWidth: 200,
    maxWidth: 200,
    style: { textAlign: 'right' },

  },
  {
    Header: '',
    accessor: 'entry_1_points',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
  },
  {
    Header: '',
    accessor: 'entry_2_points',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
  },
  {
    Header: 'Away',
    accessor: (row) => LeagueTeamAndManagerName(row, false, true),
    width: 200,
    minWidth: 200,
    maxWidth: 200,
    style: { textAlign: 'left' },

  }
];