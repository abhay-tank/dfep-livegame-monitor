const fs = require("fs");

const getBoxScores = async ({ gameId, seasonCode, seasonType, provider }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const graphql = JSON.stringify({
      query:
        "query Boxscore($gameId: String!, $seasonCode: String!, $seasonType: String!, $provider: boxscore_provider!) {\n  boxscore(gameId: $gameId, seasonCode: $seasonCode, seasonType: $seasonType, provider: $provider) {\n    uid\n    gameId\n    attendance\n    periodType\n    gameStatus\n    gameStatusText\n    status\n    gameState\n    quarter\n    dfepQuarter\n    clock\n    dfepGameQuarterClock\n    homeTeam {\n      teamId\n      teamAbbreviation\n      timeOuts\n      totalStats {\n        assists\n        reboundsTeamDefensive\n        minutes\n        pointsFastBreak\n        points\n        pointsFromTurnovers\n        pointsInThePaint\n        pointsInThePaintAttempted\n        pointsInThePaintMade\n        pointsSecondChance\n        reboundsTeamOffensive\n        freeThrowsMade\n        secondChancePointsAttempted\n        secondChancePointsMade\n        steals\n        timeLeading\n        timesScoresLevel\n        turnovers\n        turnoversTeam\n        leadChanges\n        freeThrowsAttempted\n        assistsDefensive\n        fastBreakPointsMade\n        benchPoints\n        biggestLead\n        biggestLeadScore\n        biggestScoringRun\n        biggestScoringRunScore\n        blocks\n        blocksReceived\n        efficiencyCustom\n        fastBreakPointsAttempted\n        fieldGoalsAttempted\n        foulsUnsportsmanlike\n        fieldGoalsMade\n        foulsBenchTechnical\n        foulsCoachDisqualifying\n        foulsCoachTechnical\n        foulsDisqualifying\n        foulsOn\n        foulsOffensive\n        foulsPersonal\n        foulsTechnical\n        foulsTechnicalOther\n        assistsTurnoverRatio\n        possessionsOpponent\n        transitionOffence\n        transitionDefence\n        secondChancePointsPercentage\n        reboundsTeam\n        reboundsPersonal\n        possessions\n        fastBreakPointsPercentage\n        pointsInThePaintPercentage\n        score\n        freeThrowsPercentage\n        foulsTotal\n        foulsTeam\n        fieldGoalsPercentage\n        fieldGoalsEffectiveAdjusted\n        defensivePointsPerPossession\n        defensiveRating\n        efficiency\n        offensivePointsPerPossession\n        offensiveRating\n        pace\n        pointsAgainst\n        foulsDrawn\n        foulsTeamTechnical\n        timesTied\n        turnoversTotal\n        assistances\n        blocksFavour\n        blocksAgainst\n        foulsCommited\n        foulsReceived\n        valuation\n        offensiveRebounds\n        defensiveRebounds\n        totalRebounds\n        fouledOut\n        foulsThrowIn\n        headCoachChallengeAccepted\n        headCoachChallengeRejected\n        reboundsDefensiveDeadball\n        reboundsOffensiveDeadball\n        fieldGoals2Made\n        fieldGoals2Attempted\n        fieldGoals2Percentage\n        fieldGoals3Made\n        fieldGoals3Attempted\n        fieldGoals3Percentage\n      }\n      periodStats {\n        quarter\n        stats {\n          assists\n          reboundsTeamDefensive\n          minutes\n          pointsFastBreak\n          points\n          pointsFromTurnovers\n          pointsInThePaint\n          pointsInThePaintAttempted\n          pointsInThePaintMade\n          pointsSecondChance\n          reboundsTeamOffensive\n          freeThrowsMade\n          secondChancePointsAttempted\n          secondChancePointsMade\n          steals\n          timeLeading\n          timesScoresLevel\n          turnovers\n          turnoversTeam\n          leadChanges\n          freeThrowsAttempted\n          assistsDefensive\n          fastBreakPointsMade\n          benchPoints\n          biggestLead\n          biggestLeadScore\n          biggestScoringRun\n          biggestScoringRunScore\n          blocks\n          blocksReceived\n          efficiencyCustom\n          fastBreakPointsAttempted\n          fieldGoalsAttempted\n          foulsUnsportsmanlike\n          fieldGoalsMade\n          foulsBenchTechnical\n          foulsCoachDisqualifying\n          foulsCoachTechnical\n          foulsDisqualifying\n          foulsOn\n          foulsOffensive\n          foulsPersonal\n          foulsTechnical\n          foulsTechnicalOther\n          assistsTurnoverRatio\n          possessionsOpponent\n          transitionOffence\n          transitionDefence\n          secondChancePointsPercentage\n          reboundsTeam\n          reboundsPersonal\n          possessions\n          fastBreakPointsPercentage\n          pointsInThePaintPercentage\n          score\n          freeThrowsPercentage\n          foulsTotal\n          foulsTeam\n          fieldGoalsPercentage\n          fieldGoalsEffectiveAdjusted\n          defensivePointsPerPossession\n          defensiveRating\n          efficiency\n          offensivePointsPerPossession\n          offensiveRating\n          pace\n          pointsAgainst\n          foulsDrawn\n          foulsTeamTechnical\n          timesTied\n          turnoversTotal\n          assistances\n          blocksFavour\n          blocksAgainst\n          foulsCommited\n          foulsReceived\n          valuation\n          offensiveRebounds\n          defensiveRebounds\n          totalRebounds\n          fouledOut\n          foulsThrowIn\n          headCoachChallengeAccepted\n          headCoachChallengeRejected\n          reboundsDefensiveDeadball\n          reboundsOffensiveDeadball\n          fieldGoals2Made\n          fieldGoals2Attempted\n          fieldGoals2Percentage\n          fieldGoals3Made\n          fieldGoals3Attempted\n          fieldGoals3Percentage\n        }\n      }\n      tmr {\n        assists\n        reboundsTeamDefensive\n        minutes\n        pointsFastBreak\n        points\n        pointsFromTurnovers\n        pointsInThePaint\n        pointsInThePaintAttempted\n        pointsInThePaintMade\n        pointsSecondChance\n        reboundsTeamOffensive\n        freeThrowsMade\n        secondChancePointsAttempted\n        secondChancePointsMade\n        steals\n        timeLeading\n        timesScoresLevel\n        turnovers\n        turnoversTeam\n        leadChanges\n        freeThrowsAttempted\n        assistsDefensive\n        fastBreakPointsMade\n        benchPoints\n        biggestLead\n        biggestLeadScore\n        biggestScoringRun\n        biggestScoringRunScore\n        blocks\n        blocksReceived\n        efficiencyCustom\n        fastBreakPointsAttempted\n        fieldGoalsAttempted\n        foulsUnsportsmanlike\n        fieldGoalsMade\n        foulsBenchTechnical\n        foulsCoachDisqualifying\n        foulsCoachTechnical\n        foulsDisqualifying\n        foulsOn\n        foulsOffensive\n        foulsPersonal\n        foulsTechnical\n        foulsTechnicalOther\n        assistsTurnoverRatio\n        possessionsOpponent\n        transitionOffence\n        transitionDefence\n        secondChancePointsPercentage\n        reboundsTeam\n        reboundsPersonal\n        possessions\n        fastBreakPointsPercentage\n        pointsInThePaintPercentage\n        score\n        freeThrowsPercentage\n        foulsTotal\n        foulsTeam\n        fieldGoalsPercentage\n        fieldGoalsEffectiveAdjusted\n        defensivePointsPerPossession\n        defensiveRating\n        efficiency\n        offensivePointsPerPossession\n        offensiveRating\n        pace\n        pointsAgainst\n        foulsDrawn\n        foulsTeamTechnical\n        timesTied\n        turnoversTotal\n        assistances\n        blocksFavour\n        blocksAgainst\n        foulsCommited\n        foulsReceived\n        valuation\n        offensiveRebounds\n        defensiveRebounds\n        totalRebounds\n        fouledOut\n        foulsThrowIn\n        headCoachChallengeAccepted\n        headCoachChallengeRejected\n        reboundsDefensiveDeadball\n        reboundsOffensiveDeadball\n        fieldGoals2Made\n        fieldGoals2Attempted\n        fieldGoals2Percentage\n        fieldGoals3Made\n        fieldGoals3Attempted\n        fieldGoals3Percentage\n      }\n      players {\n        playerId\n        playerName {\n          name\n          firstName\n          lastName\n        }\n        jerseyNumber\n        court\n        played\n        starter\n      }\n    }\n    awayTeam {\n      teamId\n      teamAbbreviation\n      timeOuts\n      totalStats {\n        assists\n        reboundsTeamDefensive\n        minutes\n        pointsFastBreak\n        points\n        pointsFromTurnovers\n        pointsInThePaint\n        pointsInThePaintAttempted\n        pointsInThePaintMade\n        pointsSecondChance\n        reboundsTeamOffensive\n        freeThrowsMade\n        secondChancePointsAttempted\n        secondChancePointsMade\n        steals\n        timeLeading\n        timesScoresLevel\n        turnovers\n        turnoversTeam\n        leadChanges\n        freeThrowsAttempted\n        assistsDefensive\n        fastBreakPointsMade\n        benchPoints\n        biggestLead\n        biggestLeadScore\n        biggestScoringRun\n        biggestScoringRunScore\n        blocks\n        blocksReceived\n        efficiencyCustom\n        fastBreakPointsAttempted\n        fieldGoalsAttempted\n        foulsUnsportsmanlike\n        fieldGoalsMade\n        foulsBenchTechnical\n        foulsCoachDisqualifying\n        foulsCoachTechnical\n        foulsDisqualifying\n        foulsOn\n        foulsOffensive\n        foulsPersonal\n        foulsTechnical\n        foulsTechnicalOther\n        assistsTurnoverRatio\n        possessionsOpponent\n        transitionOffence\n        transitionDefence\n        secondChancePointsPercentage\n        reboundsTeam\n        reboundsPersonal\n        possessions\n        fastBreakPointsPercentage\n        pointsInThePaintPercentage\n        score\n        freeThrowsPercentage\n        foulsTotal\n        foulsTeam\n        fieldGoalsPercentage\n        fieldGoalsEffectiveAdjusted\n        defensivePointsPerPossession\n        defensiveRating\n        efficiency\n        offensivePointsPerPossession\n        offensiveRating\n        pace\n        pointsAgainst\n        foulsDrawn\n        foulsTeamTechnical\n        timesTied\n        turnoversTotal\n        assistances\n        blocksFavour\n        blocksAgainst\n        foulsCommited\n        foulsReceived\n        valuation\n        offensiveRebounds\n        defensiveRebounds\n        totalRebounds\n        fouledOut\n        foulsThrowIn\n        headCoachChallengeAccepted\n        headCoachChallengeRejected\n        reboundsDefensiveDeadball\n        reboundsOffensiveDeadball\n        fieldGoals2Made\n        fieldGoals2Attempted\n        fieldGoals2Percentage\n        fieldGoals3Made\n        fieldGoals3Attempted\n        fieldGoals3Percentage\n      }\n      periodStats {\n        quarter\n        stats {\n          assists\n          reboundsTeamDefensive\n          minutes\n          pointsFastBreak\n          points\n          pointsFromTurnovers\n          pointsInThePaint\n          pointsInThePaintAttempted\n          pointsInThePaintMade\n          pointsSecondChance\n          reboundsTeamOffensive\n          freeThrowsMade\n          secondChancePointsAttempted\n          secondChancePointsMade\n          steals\n          timeLeading\n          timesScoresLevel\n          turnovers\n          turnoversTeam\n          leadChanges\n          freeThrowsAttempted\n          assistsDefensive\n          fastBreakPointsMade\n          benchPoints\n          biggestLead\n          biggestLeadScore\n          biggestScoringRun\n          biggestScoringRunScore\n          blocks\n          blocksReceived\n          efficiencyCustom\n          fastBreakPointsAttempted\n          fieldGoalsAttempted\n          foulsUnsportsmanlike\n          fieldGoalsMade\n          foulsBenchTechnical\n          foulsCoachDisqualifying\n          foulsCoachTechnical\n          foulsDisqualifying\n          foulsOn\n          foulsOffensive\n          foulsPersonal\n          foulsTechnical\n          foulsTechnicalOther\n          assistsTurnoverRatio\n          possessionsOpponent\n          transitionOffence\n          transitionDefence\n          secondChancePointsPercentage\n          reboundsTeam\n          reboundsPersonal\n          possessions\n          fastBreakPointsPercentage\n          pointsInThePaintPercentage\n          score\n          freeThrowsPercentage\n          foulsTotal\n          foulsTeam\n          fieldGoalsPercentage\n          fieldGoalsEffectiveAdjusted\n          defensivePointsPerPossession\n          defensiveRating\n          efficiency\n          offensivePointsPerPossession\n          offensiveRating\n          pace\n          pointsAgainst\n          foulsDrawn\n          foulsTeamTechnical\n          timesTied\n          turnoversTotal\n          assistances\n          blocksFavour\n          blocksAgainst\n          foulsCommited\n          foulsReceived\n          valuation\n          offensiveRebounds\n          defensiveRebounds\n          totalRebounds\n          fouledOut\n          foulsThrowIn\n          headCoachChallengeAccepted\n          headCoachChallengeRejected\n          reboundsDefensiveDeadball\n          reboundsOffensiveDeadball\n          fieldGoals2Made\n          fieldGoals2Attempted\n          fieldGoals2Percentage\n          fieldGoals3Made\n          fieldGoals3Attempted\n          fieldGoals3Percentage\n        }\n      }\n      tmr {\n        assists\n        reboundsTeamDefensive\n        minutes\n        pointsFastBreak\n        points\n        pointsFromTurnovers\n        pointsInThePaint\n        pointsInThePaintAttempted\n        pointsInThePaintMade\n        pointsSecondChance\n        reboundsTeamOffensive\n        freeThrowsMade\n        secondChancePointsAttempted\n        secondChancePointsMade\n        steals\n        timeLeading\n        timesScoresLevel\n        turnovers\n        turnoversTeam\n        leadChanges\n        freeThrowsAttempted\n        assistsDefensive\n        fastBreakPointsMade\n        benchPoints\n        biggestLead\n        biggestLeadScore\n        biggestScoringRun\n        biggestScoringRunScore\n        blocks\n        blocksReceived\n        efficiencyCustom\n        fastBreakPointsAttempted\n        fieldGoalsAttempted\n        foulsUnsportsmanlike\n        fieldGoalsMade\n        foulsBenchTechnical\n        foulsCoachDisqualifying\n        foulsCoachTechnical\n        foulsDisqualifying\n        foulsOn\n        foulsOffensive\n        foulsPersonal\n        foulsTechnical\n        foulsTechnicalOther\n        assistsTurnoverRatio\n        possessionsOpponent\n        transitionOffence\n        transitionDefence\n        secondChancePointsPercentage\n        reboundsTeam\n        reboundsPersonal\n        possessions\n        fastBreakPointsPercentage\n        pointsInThePaintPercentage\n        score\n        freeThrowsPercentage\n        foulsTotal\n        foulsTeam\n        fieldGoalsPercentage\n        fieldGoalsEffectiveAdjusted\n        defensivePointsPerPossession\n        defensiveRating\n        efficiency\n        offensivePointsPerPossession\n        offensiveRating\n        pace\n        pointsAgainst\n        foulsDrawn\n        foulsTeamTechnical\n        timesTied\n        turnoversTotal\n        assistances\n        blocksFavour\n        blocksAgainst\n        foulsCommited\n        foulsReceived\n        valuation\n        offensiveRebounds\n        defensiveRebounds\n        totalRebounds\n        fouledOut\n        foulsThrowIn\n        headCoachChallengeAccepted\n        headCoachChallengeRejected\n        reboundsDefensiveDeadball\n        reboundsOffensiveDeadball\n        fieldGoals2Made\n        fieldGoals2Attempted\n        fieldGoals2Percentage\n        fieldGoals3Made\n        fieldGoals3Attempted\n        fieldGoals3Percentage\n      }\n      players {\n        playerId\n        playerName {\n          name\n          firstName\n          lastName\n        }\n        jerseyNumber\n        court\n        played\n        starter\n      }\n    }\n    created_at\n    updated_at\n    provider\n    leagueId\n    seasonCode\n    seasonType\n    custom_fields\n    gameDateTimeUtc\n    dfepHide\n  }\n}",
      variables: {
        gameId,
        seasonCode,
        seasonType,
        provider,
      },
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
      Error fetching box score: 
      ${(gameId, seasonCode, seasonType, provider)}
      Error:
      `,
      error
    );
  }
};

const saveBoxScore = (boxScore) => {
  try {
    const folderName = `games/${boxScore.homeTeam.teamId} vs ${boxScore.awayTeam.teamId}: ${boxScore.gameDateTimeUtc}/box-scores/QTR-${boxScore.dfepQuarter}`;
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }

    const fileName = `${folderName}/${boxScore.updated_at} | ${boxScore.dfepGameQuarterClock}.json`;
    const data = JSON.stringify(boxScore, null, 2);
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Saved Box Score: ${fileName}`);
      }
    });
  } catch (error) {
    console.error(
      `
      Error saving box score:
      File: "games/${boxScore.homeTeam.teamId} vs ${boxScore.awayTeam.teamId}: ${boxScore.gameDateTimeUtc}/box-scores/QTR-${boxScore.dfepQuarter}/${boxScore.updated_at}.json"
      `,
      { error, boxScore }
    );
  }
};

module.exports = { getBoxScores, saveBoxScore };
