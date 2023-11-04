import React, { useEffect } from 'react'

import { fetchManagerPicksByEvent } from '../api/requests';

export const Team = ({ gameweekNumber }) => {

  // useEffect(() => {
  //   if (gameweekNumber) {
  //     fetchPicks();
  //   }
  // }, [gameweekNumber]);



  // const fetchPicks = async () => {
  //   try {
  //     const res = await fetchManagerPicksByEvent(1034149, gameweekNumber)
  //     console.log('picks: ', res)
  //   } catch (error) {
  //     console.error(`Error: ${error.message}`);
  //   }
  // };


  return (
    <p>This is team</p>
  );
}