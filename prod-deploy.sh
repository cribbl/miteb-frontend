#!/bin/bash
set -x
# Initialize a new git repo in _site, and push it to our server.
ls
mv deploy-keys build
cd build

cat static/js/*.js