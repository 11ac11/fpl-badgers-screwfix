import { fetchManagerPicksByEvent } from "../api/requests";

export const calculateLivePoints = async (normalFixtureList) => {
  const fetchData = async (managerId, gameweekNumber) => {
    try {
      const res = await fetchManagerPicksByEvent(managerId, gameweekNumber);
      return res;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null; // Return null or handle the error as needed
    }
  };

  const calculateElementTotalPoints = (picks) => {
    if (picks.length > 0) {
      return picks.map(pick => {
        const totalPoints = pick.stats.total_points * pick.multiplier;
        return { ...pick, totalPoints };
      });
    }
  }

  const calculateTeamTotalPoints = (picks) => {
    const picksWithTotalPoints = calculateElementTotalPoints(picks);

    // Calculate the total points for the team
    const teamTotalPoints = picksWithTotalPoints.reduce((total, pick) => total + pick.totalPoints, 0);

    return teamTotalPoints;
  }

  const updatedArray = await Promise.all(normalFixtureList.map(async item => {
    // Call your function to find the new points based on entry and event
    const entryOnePicks = await fetchData(item.entry_1_entry, item.event);
    const entryTwoPicks = await fetchData(item.entry_2_entry, item.event);

    if (entryOnePicks && entryTwoPicks) {
      const newPointsEntry1 = calculateTeamTotalPoints(entryOnePicks.picks);
      const newPointsEntry2 = calculateTeamTotalPoints(entryTwoPicks.picks);

      // Create a new object with the updated "entry_1_points" and "entry_2_points" properties
      return {
        ...item, // Copy the original object
        entry_1_points: (newPointsEntry1 - entryOnePicks.entry_history.event_transfers_cost), // Update the "entry_1_points" property
        entry_2_points: (newPointsEntry2 - entryTwoPicks.entry_history.event_transfers_cost), // Update the "entry_2_points" property
      };
    } else {
      // Handle the case where data fetching failed for some reason
      return item; // Return the original item
    }
  }));

  return updatedArray;
}

const mergeObjectsById = (array1, array2, array3) => {
  const mergedArray = array1.map(obj1 => {
    const matchingObj2 = array2.find(obj2 => obj2.element === obj1.id);
    const matchingObj3 = array3.find(obj3 => obj3.id === obj1.id);

    if (matchingObj2 && matchingObj3) {
      // Merge the objects from array2 and array3, excluding the 'element' property
      const { element, ...mergedObject } = { ...obj1, ...matchingObj2 };
      // Include the 'stats' property from array3
      mergedObject.stats = matchingObj3.stats;
      return mergedObject;
    }
    // If there is no match in either array2 or array3, return null
    return null;
  }).filter(Boolean); // Filter out the null values (no match)

  // Sort the mergedArray by the 'position' property in ascending order
  return mergedArray.sort((a, b) => a.position - b.position);
}