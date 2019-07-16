#!/bin/bash


## color codes
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
CYAN='\033[1;36m'
PLAIN='\033[0m'


printf "\n${RED}>> Preinstalling the Server Application${PLAIN} ${GREEN}...${PLAIN}\n"
cd ./server
npm install
cd ../
printf "\n${RED}>> Preinstalling the Middleware & UI Application${PLAIN} ${GREEN}...${PLAIN}\n"
cd ./middleware-ui
npm install
cd ../
printf "\n${RED}>> Initializing Database docker${PLAIN} ${GREEN}...${PLAIN}\n"
cd ./server
npm run docker:start:database
cd ..