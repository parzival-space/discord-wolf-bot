#!/bin/bash
MODULES=./node_modules
if [ -d "$MODULES" ]; then
    echo "starting..."
    npm start
fi

if [ ! -f "$MODULES" ]; then
    echo "node_modules not found"
    echo "installing modules..."
    npm install
    npm start
fi