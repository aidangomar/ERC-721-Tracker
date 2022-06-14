### NOTE: THIS USES ZSH, MAKE SURE CONTAINER IS USING ZSH OVER BASH ###
#!/bin/zsh
cd "$(dirname "$0")"
OUTPUT=$(python3 getTokenID.py $1)
node addTxsToJSON.js
