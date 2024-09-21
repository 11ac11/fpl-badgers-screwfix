export const isTwoDaysAway = (deadlineTime) => {
  if (!deadlineTime) {
    console.error("Invalid deadline time provided");
    return null;
  }

  const deadlineDate = new Date(deadlineTime);
  console.log('deadlineDate:', deadlineDate)
  const currentDate = new Date();

  // Calculate 48 hours from the current time
  const fortyEightHoursFromNow = currentDate.getTime() + 48 * 60 * 60 * 1000;
  console.log('1', deadlineDate.getTime(), currentDate.getTime(), deadlineDate.getTime() >= currentDate.getTime())
  console.log('2', deadlineDate.getTime(), fortyEightHoursFromNow, deadlineDate.getTime() <= fortyEightHoursFromNow)

  // Check if the deadline date is within the 48-hour window
  return deadlineDate.getTime() <= fortyEightHoursFromNow;
};

// Calculate three hours later
const returnThreeHoursLater = (dateTime) => {
  // Parse the dateTime string into a Date object
  const inputDate = new Date(dateTime);

  // Check if the parsing was successful
  if (isNaN(inputDate.getTime())) {
    console.error("Invalid date format");
    return null;
  }

  // Calculate three hours and 90 minutes later for 3 hours after game
  const threeHoursLater = new Date(inputDate.getTime() + (3 * 60 + 90) * 60 * 1000);

  return threeHoursLater;
};

export const isPastThreeHoursLater = (dateTime) => {
  const threeHoursLater = returnThreeHoursLater(dateTime);

  if (threeHoursLater !== null) {
    const currentDateTime = new Date();

    if (currentDateTime > threeHoursLater) {
      console.log("Using FPL scores.");
      return true
    } else {
      console.log("Using custom function to render live scores.");
      return false
    }
  } else {
    console.error("Error calculating three hours later");
  }
};