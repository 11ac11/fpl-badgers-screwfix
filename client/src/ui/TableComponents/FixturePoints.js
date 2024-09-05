import React from "react"
import styled from "styled-components"
import { device } from '../../breakpoints';

const PointsContainer = styled.div`
  background: var(--green);
  background: ${({ $isHome }) => $isHome ? 'var(--gradient)' : 'var(--gradientRev)'};
  border-radius: ${({ $isHome }) => $isHome ? `20% 0% 0% 20%` : '0% 20% 20% 0%'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem 0.6rem;
  font-size: 1.8rem;
  @media ${device.sm} {
    font-size: 1.2rem;
    padding: 0.1rem 0.4rem;
  }
`

export const FixturePoints = ({ row, isHome }) => {
  const entryOnePoints = row.cell.row.original.entry_1_points
  const entryTwoPoints = row.cell.row.original.entry_2_points

  const futureFixtureStyle = {
    background: 'var(--grey)',
  }

  if (!entryOnePoints && !entryTwoPoints) {
    return (<PointsContainer style={{ ...futureFixtureStyle }} $isHome={isHome}>{'-'} </PointsContainer>)
  }

  const homeCellStyles = {
    color: entryOnePoints >= entryTwoPoints ? 'var(--black)' : '#00000061',
    textDecoration: entryOnePoints >= entryTwoPoints ? 'underline' : 'none'
  }

  const awayCellStyles = {
    color: entryOnePoints <= entryTwoPoints ? 'var(--black)' : '#00000061',
    textDecoration: entryOnePoints <= entryTwoPoints ? 'underline' : 'none'
  }

  const finalStyles = isHome ? homeCellStyles : awayCellStyles

  return (
    <PointsContainer
      style={{ ...finalStyles }}
      className='fixture-score'
      $isHome={isHome}>
      {isHome ? entryOnePoints : entryTwoPoints}
    </PointsContainer>
  )
}