#!/bin/bash

TOKEN="ef2e52049f8e6f23a63975c4f3957660"
USER_ID="13"

BASE_URL="http://tic-tac-toe.wdibos.com"
URL="${BASE_URL}/sign-out/${USER_ID}"

curl ${URL}\
--include \
--request DELETE \
--header "Authorization: Token token=${TOKEN}"

# data output from curl doesn't have a trailing newline
echo
