@echo off
title Setup

start npm install
Timeout /T 5 /Nobreak
start npm i typescript
Timeout /T 5 /Nobreak
start tsc

echo TOKEN = >> .\.env
echo MONGO = >> .\.env
@echo on