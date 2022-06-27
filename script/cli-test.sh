#!/bin/bash
rm -rf report/shell-tests
mkdir -p report/shell-tests
yarn cli generate -cd report/shell-tests -f lib -ga 'flarebyte' -ch 'Flarebyte.com' -cy 2018 -l BSD3
(ls report/shell-tests/Makefile && echo "✅ OK Makefile") || echo "❌ KO Makefile"
(ls report/shell-tests/.editorconfig && echo "✅ OK .editorconfig") || echo "❌ KO .editorconfig"
(ls report/shell-tests/.gitignore && echo "✅ OK .gitignore") || echo "❌ KO .gitignore"
(ls report/shell-tests/LICENSE && echo "✅ OK LICENSE") || echo "❌ KO LICENSE"
(ls report/shell-tests/README.md && echo "✅ OK README.md") || echo "❌ KO README.md"
(ls report/shell-tests/MAINTENANCE.md && echo "✅ OK MAINTENANCE.md") || echo "❌ KO MAINTENANCE.md"