import { setInterval, setTimeout } from "timers";

let interval;

export default class Blockchain {

    connect(){

        if (typeof web3 !== 'undefined') {

            web3 = new Web3(web3.currentProvider);

        } else {

            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

        //console.log(web3.eth.coinbase)

    }

    getBalance(account){
        let balance = 0;

        return balance;
    }

    getBlock(cb){

        clearInterval(interval);

        web3.eth.getBlock("latest", (error, block) => {

            cb(block);
        
        });

        let prev = {hash:0};

        interval = setInterval(() => {

            web3.eth.getBlock("latest", (error, block) => {

                //console.log('PRE'+prev.hash)
                //console.log('CUR'+block.hash)

                if(prev.hash!==block.hash){

                    //console.log('NEW')

                    cb(block);

                    prev = block;

                }else{

                    console.log('OLD')

                }

            })

        }, 10000)

    }

    watch(cb){

        let prev = {hash:0};

        setInterval(() => {

            web3.eth.getBlock("latest", (error, block) => {

                //console.log('PRE'+prev.hash)
                //console.log('CUR'+block.hash)

                if(prev.hash!==block.hash){

                    //console.log('NEW')

                    cb(block);

                    prev = block;

                }else{

                    console.log('OLD')

                }

            })

        }, 1000)

    }
    
}