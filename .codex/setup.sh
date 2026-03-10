#!/bin/bash

echo "Setting up project..."

cd client
rm -f package-lock.json
npm install

cd ../server
npm install

echo "Setup complete"