#!/bin/bash

# Stop on errors
set -Eeuo pipefail
set -x

python3.12 -m venv env

source env/bin/activate

pip install -r requirements.txt
pip install -e .

npm ci .