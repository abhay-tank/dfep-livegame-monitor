const fs = require("fs");

const getGameSchedules = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const graphql = JSON.stringify({
      query:
        "query Game_schedules($query: mixedField) {\n  game_schedules(query: $query) {\n    uid\n    leagueId\n    seasonCode\n    seasonType\n    gameId\n    provider\n    ticketUrl\n    gameDateTimeUtc\n    round\n    roundAlias\n    roundName\n    roundDescription\n    gameStatus\n    gameStatusText\n    gameDuration\n    clock\n    dfepGameQuarterClock\n    quarter\n    dfepQuarter\n    periodType\n    venue {\n      venueId\n      name\n      city\n      state\n      address\n      postalCode\n      venueNameInternational\n    }\n    broadcasts {\n      broadcastId\n      scope\n      media\n      display\n      abbr\n      link\n      broadcastTime\n      languageIso\n      broadcastTimeZone\n      broadcastProviderURL\n      tapeDelayComments\n      broadcasterTeamId\n    }\n    homeTeam {\n      teamId\n      name\n      teamNameInternational\n      teamAbbreviation\n      teamCodeInternational\n      teamSlug\n      teamNicknameInternational\n      score\n      records\n      images {\n        url\n        m1\n        s1\n        t1\n        l1\n      }\n      periods {\n        period\n        periodType\n        score\n      }\n      starters {\n        playerId\n        position\n        lastName\n        firstName\n        status\n      }\n      wins\n      losses\n      seed\n      city\n    }\n    awayTeam {\n      teamId\n      name\n      teamNameInternational\n      teamAbbreviation\n      teamCodeInternational\n      teamSlug\n      teamNicknameInternational\n      score\n      records\n      images {\n        url\n        m1\n        s1\n        t1\n        l1\n      }\n      periods {\n        period\n        periodType\n        score\n      }\n      starters {\n        playerId\n        position\n        lastName\n        firstName\n        status\n      }\n      wins\n      losses\n      seed\n      city\n    }\n    attendance\n    dfepHide\n    played\n    date\n    confirmedDate\n    confirmedHour\n    localTimeZone\n    localDate\n    audienceConfirmed\n    socialFeed\n    operationsCode\n    group {\n      groupId\n      order\n      name\n      rawName\n    }\n    referee1 {\n      code\n      name\n      alias\n      country {\n        code\n        name\n      }\n      images {\n        verticalSmall\n      }\n      active\n    }\n    referee2 {\n      code\n      name\n      alias\n      country {\n        code\n        name\n      }\n      images {\n        verticalSmall\n      }\n      active\n    }\n    referee3 {\n      code\n      name\n      alias\n      country {\n        code\n        name\n      }\n      images {\n        verticalSmall\n      }\n      active\n    }\n    referee4 {\n      code\n      name\n      alias\n      country {\n        code\n        name\n      }\n      images {\n        verticalSmall\n      }\n      active\n    }\n    isNeutralVenue\n    winner {\n      code\n      name\n      abbreviatedName\n      editorialName\n      tvCode\n      isVirtual\n      images {\n        crest\n      }\n    }\n    poolNumber\n    keywords\n    weather\n    twitterHashtag\n    liveStream\n    matchNumber\n    matchName\n    phaseName\n    atNeutralVenue\n    extraPeriodsUsed\n    timezone\n    matchTime\n    enddate\n    timeActual\n    timeEndActual\n    durationActual\n    temperature\n    externalId\n    nextMatchId\n    placeIfWon\n    placeIfLost\n    inConference\n    updated\n    statsSource\n    tournamentId\n    matchDataUpdated\n    hostingTeamId\n    fulltimePlayed\n    courtType\n    hasFlaggedActions\n    leagueName\n    leagueNameInternational\n    competitionName\n    competitionNameInternational\n    gameCode\n    gameSequence\n    gameDateEst\n    gameTimeEst\n    gameDateTimeEst\n    gameDateUTC\n    gameTimeUTC\n    awayTeamTime\n    homeTeamTime\n    day\n    monthNum\n    weekNumber\n    weekName\n    seriesText\n    ifNecessary\n    seriesGameNumber\n    gameLabel\n    gameSubLabel\n    postponedStatus\n    gameSubtype\n    gameDurationSeconds\n    actualStartTimeUTC\n    actualEndTimeUTC\n    seriesConference\n    referees\n    gameThemes {\n      displayText\n      title\n      filterKey\n      iconImage\n    }\n    gameState\n    pointsLeaders {\n      personId\n      firstName\n      lastName\n      teamId\n      teamCity\n      teamName\n      teamTricode\n      points\n    }\n    created_at\n    updated_at\n    custom_fields\n    cs_custom_fields\n  }\n}",
      variables: { query: { gameStatus: "In Progress" } },
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
    console.error("Error fetching game schedules: ", error);
  }
};

const saveGameSchedule = (schedule) => {
  try {
    const folderName = `games/${schedule.homeTeam.teamId} vs ${schedule.awayTeam.teamId}: ${schedule.gameDateTimeUtc}/game-schedules/QTR-${schedule.dfepQuarter}`;
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }

    const fileName = `${folderName}/${schedule.dfepGameQuarterClock}-${schedule.updated_at}.json`;
    const data = JSON.stringify(schedule, null, 2);
    fs.writeFileSync(fileName, data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Saved Game Schedule: ${fileName}`);
      }
    });
  } catch (error) {
    console.error(
      `
      Error saving game schedule:
      File: "games/${schedule.homeTeam.teamId} vs ${schedule.awayTeam.teamId}: ${schedule.gameDateTimeUtc}/game-schedules/QTR-${schedule.dfepQuarter}/${schedule.dfepGameQuarterClock}-${schedule.updated_at}.json"
      `,
      { error, schedule }
    );
  }
};

module.exports = { getGameSchedules, saveGameSchedule };
