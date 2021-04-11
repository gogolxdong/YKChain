#!/usr/bin/env bash
./build/bin/geth \
--datadir /root/.ethereum/ \
--port 30303 \
--mine \
--nousb \
--unlock 0xcd0c087aa41fb181bf78d904a0be1af6da42dbff \
--password password.txt \
--miner.threads=1 \
--allow-insecure-unlock \
--http \
--http.port 8545 \
--http.addr 0.0.0.0 \
--ws \
--ws.port 8546 \
--ws.addr 0.0.0.0 \
--http.api debug,admin,eth,miner,net,personal,txpool,web3,congress \
--ws.api debug,admin,eth,miner,net,personal,txpool,web3,congress
