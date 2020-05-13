    
echo "> 01: Procreate - Test conversion to ProCreate type swatches"
node dist/cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/01-procreate/Test.swatches \
    --title GuynTest \
    --type procreate \
