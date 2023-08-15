#!/bin/bash

echo "Setup"

npm install &
wait $!

sleep 50

npm install -g typescript &
wait $!

sleep 10

tsc &

echo "TOKEN =" >> .env
echo "MONGO =" >> .env

exit 0
