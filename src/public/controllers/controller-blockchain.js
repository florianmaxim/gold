import { setInterval, setTimeout } from "timers";

import * as config from '../../../config.json';

let prev = {hash:0, number:0};

const CONTRACT_ADDRESS = config.contractAddress;

const CONTRACT_ABI = config.contractABI;

let CONTRACT;

/*
!NO INTERVALS OR TIMEOUTS IN HERE!
*/

export default class Blockchain {

    connect(){

        if (typeof web3 !== 'undefined') {

            web3 = new Web3(web3.currentProvider);

            CONTRACT = web3.eth.contract(CONTRACT_ABI).at(CONTRACT_ADDRESS);

            //console.log(CONTRACT)

        } else {

            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

    }


/*
 Block
*/

    getBlock(blockNumber = "latest" , cb){

        web3.eth.getBlock(blockNumber, (error, res) => {

            const block = res;

            //console.log(block)

            let _block = {

                number: block.number,
                hash: block.hash,
                timestamp: block.timestamp,  
            
                nonce: block.nonce,
                size: block.size,
                transactions: block.transactions
            
            }

            //console.log(_block)

            const data = {
                from: web3.eth.coinbase,
                to: CONTRACT_ADDRESS
            };

            CONTRACT.getOwnerOfBlock(block.number, data, (err, res) => {

                _block.ownersAddress = res;

                CONTRACT.getStateOfBlock(block.number, data, (err, res) => {

                    _block.state = res;

                    //console.log(_block)

                    cb(_block);

                });    

            }); 

         }) 


    }

    buyGoldBlock(blockNumber, cb){

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS,
            value: web3.toWei(config.priceFixed,'ether'),
            gasPrice: web3.toWei(0.00000001,'ether')
        };

        CONTRACT.buyGoldBlock.sendTransaction(blockNumber, data, (err, res) => {

        console.log('transactionHash:'+res)

            const transactionHash = res;
            
            let filter = web3.eth.filter("latest");

            filter.watch((error, result) => {

                console.log('filter watching:'+result)

                web3.eth.getTransactionReceipt(transactionHash, (err, res) => {

                    console.log('getTransactionReceipt:'+res)

                    if(res){

                        console.log('transcation mined')
                        filter.stopWatching();
                        cb();
                        
                    }else{
                        console.log('transcation pending')
                    }

                });

            });
        });
    }

    buyNebulaBlock(blockNumber, cb){

        console.log('buy blockNumber:'+blockNumber)

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS,
            value: web3.toWei(config.priceFixed,'ether'),
            gasPrice: web3.toWei(0.00000001,'ether')
        };

        CONTRACT.buyNebulaBlock.sendTransaction(blockNumber, data, (err, res) => {

        console.log('transactionHash:'+res)

            const transactionHash = res;
            
            let filter = web3.eth.filter("latest");

            filter.watch((error, result) => {

                console.log('filter watching:'+result)

                web3.eth.getTransactionReceipt(transactionHash, (err, res) => {

                    console.log('getTransactionReceipt:'+res)

                    if(res){

                        console.log('transcation mined')
                        filter.stopWatching();
                        cb();
                        
                    }else{
                        console.log('transcation pending')
                    }

                });

            });
        });
    }

    sellBlock(blockNumber, cb){

        const data = {
            from: web3.eth.coinbase,
            to: CONTRACT_ADDRESS,
            gasPrice: web3.toWei(0.00000001,'ether')
        };

        CONTRACT.sellBlock(blockNumber.toString(), data, (err, res) => {

            const transactionHash = res;
            
            let filter = web3.eth.filter("latest");
            filter.watch((error, result) => {

                web3.eth.getTransactionReceipt(transactionHash, (err, res) => {

                    if(res){

                        filter.stopWatching();
                        cb();
                        
                    }else{
                        
                    }

                });

            });

        });

    }


/*
 Account
*/

    getCoinbase(cb){

        web3.eth.getBalance(web3.eth.coinbase, (error, result) => {

            cb({
                coinbase: web3.eth.coinbase,
                balance: new Number(web3.fromWei(result.toNumber(), "ether" )).toFixed(config.priceToFixed)
            });

        });
        
    }


/*
    Get blocks of sender
*/    

    getBlocksOfSender(cb){

        CONTRACT.getBlocksOfSender((err, res) => {

            //Assembly of human readable array
            let blocks = [];

            res.map((key, index) => {

                const blockNumber = key.c[0];

                blocks.push(blockNumber)

            })

            cb(blocks);

        })    
        
    }

/*
    Get contract welcome
*/    

    getContractWelcome(cb){
        CONTRACT.getWelcome((err, msg)=>{
            cb(msg)
        });
    }

/*
    Get contract balance
*/    
    getContractTotalBalance(cb){

        web3.eth.getBalance(CONTRACT_ADDRESS, (err, res) => {

            let balance = new Number(web3.fromWei(res.toNumber(), "ether" )).toFixed(config.priceToFixed)

            cb(balance);

        })

    }


/*
    Get contract amount of blocks
*/    
    getContractAmountOfBlocks(cb){

        CONTRACT.getTotalAmountOfBlocks((err, res)=>{

            cb(res.toNumber());

        });
    }

}