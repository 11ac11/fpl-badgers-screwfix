export const getHighestPoints = (entries) => {
    if (Array.isArray(entries)) {
        let winner = null;
        let points = -Infinity;
        let team = null;

        for (const entry of entries) {
            const entry1Points = entry.entry_1_points;
            const entry2Points = entry.entry_2_points;

            if (entry1Points > points) {
                points = entry1Points;
                winner = entry.entry_1_player_name;
                team = entry.entry_1_name;
            }

            if (entry2Points > points) {
                points = entry2Points;
                winner = entry.entry_2_player_name;
                team = entry.entry_2_name;
            }
        }

        return { winner, points, team };
    }
};

export const getLowestPoints = (entries) => {
    if (Array.isArray(entries)) {
        let winner = null;
        let points = Infinity;
        let team = null;

        for (const entry of entries) {
            const entry1Points = entry.entry_1_points;
            const entry2Points = entry.entry_2_points;

            if (entry1Points < points) {
                points = entry1Points;
                winner = entry.entry_1_player_name;
                team = entry.entry_1_name;
            }

            if (entry2Points < points) {
                points = entry2Points;
                winner = entry.entry_2_player_name;
                team = entry.entry_2_name;
            }
        }

        return { winner, points, team };
    }
};

export const getClosestGame = (entries) => {
    let homeTeam, awayTeam
    let pointsDifference = Infinity

    for (const entry of entries) {
        const entry1Points = entry.entry_1_points;
        const entry2Points = entry.entry_2_points;

        const entryDifference = Math.abs(entry1Points - entry2Points)

        if (entryDifference < pointsDifference) {
            homeTeam = entry.entry_1_name;
            awayTeam = entry.entry_2_name;
            pointsDifference = entryDifference
        }
    }
    return { homeTeam, awayTeam, pointsDifference };
}

export const getTopOfTable = (tableData) => {
    const firstPlace = tableData.standings.results[0]
    const winner = firstPlace.player_name
    const points = firstPlace.total
    const team = firstPlace.entry_name

    return { winner, points, team };
}


export const getBottomOfTable = (tableData) => {
    const firstPlace = tableData.standings.results[19]
    const winner = firstPlace.player_name
    const points = firstPlace.total
    const team = firstPlace.entry_name

    return { winner, points, team };
}