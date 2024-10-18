const fs = require("fs");

const getGameLeaders = async ({ gameId, seasonCode, seasonType, provider }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const graphql = JSON.stringify({
      query:
        "query Game_leaders($seasonCode: String!, $seasonType: String!, $provider: gameLeaders_provider!, $gameId: String) {\n  game_leaders(seasonCode: $seasonCode, seasonType: $seasonType, provider: $provider, gameId: $gameId) {\n    uid\n    gameId\n    teamId\n    minutes {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    fieldGoalsAttempted {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    fieldGoalsMade {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    fieldGoals2Attempted {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    fieldGoals2Made {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    fieldGoals3Attempted {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    fieldGoals3Made {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    freeThrowsAttempted {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    freeThrowsMade {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    offensiveRebounds {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    defensiveRebounds {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    rebounds {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    assists {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    steals {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    blocks {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    personalFouls {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    score {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    turnovers {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    pointsInPaints {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    pointsInPaintsAttempted {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    pointsInPaintsMade {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    plusMinus {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    blockAgainst {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    teamFouls {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    seconds {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    totalSeconds {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    efficiency {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    fantasyPoints {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    efficiencyCustom {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    efficiencyGameScore {\n      playerId\n      firstName\n      lastName\n      fullName\n      jerseyNumber\n      position\n      value\n    }\n    created_at\n    updated_at\n    provider\n    leagueId\n    seasonCode\n    seasonType\n  }\n}",
      variables: { gameId, seasonCode, seasonType, provider },
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };

    const response = await fetch(
      `https://api.digitalfanexperience.com/v1/basketball/app/graphql?sport_key=${process.env.SPORT_KEY}&env_key=${process.env.ENV_KEY}&device=ios&version=1.0.0&locale=en-gb`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `
      Error getting game leaders:
      ${(gameId, seasonCode, seasonType, provider)}
      Error:
      `,
      error
    );
  }
};

const saveGameLeader = (boxScore, gameLeader) => {
  try {
    const folderName = `games/${boxScore.homeTeam.teamId} vs ${boxScore.awayTeam.teamId}: ${boxScore.gameDateTimeUtc}/game-leaders/QTR-${boxScore.dfepQuarter}/${gameLeader.teamId}`;
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }

    const fileName = `${folderName}/${boxScore.dfepGameQuarterClock}-${gameLeader.updated_at}.json`;
    const data = JSON.stringify(gameLeader, null, 2);
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Saved Game Leader: ${fileName}`);
      }
    });
  } catch (error) {
    console.error(
      `
      Error saving game leader:
      File: "games/${boxScore.homeTeam.teamId} vs ${boxScore.awayTeam.teamId}: ${boxScore.gameDateTimeUtc}/game-leaders/QTR-${boxScore.dfepQuarter}/${gameLeader.teamId}/${boxScore.dfepGameQuarterClock}-${gameLeader.updated_at}.json"
      `,
      { error, gameLeader }
    );
  }
};

module.exports = { getGameLeaders, saveGameLeader };
