const { getGameSchedules, saveGameSchedule } = require("./gameSchedules");
const { getBoxScores, saveBoxScore } = require("./boxScores");
const { getGameLeaders, saveGameLeader } = require("./gameLeaders");

const interval = parseInt(process.env.INTERVAL) || 20000;

const intervalId = setInterval(() => {
  console.log("Polling");
  getGameSchedules().then((data) => {
    const schedules = data?.data?.game_schedules;
    if (!schedules) {
      console.log(JSON.stringify(data, null, 2));
      return;
    }
    schedules.forEach((schedule) => {
      if (schedule.gameStatus === "Finished") {
        clearInterval(intervalId);
      } else {
        saveGameSchedule(schedule);
        getBoxScores({
          gameId: schedule.gameId,
          seasonCode: schedule.seasonCode,
          seasonType: schedule.seasonType,
          provider: schedule.provider,
        }).then((data) => {
          const boxScore = data.data.boxscore;
          saveBoxScore(boxScore);
          getGameLeaders({
            gameId: schedule.gameId,
            seasonCode: schedule.seasonCode,
            seasonType: schedule.seasonType,
            provider: schedule.provider,
          }).then((data) => {
            const gameLeaders = data.data.game_leaders;
            gameLeaders.forEach((gameLeader) => {
              saveGameLeader(boxScore, gameLeader);
            });
          });
        });
      }
    });
  });
}, interval);
