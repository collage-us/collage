#!/bin/bash

# Stop on errors
set -Eeuo pipefail
set -x

npm run build &
flask --app collage --debug run --host 0.0.0.0 --port 8001