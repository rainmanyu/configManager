# 借鉴自(pixle-vue-admin)

用于简单的集成管理


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



### Deploy
```
1. compile for production
npm run build
2. node config_index.js
the deploy directory is dist
nohup node config_index.js &

URL:
ip:8889
```

//configuration
conf/config.js

server sites
http://10.2.47.17:9888


10.3.240.11(ts-manager rainman)
/rainman
git clone -b main https://github.com/rainmanyu/configManager.git
git pull
enter /rainman/configManager
yum install nodejs -y
npm install
npm run build
-- build for production

[//]: # (nohup node config_index.js &)
rm -rf /ts-manager/norway_sites;cp -R dist /ts-manager/norway_sites
enter /ts-manager
nohup node index.js &



