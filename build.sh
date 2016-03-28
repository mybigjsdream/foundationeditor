rm -rf ./build && meteor build ./build --directory && cd ./build/bundle/programs/server && npm install
cd ../../../../
mv ./build/bundle /var/www/blog
cp ./ecosystem.json /var/www/blog/
pm2 start ecosystem.json
