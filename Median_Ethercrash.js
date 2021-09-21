var configStartingBet = 1;   // starting bet 1 ethos
var configStartBetThreshold = 4;  //Start at 10 under the median of 1.97
var configBetIncreaseThreshold=8; //how many losses before we go to the next level of betting
var configBetFactor=10; //multiplier for going to next level of bet increase

var configLevel1Wins=3;  //how many +wins at this level before script ends
var configLevel2Wins=2;
var configLevel3Wins=1;
var configLevel4Wins=1;
var configLevel5Wins=1;

console.log('Median Script has started.');

let startingBalance = engine.getBalance();
console.log('Starting Balance: ', startingBalance/100);

let bettingActive = false;
let startingBet = configStartingBet * 100;
let currentBet = startingBet;
let stack = [];
let median = 0;
let medianWins = 0;
let startBetThreshold =  configStartBetThreshold * -1;
let betIncreaseThreshold = configBetIncreaseThreshold * -1;
var betFactor = configBetFactor;

var tier2 = startingBet * betFactor;
var tier3 = tier2 * betFactor;
var tier4 = tier3 * betFactor;
var tier5 = tier4 * betFactor;
var currentTier=1;

console.log('Chases will begin at:  ', startBetThreshold);
console.log('Bet Increase will occur every ', betIncreaseThreshold, ' losses');


engine.on('game_starting', function(info) {

  if(median > 80 && !bettingActive)
  {
    median = 40;
    bettingActive = false;
    medianWins = 0;
    currentBet = startingBet;
    currentTier=1;
  }

  if(bettingActive)
  {
    engine.placeBet(roundBit(currentBet), 197);
  }
  else
  {
    // do nothing.
  }
});


engine.on('game_crash', function(data) {

  var balance = engine.getBalance()/100;    
  var wagered = engine.lastGamePlayed();
  var bust = data.game_crash/100;
  var won = engine.lastGamePlay() == "WON";
  
  updateMedian(bust);

  console.log('Bust: ', bust, ' Median: ', median, ' Balance: ', engine.getBalance()/100);
  
  if(median <= startBetThreshold && !bettingActive)
  {
      console.log('------ BETTING NOW INITIATED (Level ', currentTier ,  ') --------');
      console.log('------ LOOKING FOR +', configLevel1Wins, ' WINS         --------');
      bettingActive = true;  
  }
  

  if (!wagered) 
  {
      return;
  }
   
  //betting has to be active to reach here.
  if (won) 
  {
      medianWins++;
      console.log('WON! Win #: ', medianWins, ' Balance: ', engine.getBalance()/100);

      if(medianWins == configLevel1Wins)
      {
        console.log('------ WE GOT OUR ', configLevel1Wins,' WINS. Resetting Median. -----');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      else if(currentBet >= tier5 && medianWins == configLevel5Wins)
      {
        console.log('------ WE GOT OUR ', configLevel5Wins,' WIN. Resetting Median. ------ ');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      else if(currentBet >= tier4 && medianWins == configLevel4Wins)
      {
        console.log('------ WE GOT OUR ', configLevel4Wins,' WIN. Resetting Median. ------ ');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      else if(currentBet >= tier3 && medianWins == configLevel3Wins)
      {
        console.log('------ WE GOT OUR ', configLevel3Wins,' WIN. Resetting Median. ------ ');
        median = 0;
        bettingActive = false;
        medianWins = 0;
        currentBet = startingBet;
        currentTier=1;
      }
      else if(currentBet >= tier2 && medianWins == configLevel2Wins)
      {
        console.log('------ WE GOT OUR ', configLevel2Wins, ' WINS. Resetting Median. ------ ');
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
      console.log('LOST! Wins: ', medianWins, ' Balance: ', engine.getBalance()/100);

      if(medianWins == betIncreaseThreshold)
      {
        currentBet*=betFactor;
        medianWins = 0;
        currentTier++;
        console.log('---------------------------------------------------------------------------');
        console.log('INCREASING BET SIZE BY FACTOR OF ', betFactor,'. ', 'Entering Level: ', currentTier, ' CurrentBet: ', currentBet/100,' Reset Win Count to: ', medianWins);
        console.log('---------------------------------------------------------------------------');
        
      } 


  }  

  

});



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

function onGameEnded() {
  var lastGame = engine.history.first()
  
  
  
}
