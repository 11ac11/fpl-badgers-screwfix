import styled from 'styled-components';
import { device } from '../breakpoints';
import Image from '../ui/Image';
import screwfixDiv2CircleImage from '../images/screwfix_circle_logo.png';
import badgersDiv1CircleImage from '../images/badger_circle_logo.png';
import { getClosestGame, getHighestPoints, getLowestPoints } from './statUtils';
import { TablePoints } from '../ui/TablePoints';
import TeamForm from '../ui/TeamForm';

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

const EmojiContainer = styled.div`
  ${({ $isHome }) => $isHome ? 'padding-left: 0.2rem' : 'padding-right: 0.2rem'};
  font-size: 1.4rem;
  white-space: nowrap;
  text-align: ${({ $isHome }) => $isHome ? 'left' : 'right'};
  @media ${device.sm} {
    font-size: 0.8rem;
    white-space: unset;
  }
`;

const LeagueTeamAndManagerName = (row, fixturesTable = false, isHome = false) => {
  return (
    <ManagerTeamCombined $isHome={isHome} $fixturesTable={fixturesTable}>
      <TeamName $fixturesTable={fixturesTable} $isHome={isHome}>{!isHome ? row.entry_name || row.entry_1_name : row.entry_2_name}</TeamName>
      <ManagerName $fixturesTable={fixturesTable} $isHome={isHome}>{!isHome ? row.player_name || row.entry_1_player_name : row.entry_2_player_name}</ManagerName>
    </ManagerTeamCombined>
  )
}

const RenderLeagueImage = (row) => {
  const isBadger = (row.division === 95564)
  return (
    <Image src={isBadger ? badgersDiv1CircleImage : screwfixDiv2CircleImage} width={'20px'} />
  )
}

const RenderTeamForm = (row, isHome) => {
  const entryOneResults = row.cell.row.original
  const entryTwoResults = row.cell.row.original

  // console.log(entryOneResults, entryTwoResults)
}

const RenderEmojis = (row, isHome) => {
  const entryOnePoints = row.cell.row.original.entry_1_points
  const entryTwoPoints = row.cell.row.original.entry_2_points
  let emojiStr = ''
  if (!entryOnePoints && !entryTwoPoints) {
    return (<EmojiContainer $isHome={isHome}>{emojiStr} </EmojiContainer>)
  }
  const highestPoints = getHighestPoints(row.data)
  const lowestPoints = getLowestPoints(row.data)
  const closestGame = getClosestGame(row.data)
  if (isHome) {
    if (entryOnePoints > entryTwoPoints) emojiStr += '⚽️ '
    if (entryOnePoints > 90) emojiStr += '🔥 '
    if (entryOnePoints < 40) emojiStr += '😳 '
    if (highestPoints.team === row.cell.row.original.entry_1_name) {
      emojiStr += '🐐 '
    }
    if (lowestPoints.team === row.cell.row.original.entry_1_name) {
      emojiStr += '😭 '
    }
    if (closestGame.homeTeam === row.cell.row.original.entry_1_name) {
      emojiStr += '🤝 '
    }
  } else {
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
  }
  return (<EmojiContainer $isHome={isHome}>{emojiStr} </EmojiContainer>)
}

export const leagueColumns = [
  {
    Header: '#',
    accessor: 'rank',
    Cell: (row) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.value}</div>,
    width: 20,
    minWidth: 20,
    maxWidth: 20,
    sortable: false,
    canSort: false
  },
  {
    Header: 'Lg.',
    Cell: (row) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.value}</div>,
    accessor: (row) => RenderLeagueImage(row),
    width: 10,
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
    Header: 'LP',
    accessor: 'total',
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    sortable: true,
  },
  {
    Header: 'TP',
    accessor: 'points_for',
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    sortable: true,
  },
];

export const fixtureColumns = [
  {
    Header: 'Emoji',
    accessor: 'emoji_1',
    Cell: (row) => <TeamForm teamId={row.row.original.entry_1_entry} leagueId={row.row.original.league} isHome={true} />,
    // Cell: (row) => RenderEmojis(row, true),
    width: '10%',
  },
  {
    Header: 'Home',
    accessor: (row) => LeagueTeamAndManagerName(row, true),
    width: '35%',
  },
  {
    Header: '',
    accessor: 'entry_1_points',
    Cell: (row) => <TablePoints row={row} isHome={true} />,
    width: '5%',
  },
  {
    Header: '',
    accessor: 'entry_2_points',
    Cell: (row) => <TablePoints row={row} isHome={false} />,
    width: '5%',
  },
  {
    Header: 'Away',
    accessor: (row) => LeagueTeamAndManagerName(row, true, true),
    width: '35%',
  },
  {
    Header: 'Emoji2',
    accessor: 'emoji_2',
    // Cell: (row) => RenderEmojis(row, false),
    Cell: (row) => <TeamForm teamId={row.row.original.entry_2_entry} leagueId={row.row.original.league} isHome={false} />,
    width: '10%',
  },
];