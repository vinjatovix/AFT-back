#!/bin/bash

# Command line arguments
ENV_DUMP=$1
PASSWORD=$2

# Required variables
DOCKER_NAME=mongodb_mongoaft_1
DUMP_USER=aft
DUMP_DB=aft
RESTORE_HOST=localhost
RESTORE_PORT=27017
RESTORE_USER=aft
RESTORE_PASSWORD=localPassword



# Enables error propagation
set -e

print() {
  printf "\n\n\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #\n%s\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #\n\n\n" "$1"
}

if [[ $ENV_DUMP == "PRO" && $PASSWORD ]]; then
  HOST=cluster0.cmeym.mongodb.net
  URI=mongodb+srv://$DUMP_USER:$PASSWORD@$HOST/$DUMP_DB
else
  printf "\nEnvironment and password are required"
  printf "\n\nUsage: npm run restoreDB [ENVIRONMENT] [PASSWORD]"
  printf "\n  ENVIROMENT: PRO."
  printf "\n  PASSWORD: password of the chosen environment."
  printf '\n\nExample: npm run restoreDB DES "SDGFAOSD324"'
  exit 1
fi


docker exec -it "$DOCKER_NAME" mongodump --uri "$URI" --out "/data/dump/$ENV_DUMP"
print "                 $ENV_DUMP dump completed"
sleep 1

#docker exec -it "$DOCKER_NAME" mongorestore --host "$RESTORE_HOST" --port "$RESTORE_PORT" --username "$RESTORE_USER" --password "$RESTORE_PASSWORD" --drop "/data/dump/$ENV_DUMP"
print "                 $ENV_DUMP restore completed"

exit 0
