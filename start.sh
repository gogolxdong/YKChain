#!/usr/bin/env bash
./build/bin/geth \
--datadir /root/.ethereum/ \
--port 30303 \
--mine \
--nousb \
--unlock 0x2cba6f401df45b113b073f8609985ac47186854d \
--password password.txt \
--miner.threads=1 \
--allow-insecure-unlock \
--bootnodes "enode://bde9c993f41e2a180d48b7551642bfe76465eb132514a2fa9adcd10163b1faca64377d448ddeac0e4fed37c3fd34755a16fa9c38b4ea865e6b57dc4207c971d6@103.215.3.169:30303" \
--syncmode "full" \
--http \
--http.port 8545 \
--http.addr 0.0.0.0 \
--ws \
--ws.port 8546 \
--ws.addr 0.0.0.0 \
--http.api debug,admin,eth,miner,net,personal,txpool,web3,congress \
--ws.api debug,admin,eth,miner,net,personal,txpool,web3,congress
