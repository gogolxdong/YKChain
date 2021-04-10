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
--bootnodes "enode://0436ed3eb528a94e81cb1718612db80fdfe3164cc1820be2e7e4ab083f354c2392f6b33224f6ef5b0c96a7eeeb52c54f3a8a4a7dd9f3b6e975ad450b5d6c24b4@103.215.3.169:30303" \
--http \
--http.port 8545 \
--http.addr 0.0.0.0 \
--ws \
--ws.port 8546 \
--ws.addr 0.0.0.0 \
--http.api debug,admin,eth,miner,net,personal,txpool,web3,congress \
--ws.api debug,admin,eth,miner,net,personal,txpool,web3,congress
