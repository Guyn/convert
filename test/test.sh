    
echo "> 01: Create a SCSS file from source"
node cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/single-source-scss \
    --type scss     

echo "> 02: Create a Multiple files from source"
node cli.js \
    --src test/source/valid/source2.json \
    --dest tmp/single-source-multi-file \
    --type scss \
    --type css \
    --type json \
    --type js \
    --type less 
      
echo "> 03: Create a SCSS file from multiple sources"
node cli.js \
    --src test/source/valid \
    --dest tmp/single-source-multi-file \
    --type scss     

echo "> 04: Create a Multiple files from source"
node cli.js \
    --src test/source/valid \
    --dest tmp/multi-source-multi-file \
    --type scss \
    --type css \
    --type json \
    --type js \
    --type less 