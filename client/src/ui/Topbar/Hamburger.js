import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform-origin: 1px;
  cursor: pointer;

  &:hover {
    .lineOne,
    .lineTwo,
    .lineThree {
      background: var(--black); /* Update this to the correct variable */
    }
  }

  .lineOne {
    transform: ${(props) =>
      props.isOpen
        ? 'rotate(45deg) translate(3px, 10px)'
        : 'rotate(0) translate(0, 0)'};
  }
  .lineTwo {
    opacity: ${(props) => (props.isOpen ? 0 : 1)};
  }
  .lineThree {
    transform: ${(props) =>
      props.isOpen
        ? 'rotate(-45deg) translate(3px, -10px)'
        : 'rotate(0) translate(0, 0)'};
  }
`;

const Line = styled.div`
  height: 2px;
  width: 20px;
  background: var(--grey);
  border-radius: 1rem;
  transition: all 0.2s linear;
`;

export const Hamburger = ({ onClick, isOpen }) => {
  return (
    <Container onClick={onClick} isOpen={isOpen}>
      <Line className={isOpen ? 'lineOne open' : 'lineOne'} />
      <Line className={isOpen ? 'lineTwo open' : 'lineTwo'} />
      <Line className={isOpen ? 'lineThree open' : 'lineThree'} />
    </Container>
  );
};
