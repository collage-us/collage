#!/bin/bash

# Stop on errors
set -Eeuo pipefail
set -x

python -m venv env

source env/bin/activate

pip install -r requirements.txt
pip install -e .

npm ci .