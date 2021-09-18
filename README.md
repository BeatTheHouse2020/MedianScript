# MedianScript
Median Script For Crash

This was a script developed for the popular gambling game Crash. 

Please test bustabit scripts on:

https://bustabit-sim.rob.social/  or
https://mtihc.github.io/bustabit-script-simulator/

Discord: https://discord.gg/BjqUuGw8mw
YouTube video: 

/* HOW THE SCRIPT WORKS:

  The script will keep count of games below 1.97 and those above 1.97. It will keep an over/under counter on this and call it median.
  For Example if the crash number is 1x, and 1.5x the median becomes -2 as we are two games below the median. If the next crash game is 2.02x then the median becomes -1. 

  When the median hits the "START BET THRESHOLD NUMBER IN THE CONFIG" it will activate its bet. ie if you set it to 12 it would make it -12 for you,
  so it will activate when we are 12 games below the median of 1.97. When this is hit we reset the median count to 0. 

  How does the betting work?

  Betting will begin with your starting bet configured in the config above. A median win counter will begin and when it matches level 1 wins count
  configured in the config the chase will end. If our Level 1 Wins is set to 3 that means we want +3 wins over the losses. So lets say we
  win, lose, win, that means we are only +1 and we need +3 before we wait again for the start bet threshold to hit -12.

  If our median win count hits our bet increase threshold (-8) so we are 8 under for median win count then instead of betting 1 bit we now raise our bet. 
  The reason is our median is now even worse then before and lets bet multiple by 10. 10 bits now instead of 1. Even if we win +1 game we would make
  up the 8 bit lost so far in the chase and profit 2 bits. We will now keep doing this BET until our level 2 wins total is met.

  This goes on for up to 5 tiers. You do not have to have the balance for all 5 tiers but it just gives you more recoup loses. 
  5 Tiers with 1 bit bet you will need a balance of 8 bit loss + 80 bit loss + 800 bit loss + 8000 bit loss + 10,000 for hopefully 1 win to recoup.
  so thats 18,888 bits. You can sim the above settings with 10k and no worries as games do not go that long in the levels.

  Here is a sample log:


------ BETTING NOW INITIATED (Level  1 ) --------
------ LOOKING FOR + 3  WINS         --------
Bust:  1.12  Median:  -11  Balance:  10064.98
LOST! Wins:  -1  Balance:  10064.98
Bust:  2.61  Median:  -10  Balance:  10065.95
WON! Win #:  0
Bust:  12.06  Median:  -9  Balance:  10066.92
WON! Win #:  1
Bust:  1.21  Median:  -10  Balance:  10065.92
LOST! Wins:  0  Balance:  10065.92
Bust:  17.25  Median:  -9  Balance:  10066.89
WON! Win #:  1
Bust:  2.98  Median:  -8  Balance:  10067.86
WON! Win #:  2
Bust:  9.53  Median:  -7  Balance:  10068.83
WON! Win #:  3
------ WE GOT OUR  3  WINS. Resetting Median. -----

What does the Level look like in the logs?

------ BETTING NOW INITIATED (Level  1 ) --------
------ LOOKING FOR + 3  WINS         --------
Bust:  1.64  Median:  -11  Balance:  10104.55
LOST! Wins:  -1  Balance:  10104.55
Bust:  1.94  Median:  -12  Balance:  10103.55
LOST! Wins:  -2  Balance:  10103.55
Bust:  1.56  Median:  -13  Balance:  10102.55
LOST! Wins:  -3  Balance:  10102.55
Bust:  1.14  Median:  -14  Balance:  10101.55
LOST! Wins:  -4  Balance:  10101.55
Bust:  1.01  Median:  -15  Balance:  10100.55
LOST! Wins:  -5  Balance:  10100.55
Bust:  1.08  Median:  -16  Balance:  10099.55
LOST! Wins:  -6  Balance:  10099.55
Bust:  1.62  Median:  -17  Balance:  10098.55
LOST! Wins:  -7  Balance:  10098.55
Bust:  1.39  Median:  -18  Balance:  10097.55
LOST! Wins:  -8  Balance:  10097.55
---------------------------------------------------------------------------
INCREASING BET SIZE BY FACTOR OF  10 .  Entering Level:  2  CurrentBet:  10  Reset Win Count to:  0
---------------------------------------------------------------------------
Bust:  1.01  Median:  -19  Balance:  10087.55
LOST! Wins:  -1  Balance:  10087.55
Bust:  23.05  Median:  -18  Balance:  10097.25
WON! Win #:  0
Bust:  1.41  Median:  -19  Balance:  10087.25
LOST! Wins:  -1  Balance:  10087.25
Bust:  1.36  Median:  -20  Balance:  10077.25
LOST! Wins:  -2  Balance:  10077.25
Bust:  1.46  Median:  -21  Balance:  10067.25
LOST! Wins:  -3  Balance:  10067.25
Bust:  1.01  Median:  -22  Balance:  10057.25
LOST! Wins:  -4  Balance:  10057.25
Bust:  1.62  Median:  -23  Balance:  10047.25
LOST! Wins:  -5  Balance:  10047.25
Bust:  4.59  Median:  -22  Balance:  10056.95
WON! Win #:  -4
Bust:  3.94  Median:  -21  Balance:  10066.65
WON! Win #:  -3
Bust:  1.22  Median:  -22  Balance:  10056.65
LOST! Wins:  -4  Balance:  10056.65
Bust:  8.44  Median:  -21  Balance:  10066.35
WON! Win #:  -3
Bust:  2.86  Median:  -20  Balance:  10076.05
WON! Win #:  -2
Bust:  1.27  Median:  -21  Balance:  10066.05
LOST! Wins:  -3  Balance:  10066.05
Bust:  1.24  Median:  -22  Balance:  10056.05
LOST! Wins:  -4  Balance:  10056.05
Bust:  3.14  Median:  -21  Balance:  10065.75
WON! Win #:  -3
Bust:  27.56  Median:  -20  Balance:  10075.45
WON! Win #:  -2
Bust:  1.97  Median:  -20  Balance:  10085.15
WON! Win #:  -1
Bust:  9.43  Median:  -19  Balance:  10094.85
WON! Win #:  0
Bust:  1.25  Median:  -20  Balance:  10084.85
LOST! Wins:  -1  Balance:  10084.85
Bust:  2.2  Median:  -19  Balance:  10094.55
WON! Win #:  0
Bust:  1  Median:  -20  Balance:  10084.55
LOST! Wins:  -1  Balance:  10084.55
Bust:  1  Median:  -21  Balance:  10074.55
LOST! Wins:  -2  Balance:  10074.55
Bust:  1.7  Median:  -22  Balance:  10064.55
LOST! Wins:  -3  Balance:  10064.55
Bust:  1.6  Median:  -23  Balance:  10054.55
LOST! Wins:  -4  Balance:  10054.55
Bust:  2.12  Median:  -22  Balance:  10064.25
WON! Win #:  -3
Bust:  4.38  Median:  -21  Balance:  10073.95
WON! Win #:  -2
Bust:  1.63  Median:  -22  Balance:  10063.95
LOST! Wins:  -3  Balance:  10063.95
Bust:  1.78  Median:  -23  Balance:  10053.95
LOST! Wins:  -4  Balance:  10053.95
Bust:  1.36  Median:  -24  Balance:  10043.95
LOST! Wins:  -5  Balance:  10043.95
Bust:  1  Median:  -25  Balance:  10033.95
LOST! Wins:  -6  Balance:  10033.95
Bust:  1.11  Median:  -26  Balance:  10023.95
LOST! Wins:  -7  Balance:  10023.95
Bust:  1.03  Median:  -27  Balance:  10013.95
LOST! Wins:  -8  Balance:  10013.95
---------------------------------------------------------------------------
INCREASING BET SIZE BY FACTOR OF  10 .  Entering Level:  3  CurrentBet:  100  Reset Win Count to:  0
---------------------------------------------------------------------------
Bust:  2.53  Median:  -26  Balance:  10110.95
WON! Win #:  1
------ WE GOT OUR  1  WIN. Resetting Median. ------ 
Bust:  8.81  Median:  1  Balance:  10110.95    

                    ^^^ Notice that median is not -27 now. Resets.

*/
