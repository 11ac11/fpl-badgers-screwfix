export const isTwoDaysAway = (deadlineTime) => {
  const deadlineDate = new Date(deadlineTime);

  if (isNaN(deadlineDate.getTime())) {
    console.error("Invalid date format");
    return null;
  }

  const currentDate = new Date();
  const twoDaysFuture = new Date(currentDate);
  twoDaysFuture.setDate(currentDate.getDate() + 2);
  twoDaysFuture.setHours(0, 0, 0, 0);

  return deadlineDate.getTime() <= twoDaysFuture.getTime();
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