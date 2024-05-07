#!/bin/bash

# Stop on errors
set -Eeuo pipefail
set -x

brew update

# make sure you already downloaded python 3.12
brew update python@3.12

python3.12 -m venv env

source env/bin/activate

pip install -r requirements.txt

npm ci .