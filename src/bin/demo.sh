#!/bin/bash

branch=`git status | head -n 1 | awk -F ' ' '{ print $2 }'`;
echo '当前分支：'$branch;
commit_id=`git log | head -n 1 | awk -F ' ' '{ print $2 }'`;
echo 'local commit id: '$commit_id;
git push origin $branch;