import styled from 'styled-components';
import { device } from './breakpoints';
import Image from './ui/Image';
import screwfixDiv2CircleImage from './images/screwfix_circle_logo.png';
import badgersDiv1CircleImage from './images/badger_circle_logo.png';
import { badgersDivisionId } from './App';
import { getClosestGame, getHighestPoints, getLowestPoints } from './statUtils';

const TeamName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: ${({ $fixturesTable }) => ($fixturesTable ? '100%' : '50%')};;
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
  text-align: ${({ $player2 }) => $player2 ? 'left' : 'right'};
`

const ManagerTeamCombined = styled.div`
  display: flex;
  flex-direction: ${({ $fixturesTable }) => ($fixturesTable ? 'column' : 'row')};
  align-items: center;
  justify-content: space-between;
  min-height: 20px;
`;

const LeagueTeamAndManagerName = (row, fixturesTable = false, player2 = false) => {
  return (
    <ManagerTeamCombined style={{ textAlign: fixturesTable && !player2 ? 'right' : 'left'}} $fixturesTable={fixturesTable}>
      <TeamName $fixturesTable={fixturesTable}>{!player2 ? row.entry_name || row.entry_1_name : row.entry_2_name}</TeamName>
      <ManagerName $fixturesTable={fixturesTable} $player2={player2}>{!player2 ? row.player_name || row.entry_1_player_name : row.entry_2_player_name}</ManagerName>
    </ManagerTeamCombined>
    )
}

const renderLeagueImage = (row) => {
  const isBadger = (row.division == badgersDivisionId)
  return (
    <Image src={isBadger ? badgersDiv1CircleImage : screwfixDiv2CircleImage} width={'20px'} />
  )
}

export const leagueColumns = [
  {
    Header: '#',
    accessor: 'rank',
    Cell: (row) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.value}</div>,
    width: 50,
    minWidth: 20,
    maxWidth: 20,
    sortable: false,
    canSort: false
  },
  {
    Header: 'League',
    Cell: (row) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.value}</div>,
    accessor: (row) => renderLeagueImage(row),
    width: 20,
    minWidth: 20
  },
  {
    Header: 'Team',
    accessor: (row) => LeagueTeamAndManagerName(row),
    width: 300,
    sortable: false,
  },
  {
    Header: 'W',
    accessor: 'matches_won',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    sortable: false,
  },
  {
    Header: 'D',
    accessor: 'matches_drawn',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    sortable: false,
  },
  {
    Header: 'L',
    accessor: 'matches_lost',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    sortable: false,
  },
  {
    Header: 'League points',
    accessor: 'total',
    width: 40,
    minWidth: 40,
    maxWidth: 40,
    fontSize: 8,
    sortable: true,
  },
  {
    Header: 'Total Points',
    accessor: 'points_for',
    width: 40,
    minWidth: 40,
    maxWidth: 40,
    fontSize: '8px',
    sortable: true,
  },
];

export const fixtureColumns = [
  {
    Header: 'Emoji',
    accessor: 'emoji_1',
    Cell: (row) => {
      //console.log(row)
      const entryOnePoints = row.cell.row.original.entry_1_points
      const entryTwoPoints = row.cell.row.original.entry_2_points
      const cellStyles = {
        fontSize: '1.4rem',
        whiteSpace: 'nowrap'
      }
      let emojiStr = ''
      if (!entryOnePoints && !entryTwoPoints) {
        return (<div style={{ ...cellStyles }}>{ emojiStr } </div>)
      }
      if (entryOnePoints > entryTwoPoints) emojiStr += '⚽️ '
      if (entryOnePoints > 90) emojiStr += '🔥 '
      if (entryOnePoints < 40) emojiStr += '😳 '
      const highestPoints = getHighestPoints(row.data)
      const lowestPoints = getLowestPoints(row.data)
      const closestGame = getClosestGame(row.data)
      if (highestPoints.team === row.cell.row.original.entry_1_name) {
        emojiStr += '🐐 '
      }
      if (lowestPoints.team === row.cell.row.original.entry_1_name) {
        emojiStr += '😭 '
      }
      if (closestGame.homeTeam === row.cell.row.original.entry_1_name) {
        emojiStr += '🤝 '
      }
      return (<div style={{ ...cellStyles }}>{ emojiStr } </div>)
    },
    width: '10%',
  },
  {
    Header: 'Home',
    accessor: (row) => LeagueTeamAndManagerName(row, true),
    width: '35%',
    style: { textAlign: 'right', padding: '0.3rem 1rem 0.3rem 0rem' },
  },

  {
    Header: '',
    accessor: 'entry_1_points',
    Cell: (row) => {
      const entryOnePoints = row.cell.row.original.entry_1_points
      const entryTwoPoints = row.cell.row.original.entry_2_points
      const futureFixtureStyle = {
        ...sharedFixtureStyles,
        background: 'var(--grey)',
      }
      if (!entryOnePoints && !entryTwoPoints) {
        return (<div style={{ ...futureFixtureStyle }}>{ '-' } </div>)
      }
      const cellStyles = {
        ...sharedFixtureStyles,
        color: entryOnePoints >= entryTwoPoints ? 'var(--black)' : '#00000061',
        textDecoration: entryOnePoints >= entryTwoPoints ? 'underline' : 'none'
      }
      return (<div style={{ ...cellStyles }} className='fixture-score'>{row.value}</div>)
    },
    width: '5%',
  },
  {
    Header: '',
    accessor: 'entry_2_points',
    Cell: (row) => {
      const entryOnePoints = row.cell.row.original.entry_1_points
      const entryTwoPoints = row.cell.row.original.entry_2_points
      const futureFixtureStyle = {
        ...sharedFixtureStyles,
        borderRadius: '0% 20% 20% 0%',
        background: 'var(--grey)',
      }
      if (!entryOnePoints && !entryTwoPoints) {
        return (<div style={{ ...futureFixtureStyle }}>{ '-' } </div>)
      }
      const cellStyles = {
        ...sharedFixtureStyles,
        borderRadius: '0% 20% 20% 0%',
        background: 'var(--gradientRev)',
        color: entryOnePoints <= entryTwoPoints ? 'var(--black)' : '#00000061',
        textDecoration: entryOnePoints <= entryTwoPoints ? 'underline' : 'none'
      }
      return (<div style={{ ...cellStyles }} className='fixture-score'>{row.value}</div>)
    },
    width: '5%',
  },
  {
    Header: 'Away',
    accessor: (row) => LeagueTeamAndManagerName(row, true, true),
    width: '35%',
    style: { padding: '0.3rem 0rem 0.3rem 1rem' },
  },
  {
    Header: '',
    accessor: 'emoji_2',
    Cell: (row) => {
      const entryOnePoints = row.cell.row.original.entry_1_points
      const entryTwoPoints = row.cell.row.original.entry_2_points
      const cellStyles = {
        fontSize: '1.4rem',
        whiteSpace: 'nowrap',
        textAlign: 'right'
      }
      let emojiStr = ''
      if (!entryOnePoints && !entryTwoPoints) {
        return (<div style={{ ...cellStyles }}>{ emojiStr } </div>)
      }

      const highestPoints = getHighestPoints(row.data)
      const lowestPoints = getLowestPoints(row.data)
      const closestGame = getClosestGame(row.data)

      if (closestGame.awayTeam === row.cell.row.original.entry_2_name) {
        emojiStr += '🤝 '
      }
      if (lowestPoints.team === row.cell.row.original.entry_2_name) {
        emojiStr += '😭 '
      }
      if (highestPoints.team === row.cell.row.original.entry_2_name) {
        emojiStr += '🐐 '
      }
      if (entryTwoPoints < 40) emojiStr += '😳 '
      if (entryTwoPoints > 90) emojiStr += '🔥 '
      if (entryOnePoints < entryTwoPoints) emojiStr += '⚽️ '
      return (<div style={{ ...cellStyles }}>{ emojiStr } </div>)
    },
    width: '10%',
  },
];

const sharedFixtureStyles = {
  background: 'var(--gradient)',
  borderRadius: '20% 0% 0% 20%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.1rem 0.6rem'}