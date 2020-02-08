#!/bin/bash

# Starts up the server. If the environment variable PROD is 1, then build for production

yarn install --ignore-optional

if [[ ${PROD} ]]; then
  echo "Building for Production"
  yarn build
  echo "Beginning server spin-up"
  yarn start
else
  yarn run dev
fi

