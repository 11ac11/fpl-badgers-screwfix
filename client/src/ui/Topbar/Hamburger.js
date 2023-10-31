import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.button`
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform-origin: 1px;
  cursor: pointer;
  z-index: 50;

  &:hover {
    .lineOne,
    .lineTwo,
    .lineThree {
      background: var(--black);
    }
  }

  ${(props) =>
    props.$isOpen &&
    css`
      .lineOne {
        transform: rotate(45deg) translate(3px, 10px);
      }
      .lineTwo {
        opacity: 0;
      }
      .lineThree {
        transform: rotate(-45deg) translate(3px, -10px);
      }
    `}
`;

const Line = styled.div`
  height: 2px;
  width: 25px;
  background: var(--black);
  border-radius: 1rem;
  transition: all 0.2s linear;
`;

export const Hamburger = ({ onClick, isOpen }) => {
  return (
    <Container onClick={onClick} $isOpen={isOpen}>
      <Line className={isOpen ? 'lineOne' : 'lineOne closed'} />
      <Line className={isOpen ? 'lineTwo' : 'lineTwo closed'} />
      <Line className={isOpen ? 'lineThree' : 'lineThree closed'} />
    </Container>
  );
};
