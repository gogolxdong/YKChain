# 多节点部署

* 数据目录使用/root/.ethereum/，运行时若提示有不兼容区块，检查并清理已有的区块信息，rm -rf /root/.ethereum/; 这也是以太坊的数据目录，注意检查
多节点部署

1. 创建账号，build/bin/geth account new，输入密码，密码写入password.txt, 生成的地址替换--unlock选项，如下

```sh
#!/usr/bin/env bash
./build/bin/geth \
--datadir /root/.ethereum/ \
--port 30303 \
--mine \
--nousb \
--unlock 0x2334a96f67b6c8906954a7b56333271e142db36d \
--password password.txt \
--miner.threads=1 \
--allow-insecure-unlock \
--bootnodes "enode://955ff98444a5ec9ac9c02470652054820fe236064c3616b2e24012aa0a2729fbebfd1e8ce997280cc3e9c62214aab9981a2d51afa3e0cebc292a26b2368d7f6a@103.215.3.169:30303" \
--syncmode "full" \
--http \
--http.port 8546 \
--http.addr 0.0.0.0 \
--ws \
--ws.port 8546 \
--ws.addr 0.0.0.0 \
--http.api debug,admin,eth,miner,net,personal,txpool,web3,congress \
--ws.api debug,admin,eth,miner,net,personal,txpool,web3,congress
```

2. 创建创世区块配置文件
    
    修改创世文件genesis.json, 设置区块参数

    chainId 链的唯一性标识；

    homesteadBlock eip150Block eip150Hash eip155Block eip158Block byzantiumBlock constantinopleBlock petersburgBlock istanbulBlock muirGlacierBlock 硬分叉高度配置；

    congress 共识参数配置。 period为出块间隔，epoch为一个周期设定，单位是block，每个epoch结束的时候，会对验证人进行相应调整；

    number gasUsed parentHash nonce timestamp extraData gasLimit difficulty 均为创世块的参数

    extraData 设置初始的验证人群组；

    alloc 配置了初始账户信息，可以用来进行资产预分配和系统合约的预初始化；

    0x2334a96f67B6C8906954a7b56333271e142dB36d //创世锁定地址

    000000000000000000000000000000000000F000 //validators 合约

    000000000000000000000000000000000000F001 // punish 合约

    000000000000000000000000000000000000F002 // proposal 合约

3.	初始化创世区块，build/bin/geth init genesis.json 

    使用同样的创世文件初始化其它节点，创世节点没有bootnodes选项，其它节点填写创世节点enode信息，./start.sh启动节点

4.	命令行交互

    使用build/bin/geth attach 进入控制台

* 查看enode信息

    admin.nodeInfo.enode

* 添加节点

    admin.addPeer(“enode信息”)，成功后可以看到加入网络的节点开始同步账本

* 查看连接的节点

    admin.peers 

* 查看余额

    web3.fromWei(eth.getBalance("0x2334a96f67b6c8906954a7b56333271e142db36d"), "ether") 

* 转账

    eth.sendTransaction({from:"0x2334a96f67b6c8906954a7b56333271e142db36d",to:"0x0f0F6f5e2a81ec61a9B6Dc6B941f897d12f9f172",value:web3.toWei(32,"ether")})

# 与合约交互


## 选举验证人

```sh
cd contracts

npm install

truffle compile
```

proposer.js 提议人脚本，包含创建提议，创建验证人

validator.js 验证人脚本，包含提议审批

events.js 事件监听脚本


- 创建提议createProposal

    参数:
    - dst 需要申请添加的地址
    - details 附加信息（选填）

    对于genesis的预设地址，默认会在系统初始化时，自动添加到审核通过

- 审核出块申请voteProposal

    当前设计，合约签名地址需要为已经通过申请的用户，赞同总数或者拒绝总数，哪个先超过当前正在出块人数的 1/2+1，就执行对应的决定。

    参数:

    - id 对应申请的id 

    - auth 是否通过

- 取消出块资质setUnpassed

    目前合约需要当前合约权限才能禁止掉其他人，同样需要发起申请，通过1/2+1人通过，才会取消对应地址的资格。

- 创建验证人地址createOrEditValidator

    需要先申请，通过后才允许创建
    
    参数

    - feeAddr 该矿工领取奖励时的接收地址
    - moniker 昵称（选填）
    - identity 身份（选填）
    - website 网址（选填）
    - email 邮箱（选填）
    - details 附加信息（选填）

- 抵押系统代币stake

    需要创建完validator，才能进行抵押，抵押量不小于32 ether，后面挖矿奖励会根据当前用户抵押量所占总比例进行分配。

- 矿工主动提交所得，进行分配

    链程序出块后，自动执行distributeBlockReward将打包所得手续费转到合约进行池分配，代币总量到合约后，合约根据currentValidatorSet中各自地址抵押总额，以及各自占比进行分配记账（validatorInfo[地址].hbIncoming）

- 领取出块奖励withdrawStaking

    参数validator为矿工地址，执行签名地址需要与创建时设置的feeAddr一致,领取时间间隔24小时（28800块）
