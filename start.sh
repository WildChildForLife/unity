#!/bin/bash


## color codes
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
CYAN='\033[1;36m'
PLAIN='\033[0m'


printf "\n${YELLOW}>> Checking if no process is running on ports 3000 & 7000${PLAIN} ${GREEN}...${PLAIN}\n"

if lsof -Pi :7000 -sTCP:LISTEN -t >/dev/null ; then
    read -e -p $'\e[31mA process is using the port 7000, can I kill it ? [Y/N]\e[0m: ' YN
    [[ $YN == "y" || $YN == "Y" || $YN == "" ]] && kill -9 $(lsof -t -i:7000 -sTCP:LISTEN)
    [[ $YN == "n" || $YN == "N" ]] && { printf "\n${RED}>> Aborted !${PLAIN}\n" ; exit 1; }
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    read -e -p $'\e[31mA process is using the port 3000, can I kill it ? [Y/N]\e[0m: ' YN
    [[ $YN == "y" || $YN == "Y" || $YN == "" ]] && kill -9 $(lsof -t -i:3000 -sTCP:LISTEN)
    [[ $YN == "n" || $YN == "N" ]] && { printf "\n${RED}>> Aborted !${PLAIN}\n" ; exit 1; }
fi

printf "\n${GREEN}>> Starting the requested Servers${PLAIN} ${RED}...${PLAIN}\n"
(npm start --prefix ./server/ > ./logs/server.log & npm start --prefix ./middleware-ui/ > ./logs/middleware-ui.log) & sleep 5
RESULT=$?
if [ $RESULT -eq 0 ]; then
    printf "\n${GREEN}>> Servers started succefully !!${PLAIN} ${RED}...${PLAIN}\n"
    printf "\n${CYAN}>> THE SERVER API UP ON URL : ${PLAIN} ${YELLOW} http://127.0.0.1:3000/ ${PLAIN}\n"
    printf "\n${CYAN}>> THE CLIENT IS UP ON URL : ${PLAIN} ${YELLOW} http://127.0.0.1:7000/ ${PLAIN}\n"
    printf "\n${GREEN}>> Enjoy !${PLAIN}\n"
else
    printf "\n${RED}>> Oops something went wrong. Please write me at youssef.elgharbaoui@gmail.com and ill exterminate the bug :)${PLAIN} ${GREEN}...${PLAIN}\n"
fi