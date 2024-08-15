import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin: 0px;
    width: 100%;
    justify-content: center;

    & p {
      margin: 0;
    }
  }

  .countdown {
    font-size: 4rem;
    text-align: right;
  }

  .unit {
    font-size: 2rem;
    width: 20%;
    text-align: left;
    transform: translateY(10px);
  }
`


const calculateTimeLeft = () => {
  const targetDate = new Date('Fri Aug 16 19:30:00 2024');
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor((difference / 1000) % 60);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
};

export const SeasonStartCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <p className='info'>Season starts in:</p>
      <div>
        <div>
          <p className='countdown'>{timeLeft.days}</p>
          <p className='unit'>d</p>
        </div>
        <div>
          <p className='countdown'>{timeLeft.hours}</p>
          <p className='unit'>h</p>
        </div>
        <div>
          <p className='countdown'>{timeLeft.minutes}</p>
          <p className='unit'>m</p>
        </div>
        <div>
          <p className='countdown'>{timeLeft.seconds}</p>
          <p className='unit'>s</p>
        </div>
      </div >
    </Container >
  );
}

export default SeasonStartCountdown;
