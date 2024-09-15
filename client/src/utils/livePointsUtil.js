import { fetchManagerPicksByEvent } from "../api/requests";

export const calculateLivePoints = async (normalFixtureList, liveData) => {
  // 1. first fetch each manager's picks for the gameweek
  const fetchManagerPicks = async (managerId, gameweekNumber) => {
    try {
      const res = await fetchManagerPicksByEvent(managerId, gameweekNumber);
      return res;
    } catch (error) {
      console.error(`Error fetching manager picks: ${error.message}`);
      return null; // Return null or handle the error as needed
    }
  };

  // 2. locate each pick in the liveData and add points from liveData to the pick object
  const applyLivePointsToPicks = (elements, liveData) => {
    try {
      const results = [];

      elements.forEach(element => {
        let matchingObj = null;

        for (let i = 0; i < liveData.length; i++) {
          matchingObj = liveData.find(obj => obj.id === element.element); // element.element is the id
          if (matchingObj) {
            break; // Found a match, so exit the loop
          }
        }

        if (matchingObj) { // add the GW stats to the element object
          results.push({ ...element, stats: { ...matchingObj.stats } });
        }
      });

      return results;
    } catch (error) {
      console.error(`Error applying live points to picks: ${error.message}`)
    }
  }

  // 3. add all the picks points together (with the multiplier)
  const calculateTeamTotalPoints = (picks) => {
    const picksWithLivePoints = applyLivePointsToPicks(picks, liveData);
    const teamTotalPoints = picksWithLivePoints.reduce((total, pick) => total + pick.stats.total_points * pick.multiplier, 0);
    return teamTotalPoints;
  }

  // Run the above functions
  const updatedArray = await Promise.all(normalFixtureList.map(async fixture => {
    try {
      const entryOnePicks = await fetchManagerPicks(fixture.entry_1_entry, fixture.event);
      const entryTwoPicks = await fetchManagerPicks(fixture.entry_2_entry, fixture.event);

      if (entryOnePicks && entryTwoPicks) {
        const newPointsEntry1 = calculateTeamTotalPoints(entryOnePicks.picks);
        const newPointsEntry2 = calculateTeamTotalPoints(entryTwoPicks.picks);

        return {
          ...fixture, // Copy the original object
          entry_1_points: (newPointsEntry1 - entryOnePicks.entry_history.event_transfers_cost), // Update the "entry_1_points" property
          entry_2_points: (newPointsEntry2 - entryTwoPicks.entry_history.event_transfers_cost), // Update the "entry_2_points" property
        };
      }
    } catch (error) {
      // Handle the case where data fetching failed for some reason
      console.error(`Error using/updating live scores: ${error.message}`)
      console.error(`Returning original fixture fixture.`)

      return fixture; // Return the original fixture
    }
  }));

  return updatedArray;
}