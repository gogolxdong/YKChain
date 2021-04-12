#!/usr/bin/env bash
./build/bin/geth \
--datadir /root/.ethereum/ \
--port 32760 \
--mine \
--nousb \
--unlock 0xcd0c087aa41fb181bf78d904a0be1af6da42dbff \
--password password.txt \
--allow-insecure-unlock \
--miner.threads=1 \
--syncmode "full" \
--http \
--http.port 1113 \
--http.addr 0.0.0.0 \
--ws \
--ws.port 1114 \
--ws.addr 0.0.0.0 \
--http.api debug,admin,eth,miner,net,personal,txpool,web3 \
--ws.api debug,admin,eth,miner,net,personal,txpool,web3
