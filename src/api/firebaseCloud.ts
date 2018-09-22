import * as functions from "firebase-functions";
import Fetch from "node-fetch";
const url = "https://api.fortnitetracker.com/v1";
const key = "API_KEY_HERE";
const header = { headers: { "TRN-Api-Key": key } };

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const cleanLifetime = function(data) {
  const lifetimeStats = [...data.lifeTimeStats];
  const cleanedLifetime = {
    top5: "",
    top3: "",
    top6: "",
    top10: "",
    top12: "",
    top25: "",
    score: "",
    matches: "",
    wins: "",
    winRatio: "",
    kills: "",
    kd: ""
  };
  cleanedLifetime.top5 = lifetimeStats[0].value;
  cleanedLifetime.top3 = lifetimeStats[1].value;
  cleanedLifetime.top6 = lifetimeStats[2].value;
  cleanedLifetime.top10 = lifetimeStats[3].value;
  cleanedLifetime.top12 = lifetimeStats[4].value;
  cleanedLifetime.top25 = lifetimeStats[5].value;
  cleanedLifetime.score = lifetimeStats[6].value;
  cleanedLifetime.matches = lifetimeStats[7].value;
  cleanedLifetime.wins = lifetimeStats[8].value;
  cleanedLifetime.winRatio = lifetimeStats[9].value.slice(0,2);
  cleanedLifetime.kills = lifetimeStats[10].value;
  cleanedLifetime.kd = lifetimeStats[11].value;

  return cleanedLifetime;
};

const cleanStats = function(data) {
  const stats = { ...data.stats };
  const modeMap = {
    p2: "solo",
    p9: "squad",
    p10: "duo",
    curr_p2: "curSolo",
    curr_p9: "curSquad",
    curr_p10: "curDuo"
  };
  for (const mode in stats) {
    const label = modeMap[mode];
    stats[label] = stats[mode];
    delete stats[mode];
    for(const prop in stats[label]) {
      stats[label][prop] = stats[label][prop].value;
    }
    const winRat = Number(stats[label].winRatio)/100;
    const totMatches = stats[label].matches;
    stats[label].wins = Math.round(totMatches * winRat);
  }
  return stats;
};

const cleanData = function(data) {
  const cleanedDat = { ...data };
  delete cleanedDat.platformId;
  delete cleanedDat.platformNameLong;
  const cleanedLifetime = cleanLifetime(cleanedDat);
  cleanedDat.lifeTimeStats = cleanedLifetime;

  const cleanedStats = cleanStats(cleanedDat);
  cleanedDat.stats = cleanedStats;

  return cleanedDat;
};

export const fetch = functions.https.onCall(async data => {
  try {
    const username = encodeURI(data.name);
    const platform = data.platform;
    const result = await Fetch(
      `${url}/profile/${platform}/${username}`,
      header
    );
    let stats = await result.json();
    stats = cleanData(stats);
    return stats;
  } catch (err) {
    console.log(err);
    return false;
  }
});
