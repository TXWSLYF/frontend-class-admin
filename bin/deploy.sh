#!/usr/bin/env bash

ssh root@39.106.67.231 "export PATH=/root/.nvm/versions/node/v10.15.3/bin:/usr/bin:/bin:/usr/local/git/bin;cd /root/frontend-class-admin;git pull;yarn;npm run build"
