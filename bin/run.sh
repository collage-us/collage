#!/bin/bash

# Stop on errors
set -Eeuo pipefail
set -x

npx webpack --watch &
flask --app collage --debug run --host 0.0.0.0 --port 8001