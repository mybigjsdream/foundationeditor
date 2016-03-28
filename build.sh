rm -rf ./build && meteor build ./build --directory && cd ./build/bundle/programs/server && npm install
cd ../../../../
rm -rf /var/www/blog
mv ./build/bundle /var/www/blog
cp ./ecosystem.json /var/www/blog/
cd /var/www/blog
pm2 delete blog
pm2 start ecosystem.json
