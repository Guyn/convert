    
echo "> 01: Base - Create a SCSS file from source with set filename"
node cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/01-base/_test.scss \

echo "> 02: With type - Create a SCSS file from source"
node cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/02-with-type/ \
    --type scss     

                        
echo "> 03: Multi Source - Create a SCSS file from multiple sources"
node cli.js \
    --src test/source/valid \
    --dest tmp/03-multi-source \
    --type scss   

echo "> 04: Multi Sourcel, Multi type - Create a Multiple files from source"
node cli.js \
    --src test/source/valid/source2.json \
    --dest tmp/04-multi-source-type \
    --type scss \
    --type css \
    --type json \
    --type js \
    --type less 

echo "> 05: Create a Multiple files from source"
node cli.js \
    --src test/source/valid \
    --dest tmp/05-multi-type \
    --type scss \
    --type css \
    --type json \
    --type js \
    --type less 

echo "> 06: Multi-source-ext-temp Create a Multiple files from source with external template"
node cli.js \
    --src test/source/valid \
    --dest tmp/06-Multi-source-ext-temp \
    --template templates/colors.css.template

echo "> 07: Create a Multiple files from source with multiple external templates"
node cli.js \
    --src test/source/valid \
    --dest tmp/07-Multi-type-source-ext-temp \
    --template templates/colors.css.template \
    --template templates/colors.scss

echo "> 08: Create a Multiple files from source with multiple external templates"
node cli.js \
    --src test/source/valid \
    --dest tmp/08-multi-template-ext \
    --template templates/colors.css.template \
    --template templates/colors.scss

echo "> 09: Create a files with an alternate filename"
node cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/multi-source-multi-file \
    --template templates/colors.css.template \
    --filename _source_1

echo "> 10: Create a files from multiple destinations with multiple filenames"
node cli.js \
    --src test/source/valid \
    --dest tmp/multi-source-multi-file \
    --template templates/colors.css.template \
    --template templates/colors.scss \
    --filename _source_1 \
    --filename _source_2

echo "> 11: Create a files from multiple destinations with multiple filenames"
node cli.js \
    --src test/source/valid \
    --dest tmp/multi-source-multi-file \
    --template templates/colors.css.template \
    --template templates/colors.scss \
    --filename testfilename

echo "> 12: Create a files from multiple destinations getting auto numbered"
node cli.js \
    --src test/source/valid \
    --dest tmp/multi-source-multi-file \
    --template templates/colors.css.template \
    --template templates/colors.scss
    --filename _source_*


echo "> 13: Multi output"
node cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/13-multi-output/style.scss \
    --output hex \
    --output hsl

echo "> 14: Multi output"
node cli.js \
    --src test/source/valid/ \
    --dest tmp/13-multi-output/style.scss \
    --output hex \
    --output hsl \
    --combine
