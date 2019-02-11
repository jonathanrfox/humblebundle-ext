#!/bin/bash
echo $(printenv)
nvm install
npm ci
npm ci --dev
npm run test
npm run package
