#!/bin/bash
# Run this to start the dev server
# Site will be available at http://localhost:5173

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

npm run dev
