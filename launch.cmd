@echo off
title Starting...

:launch

if exist "node_modules" (
    npm start
) else (
    echo node_modules is missing!
    echo installing modules...
    npm install
    CLS
    goto launch
)