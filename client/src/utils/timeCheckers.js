export const isTwoDaysAway = (deadlineTime) => {
  if (!deadlineTime) {
    console.error("Invalid deadline time provided");
    return null;
  }

  const deadlineDate = new Date(deadlineTime);
  // console.log('deadlineDate:', deadlineDate)
  const currentDate = new Date();

  // Calculate 48 hours from the current time
  const fortyEightHoursFromNow = currentDate.getTime() + 48 * 60 * 60 * 1000;
  // console.log('1', deadlineDate.getTime(), currentDate.getTime(), deadlineDate.getTime() >= currentDate.getTime())
  // console.log('2', deadlineDate.getTime(), fortyEightHoursFromNow, deadlineDate.getTime() <= fortyEightHoursFromNow)

  // Check if the deadline date is within the 48-hour window
  return deadlineDate.getTime() <= fortyEightHoursFromNow;
};

// Calculate three hours later
const return100minutesAfterKickOff = (dateTime) => {
  // Parse the dateTime string into a Date object
  const inputDate = new Date(dateTime);

  // Check if the parsing was successful
  if (isNaN(inputDate.getTime())) {
    console.error("Invalid date format");
    return null;
  }

  // Calculate 100 minutes after kick off time
  const hundredMinutesLater = new Date(inputDate.getTime() + (100) * 60 * 1000);

  return hundredMinutesLater;
};

// export const gameIsFinished = (dateTime) => {
//   const hundredMinutesLater = return100minutesAfterKickOff(dateTime);

//   if (hundredMinutesLater !== null) {
//     const currentDateTime = new Date();

//     if (currentDateTime > hundredMinutesLater) {
//       console.log("Using FPL scores.");
//       return true
//     } else {
//       console.log("Using custom function to render live scores.");
//       return false
//     }
//   } else {
//     console.error("Error calculating three hours later");
//   }
// };

export const getFirstAndLastKickOffsForEachDay = (fixtures) => {
  const groupedFixtures = fixtures.reduce((acc, fixture) => {
    const date = new Date(fixture.kickoff_time).toLocaleDateString(); // DD/MM/YYYY
    acc[date] = acc[date] || [];
    acc[date].push(fixture);
    return acc;
  }, {});

  const latestFixtures = Object.entries(groupedFixtures).map(([date, fixtures]) => {
    return {
      date,
      firstKickOff: fixtures[0].kickoff_time,
      lastKickOff: fixtures.reduce((accumulator, current) => {
        return accumulator.kickoff_time > current.kickoff_time ? accumulator.kickoff_time : current.kickoff_time;
      }, fixtures[0])
    };
  });

  return latestFixtures;
}

export const isWithinTodaysKickOffs = (date, fixtures) => {
  const foundFixture = fixtures.find(fixture => fixture.date === date)
  if (foundFixture) {
    const { firstKickOff, lastKickOff } = foundFixture
    const lastGameApproxEndTime = return100minutesAfterKickOff(lastKickOff)
    return isWithinTimeRange(firstKickOff, lastGameApproxEndTime)
  }
  return null; // Or return a default value if no match is found
}

export const isWithinTimeRange = (firstKickOff, lastKickOff) => {
  const now = new Date();
  const firstKickoffDate = new Date(firstKickOff);
  const lastKickoffDate = new Date(lastKickOff);

  if (now >= firstKickoffDate && now <= lastKickoffDate) {
    console.log("Using Custom function for live scores.");
    return true
  }
  console.log("Using scores from fixtures API - might not be correct")
  return false
}