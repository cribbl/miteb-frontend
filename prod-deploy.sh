#!/bin/bash
set -x
# Initialize a new git repo in _site, and push it to our server.
npm run build:prod
ls
mv deploy-keys build
cd build
git init
chmod 600 deploy-keys

eval `ssh-agent -s`
ssh-add deploy-keys
mkdir .ssh
touch ~/.ssh/known_hosts
ssh-keyscan -H 139.59.40.206 >> ~/.ssh/known_hosts

git remote add deploy "deploy@139.59.40.206:/var/www/prod"
git config user.name "bhawesh96"
git config user.email "bhansalibhawesh@yahoo.com"

git add .
git commit -m "Deploy"
git push --force deploy master
rm deploy-keys