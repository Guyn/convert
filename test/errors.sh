    
echo "> 01: Error; type and template specified"
node cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/single-source-scss \
    --type scss \
    --template something
    
echo "> 02: Error; no type or template specified"
node cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/single-source-scss 

    
echo "> 03: Error; Invalid source, depth"
node cli.js \
    --src test/source/invalid/source1.json \
    --dest tmp/single-source-scss \
    --type scss 

    
echo "> 04: Error; Invalid source, types"
node cli.js \
    --src test/source/invalid/source2.json \
    --dest tmp/single-source-scss \
    --type scss 

    
echo "> 05: Error; Invalid source"
node cli.js \
    --src test/source/invalid/source3.txt \
    --dest tmp/single-source-scss \
    --type scss 

    
echo "> 06: Error; Source has invalid hex value"
node cli.js \
    --src test/source/invalid/source4.json \
    --dest tmp/single-source-scss \
    --type scss 

echo "> 06: Error; Source has invalid hex value"
node cli.js \
    --src test/source/invalid/source4.json \
    --dest tmp/single-source-scss/test.sql \
