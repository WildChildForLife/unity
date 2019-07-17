#!/bin/bash

### Shell script to spin up a docker container for mysql.

## color codes
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
CYAN='\033[1;36m'
PLAIN='\033[0m'

## variables
MYSQL_CONTAINER="mysql_c"
HOST="localhost"
USER="root"
PASSWORD="pass"
PORT=3306
DATABASE="unity"
USER_LOGIN="john-riccitiello@unity.com"
USER_PASSWORD='$2a$10$Dav3ly8nqOnOJ8ZQ51KNZOeJvE.P04lzKUmDVe4xahbVOC9VjW6EO'

## check if docker exists
printf "\n${RED}>> Checking for docker${PLAIN} ${GREEN}...${PLAIN}"
docker -v > /dev/null 2>&1
DOCKER_EXISTS=$?
if [ "$DOCKER_EXISTS" -ne 0 ]; then
    printf "\n\n${CYAN}Status: ${PLAIN}${RED}Docker not found. Terminating setup.${PLAIN}\n\n"
    exit 1
fi

printf "\n${CYAN}Found docker. Moving on with the setup.${PLAIN}\n"

## cleaning up previous builds
printf "\n${RED}>> Finding old builds and cleaning up${PLAIN} ${GREEN}...${PLAIN}"
docker rm -f $MYSQL_CONTAINER > /dev/null 2>&1
printf "\n${CYAN}Clean up complete.${PLAIN}\n"

DOCKER_IMAGE=mysql:5.7.22

## pull latest mysql image
printf "\n${RED}>> Pulling ${DOCKER_IMAGE} image${PLAIN} ${GREEN}...${PLAIN}"

docker pull ${DOCKER_IMAGE} > /dev/null 2>&1
printf "\n${CYAN}Image successfully built.${PLAIN}\n"

## run the mysql container
printf "\n${RED}>> Starting the mysql container${PLAIN} ${GREEN}...${PLAIN}"
CONTAINER_STATUS=$(docker run --name $MYSQL_CONTAINER -e MYSQL_ROOT_USER=$USER -e MYSQL_ROOT_PASSWORD=$PASSWORD -p $PORT:3306 -d ${DOCKER_IMAGE} 2>&1)
if [[ "$CONTAINER_STATUS" == *"Error"* ]]; then
    printf "\n\n${CYAN}Status: ${PLAIN}${RED}Error starting container. Terminating setup.${PLAIN}\n\n"
    exit 1
fi

docker cp ./database/mysql-credentials.cnf $MYSQL_CONTAINER:/home/

while ! docker exec mysql_c mysql --user='root' --password='pass' -e "SELECT 1" >/dev/null 2>&1; do
    sleep 1
done
printf "\n${CYAN}Container is up and running.${PLAIN}\n"


## create the database
printf "\n${RED}>> Creating the database${PLAIN} ${GREEN}...${PLAIN}"

SQL_REQUEST="mysql --defaults-extra-file=/home/mysql-credentials.cnf -e 'DROP DATABASE IF EXISTS $DATABASE'"
docker exec -it $MYSQL_CONTAINER /bin/sh -c "$SQL_REQUEST" > /dev/null 2>&1

SQL_REQUEST="mysql --defaults-extra-file=/home/mysql-credentials.cnf -e 'CREATE DATABASE $DATABASE'"
docker exec -it $MYSQL_CONTAINER /bin/sh -c "$SQL_REQUEST" > /dev/null 2>&1

DATABASE_CREATED=$?
if [ "$DATABASE_CREATED" -ne 0 ]; then
    printf "\n\n${CYAN}Status: ${PLAIN}${RED}Database could not be created. Terminating setup.${PLAIN}\n\n"
    exit 1
fi
printf "\n${CYAN}Successfully created the database.${PLAIN}\n"

## creating the required tables (Schema)
printf "\n${RED}>> Creating the tables${PLAIN} ${GREEN}...${PLAIN}"
npm run migrate -- --rebuild
printf "\n${CYAN}Successfully created the tables.${PLAIN}\n"

## create the default User
printf "\n${RED}>> Creating the user${PLAIN} ${GREEN}...${PLAIN}"

SQL_REQUEST="mysql --defaults-extra-file=/home/mysql-credentials.cnf -e 'USE $DATABASE; INSERT INTO User VALUES(\"John Riccitiello\", \"$USER_LOGIN\", \"$USER_PASSWORD\", \"John\", \"Riccitiello\");'"
docker exec -it $MYSQL_CONTAINER /bin/sh -c "$SQL_REQUEST"
USER_CREATED=$?
if [ "$USER_CREATED" -ne 0 ]; then
    printf "\n\n${CYAN}Status: ${PLAIN}${RED}User could not be created. Terminating setup.${PLAIN}\n\n"
    exit 1
fi
printf "\n${CYAN}Successfully created the Default User.${PLAIN}\n"

## set env variables for running test
printf "\n${RED}>> Setting env variables to run test${PLAIN} ${GREEN}...${PLAIN}"
export MYSQL_HOST=$HOST
export MYSQL_PORT=$PORT
export MYSQL_USER=$USER
export MYSQL_PASSWORD=$PASSWORD
export MYSQL_DATABASE=$DATABASE
printf "\n${CYAN}Env variables set.${PLAIN}\n"

printf "\n${CYAN}Status: ${PLAIN}${GREEN}Set up completed successfully.${PLAIN}\n"
printf "\n${CYAN}Instance url: ${YELLOW}mysql://$USER:$PASSWORD@$HOST/$DATABASE${PLAIN}\n"

printf "\n${CYAN}User Login: ${YELLOW}john-riccitiello@unity.com${PLAIN}\n"
printf "\n${CYAN}User Password: ${YELLOW}very-secured-password${PLAIN}\n"