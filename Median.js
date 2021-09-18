var config = {
  
  title: { type: 'noop', label: 'Median - BeatTheHouse2020' },
  startingBet: {value: 100, type: 'balance', label: 'Starting Bet' },
  startBetThreshold : {value: 10, type: 'multiplier', label: 'Start Bet Threshold' },
  betIncreaseThreshold : {value: 8, type: 'multiplier', label: 'Bet Increase Threshold' },
  level1Wins: {value: 3, type: 'multiplier', label: 'Level 1 Wins' },
  level2Wins: {value: 2, type: 'multiplier', label: 'Level 2 Wins' },
  level3Wins: {value: 1, type: 'multiplier', label: 'Level 3 Wins' },
  level4Wins: {value: 1, type: 'multiplier', label: 'Level 4 Wins' },
  level5Wins: {value: 1, type: 'multiplier', label: 'Level 5 Wins' },
  betFactor: {value: 10, type: 'multiplier', label: 'Bet Factor' },
};

log('Script has started.');

let startingBalance = userInfo.balance;
log('Starting Balance: ', startingBalance/100);

let bettingActive = false;
let startingBet = config.startingBet.value;
let currentBet = startingBet;
let stack = [];
let median = 0;
let medianWins = 0;
let startBetThreshold =  config.startBetThreshold.value * -1;
let betIncreaseThreshold = config.betIncreaseThreshold.value * -1;
var betFactor = config.betFactor.value;

var tier2 = startingBet * betFactor;
var tier3 = tier2 * betFactor;
var tier4 = tier3 * betFactor;
var tier5 = tier4 * betFactor;
var currentTier=1;

log('Analyzing Last 50 games.');
let last50 = engine.history.toArray();
for (let game of last50) { 
  updateMedian(game.bust);
}
log('Median initialized to: ', median);
log('Chases will begin at:  ', startBetThreshold);
log('Bet Increase will occur every ', betIncreaseThreshold, ' losses');


engine.on('GAME_STARTING', onGameStarted);
engine.on('GAME_ENDED', onGameEnded);

function updateMedian(bust)
{
  if(bust > 1.97)
  {
    median++;
  }
  else if(bust < 1.97)
  {
    median--;
  }
}

function onGameStarted() 
{
  

  if(median > 80 && !bettingActive)
  {
    median = 0;
    bettingActive = false;
    medianWins = 0;
    currentBet = startingBet;

    engine.removeListener('GAME_STARTING', onGameStarted);
    engine.removeListener('GAME_ENDED', onGameEnded);

    engine.on('GAME_STARTING', onGameStarted);
    engine.on('GAME_ENDED', onGameEnded);
  }

  if(bettingActive)
  {
    engine.bet(currentBet, 1.97);  
  }
  else
  {
    // do nothing.
  }
}

function onGameEnded() {
  var lastGame = engine.history.first()
  
  updateMedian(lastGame.bust);
  log('Bust: ', lastGame.bust, ' Median: ', median, ' Balance: ', userInfo.balance/100);
  
  if(median <= startBetThreshold && !bettingActive)
    {
      log('------ BETTING NOW INITIATED (Level ', currentTier ,  ') --------');
      log('------ LOOKING FOR +', config.level1Wins.value, ' WINS         --------');
      bettingActive = true;  
    }
  

  if (!lastGame.wager) {
      return;
  }
   
  //betting has to be active to reach here.
  if (lastGame.cashedAt) 
  {
      medianWins++;
      log('WON! Win #: ', medianWins);

      if(medianWins == config.level1Wins.value)
      {
        log('------ WE GOT OUR ', config.level1Wins.value,' WINS. Resetting Median. -----');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      else if(currentBet >= tier5 && medianWins == config.level5Wins.value)
      {
        log('------ WE GOT OUR ', config.level5Wins.value,' WIN. Resetting Median. ------ ');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      else if(currentBet >= tier4 && medianWins == config.level4Wins.value)
      {
        log('------ WE GOT OUR ', config.level4Wins.value,' WIN. Resetting Median. ------ ');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      else if(currentBet >= tier3 && medianWins == config.level3Wins.value)
      {
        log('------ WE GOT OUR ', config.level3Wins.value,' WIN. Resetting Median. ------ ');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      else if(currentBet >= tier2 && medianWins == config.level2Wins.value)
      {
        log('------ WE GOT OUR ', config.level2Wins.value, ' WINS. Resetting Median. ------ ');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      
  } 
  else 
  {
      medianWins--;
      log('LOST! Wins: ', medianWins, ' Balance: ', userInfo.balance/100);

      if(medianWins == betIncreaseThreshold)
      {
        currentBet*=betFactor;
        medianWins = 0;
        currentTier++;
        log('---------------------------------------------------------------------------');
        log('INCREASING BET SIZE BY FACTOR OF ', betFactor,'. ', 'Entering Level: ', currentTier, ' CurrentBet: ', currentBet/100,' Reset Win Count to: ', medianWins);
        log('---------------------------------------------------------------------------');
        
      } 


  }  
  
}
