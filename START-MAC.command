#!/bin/bash
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed yet. Install the LTS version from https://nodejs.org, then double-click this file again."
  echo
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "First run: installing the app's packages..."
  npm install || exit 1
fi

echo
echo "Starting your fitness dashboard..."
echo "When it is ready, open http://localhost:3000 in your browser."
echo "Leave this window open while you use the app. Press Control-C to stop it."
echo
npm run dev
