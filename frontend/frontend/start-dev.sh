#!/bin/bash

# This script passes system environment variables to Vite
source ~/.zshrc

# Pass the environment variables to the Vite dev server
VITE_SUPABASE_URL=$SUPABASEURLZR \
VITE_SUPABASE_API_KEY=$SUPABASEAPIKEYZR \
npm run dev