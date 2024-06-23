import React from 'react';
import styled from 'styled-components';
import { device } from '../../breakpoints';
import { getHighestPoints } from '../../utils/statUtils';
import { getLowestPoints } from '../../utils/statUtils';
import { getClosestGame } from '../../utils/statUtils';

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

export const FixtureAwards = ({ rowInfo, isHome = false }) => {
  const entryOnePoints = rowInfo.cell.row.original.entry_1_points
  const entryTwoPoints = rowInfo.cell.row.original.entry_2_points
  let emojiStr = ''
  if (!entryOnePoints && !entryTwoPoints) {
    return (<EmojiContainer $isHome={isHome}>{emojiStr} </EmojiContainer>)
  }
  const highestPoints = getHighestPoints(rowInfo.data)
  const lowestPoints = getLowestPoints(rowInfo.data)
  const closestGame = getClosestGame(rowInfo.data)
  if (isHome) {
    if (entryOnePoints > entryTwoPoints) emojiStr += '⚽️ '
    if (entryOnePoints > 90) emojiStr += '🔥 '
    if (entryOnePoints < 40) emojiStr += '😳 '
    if (highestPoints.team === rowInfo.cell.row.original.entry_1_name) {
      emojiStr += '🐐 '
    }
    if (lowestPoints.team === rowInfo.cell.row.original.entry_1_name) {
      emojiStr += '😭 '
    }
    if (closestGame.homeTeam === rowInfo.cell.row.original.entry_1_name) {
      emojiStr += '🤝 '
    }
  } else {
    if (closestGame.awayTeam === rowInfo.cell.row.original.entry_2_name) {
      emojiStr += '🤝 '
    }
    if (lowestPoints.team === rowInfo.cell.row.original.entry_2_name) {
      emojiStr += '😭 '
    }
    if (highestPoints.team === rowInfo.cell.row.original.entry_2_name) {
      emojiStr += '🐐 '
    }
    if (entryTwoPoints < 40) emojiStr += '😳 '
    if (entryTwoPoints > 90) emojiStr += '🔥 '
    if (entryOnePoints < entryTwoPoints) emojiStr += '⚽️ '
  }
  return (
    <EmojiContainer $isHome={isHome}>{emojiStr} </EmojiContainer>)
}