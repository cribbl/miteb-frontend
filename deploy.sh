#!/bin/bash
set -x
# Initialize a new git repo in _site, and push it to our server.

if [ "$TRAVIS_BRANCH" = "prod" ]; then server_ip=$PROD_SERVER_IP; folder=production; fi
if [ "$TRAVIS_BRANCH" = "master" ]; then server_ip=$STAGING_SERVER_IP; folder=staging; fi

ls
mv deploy-key build
cd build
git init
chmod 600 deploy-key

eval `ssh-agent -s`
ssh-add deploy-key
mkdir .ssh
touch ~/.ssh/known_hosts
ssh-keyscan -H $server_ip >> ~/.ssh/known_hosts

git remote add deploy "deploy@$server_ip:/var/www/$folder"
git config user.name "bhawesh96"
git config user.email "bhansalibhawesh@yahoo.com"

git add .
git commit -m "Deploy"
git push --force deploy master
rm deploy-key