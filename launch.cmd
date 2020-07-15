@echo off
title Starting...

:launch

if exist "node_modules" (
    node .
) else (
    echo node_modules is missing!
    echo installing modules...
    npm i
    CLS
    goto launch
)