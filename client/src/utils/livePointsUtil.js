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
            // console.log(matchingObj)
            break; // Found a match, so exit the loop
          }
        }

        // get the fixture id at add to player live data:   matchingObj.explain[0].fixture
        // cross reference with fixture data:               fixture[index].finished?
        // if match finished and minutes = 0,               matchingObj.stats.minutes
        // check if player in same position on bench:       picks.position === 11/12/13/14    note: 11 always GK
        // swap players

        // NOTE: will need to think about formations        bootstrapStatic.elements.element_type   1: GK   2: DF   3: MD   4: ST
        // GK will always be 1
        // DF can be 3, 4 or 5
        // MD can be 2, 3, 4, 5
        // ST can be 1, 2, 3

        // 8 possible formations:
        // 5, 4, 1      5, 3, 2     5, 2, 3
        // 4, 5, 1      4, 4, 2     4, 3, 3
        // 3, 5, 2      3, 4, 3

        // if GK, sub in the sub GK - if element.element_type === 1, remove

        // ------------DF sub case--------------
        // if DF, check if [12] is DF
        // if not, check position of [12]
        // --- if 12 is not DF
        // formation has 3 DF - early return - no sub
        // if 12 is MD - check less than 5 midfielders
        // if so, can swap

        // if 12 is ST - check less than 3 strikers
        // is so, can swap
        // ------------------------------------

        // ------------MD sub case--------------
        // if MD, check if [12] is MD
        // if formation has 2 MD - all 3 players on bench are MD - make sub
        // if not, check position of [12]
        // if 12 is DF - check less than 5 defenders
        // if so, can swap

        // if 12 is ST - check less than 3 strikers
        // is so, can swap
        // ------------------------------------

        // ------------ST sub case--------------
        // if ST, check if [12] is ST
        // if not, check position of [12]
        // if 12 is DF - check less than 5 defenders
        // if so, can swap

        // if 12 is MD - check less than 5 midfielders
        // is so, can swap
        // ------------------------------------

        // will also need a marker about how many subs have already been completed, so we move from [12] to [13] etc.


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
          // subs used here?
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