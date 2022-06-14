uses etherscan to gather txhashes 
uses web3.js to gather transaction data from txhashes

TOFIX: 
    - if there is more than one nft minted at a time, the logic gets dicey, multiple identical txhashes in the csv file
    - how to track nft id from etherscan? web3.js?
      - oh my fucking god og https://stackoverflow.com/questions/48004356/get-token-transfer-detail-from-transaction-hash-with-web3j

    -  we need: token id
       -  so here's the plan:
          -  we are given the hash, to, from, and value
          -  we take the to (aka the contract)
          - query the to's transactions, match it with our address, and get the tokenid from there
    - now that we have the tokenid, we can maintain a hashmap(?) of ongoing/dealt transactions, in which the tokens you have sold get popped from the hashmap and your PnL gets added to your cum balance, and the tokens which you own (or are staking (which you can determine through if the value of the transaction is 0))

    # TODO - staking
    - actually on the topic of staking, if the nft is staked we can prove that
        - to flip, you must UnStake it
    - so if we see a zero value transaction, we can ignore it

    - collision? what if an nft is sold for zero? how can we determine if it wasn't staked and was simply just given away?


    <!-- - what happens when you buy an nft, sell it, and then buy it again?
      - 3 txns
      - sort the buy and sells in order of date -->


    <!-- # TODO - fix the bug where when minting more than one token, the value is duplicated across all tokens -->

    # TODO - test sorting algorithm

    # TODO - so, big oopsie, tokenID is actually a horrible key for the json object because collisions can occur between contracts,,,, soo,,,,, we need to probably make the json object be based off of txhashes instead,,, which,,, complicates everything. big todo

    - ok so, to get a full picture of how much profit one walked away with, we need
      - whenever they took out eth (secured profit)


    - perhaps the next thing to do would be to make another json object based off of the nft itself which holds
      - collection
      - id
      - profit/loss from flips
      - ${some data that allows us to get the picture of the nft}


    - !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    - HUGE TODO: SANITIZE USER INPUT => IT'S GOING INTO A BASH SCRIPT
    - !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  