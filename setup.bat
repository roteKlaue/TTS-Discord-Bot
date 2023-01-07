@echo off
title Setup

start npm install
Timeout /T 50 /Nobreak
start npm i -g typescript
Timeout /T 10 /Nobreak
start tsc

echo TOKEN = >> .\.env
echo MONGO = >> .\.env
@echo on