import firebase from "../api/firebase.js";

export async function getStats(players) {
  let playerList = [...players];
  const stats = firebase.functions().httpsCallable("fetch");
  //try to fetch player stats from api
  for (let i = 0; i < playerList.length; i++) {
    let currPlayer = playerList[i];
    //if stats is already defined, skip current player
    if (currPlayer.stats.data !== undefined) {
      continue;
    }
    let result = await stats({ name: currPlayer.name, platform: currPlayer.platform });
    if (result.data !== false) {
      currPlayer.stats = result.data;
    } else {
      currPlayer.valid = false;
    }
  }
  return playerList;
}
