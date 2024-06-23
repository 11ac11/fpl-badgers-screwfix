import styled from 'styled-components';
import { device } from '../breakpoints';
import Image from '../ui/Image';
import screwfixDiv2CircleImage from '../images/screwfix_circle_logo.png';
import badgersDiv1CircleImage from '../images/badger_circle_logo.png';
import { getClosestGame, getHighestPoints, getLowestPoints } from './statUtils';
import { TablePoints } from '../ui/TablePoints';
import TeamForm from '../ui/TeamForm';
import { TeamAndManagerName } from '../ui/TableComponents/TeamAndManagerName';


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



const RenderLeagueImage = (row) => {
  const isBadger = (row.division === 95564)
  return (
    <Image src={isBadger ? badgersDiv1CircleImage : screwfixDiv2CircleImage} width={'20px'} />
  )
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
    accessor: (row) => <TeamAndManagerName rowInfo={row} />,
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