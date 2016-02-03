#!/bin/bash

TOKEN="b837511704686a9d01c3b51b15174d2e"
USER_ID="13"
OLD_PW="123"
NEW_PW="abc123"

BASE_URL="http://tic-tac-toe.wdibos.com"
URL="${BASE_URL}/sign-out/${USER_ID}"

url() {

    CONTENT_TYPE="application/json"

    curl ${URL}\
    --include \
    --request PATCH \
    --header "Authorization: Token token=${TOKEN}" \
    --data-urlencode "password[old]=${OLD_PW}" \
    --data-urlencode "password[new]=${NEW_PW}"
}

echo
