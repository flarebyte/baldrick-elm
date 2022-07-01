#!/bin/bash
rm -rf report/shell-tests
mkdir -p report/shell-tests
yarn cli generate -cd report/shell-tests -f lib -ga 'flarebyte' -ch 'Flarebyte.com' -cy 2018 -l BSD3
cd report/shell-tests
make whisker-norm
cd ../..
LINES=$(cat script/cli-test-expect.txt)
for LINE in $LINES
do
    (ls "report/shell-tests/$LINE" && echo "✅ OK $LINE") || echo "❌ KO $LINE"
done