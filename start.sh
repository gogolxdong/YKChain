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
--bootnodes "enode://c1b6e4026bb20c08792c5ce151c247d935fa93b8238653d60036bcad4ff9d4b5a92505ae7856a393aeb3744b248698b1cb7194e1de1179a2d0fd16b862b64ef6@119.8.110.221:30303" \
--http \
--http.port 8545 \
--http.addr 0.0.0.0 \
--ws \
--ws.port 8546 \
--ws.addr 0.0.0.0 \
--http.api debug,admin,eth,miner,net,personal,txpool,web3,congress \
--ws.api debug,admin,eth,miner,net,personal,txpool,web3,congress
