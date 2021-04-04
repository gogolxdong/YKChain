#!/usr/bin/env bash
nohup ./build/bin/geth \
--datadir /root/.ethereum/ \
--port 30303 \
--mine \
--nousb \
--unlock 0xbAF7b2587801556C48FbFf2a50dED9399C048250 \
--password password.txt \
--miner.threads=1 \
--allow-insecure-unlock \
--http \
--http.port 8546 \
--http.addr 0.0.0.0 \
--ws \
--ws.port 8546 \
--ws.addr 0.0.0.0 \
--http.api debug,admin,eth,miner,net,personal,txpool,web3,congress \
--ws.api debug,admin,eth,miner,net,personal,txpool,web3,congress &
