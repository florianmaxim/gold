import React, {Component} from 'react';

const DEFAULT = {
  offset: 5
}

let state = {
      blocks: [
        '#${block.number} - (${block.timestamp}) : ${block.hash}'
      ]
    };

export default class Chain extends Component{
  constructor(props){
    super(props);

    // Retrieve the last state
    this.state = state;
  }

  componentWillUnmount() {

    this._mounted = false;
    // Remember state for the next mount
    state = this.state;
  }

  componentWillMount(){

    this.setState({
      blocks: this.state.blocks.length>0?this.state.blocks:[]
    })

  }

  componentDidMount(){

    this._mounted = true;

    /*   var Web3 = require('web3');

      var web3 = new Web3();

          web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

        if(!web3.isConnected()) {

            // show some dialog to ask the user to start a node

         } else {

            // start web3 filters, calls, etc
            console.log('connected!')

         }

      var filter = web3.eth.filter('latest');

      filter.watch((error, result)=>{
        if (!error)

          console.log(JSON.stringify(result));

          var block = web3.eth.getBlock(result);

          console.log(`#${JSON.stringify(block.number)}`);

          // let transactions = [];
          //
          // block.transactions.forEach((txId) => {
          //
          //   // transactions.push(web3.eth.getTransaction(txId))
          //   transactions.push(web3.eth.getTransaction(JSON.stringify(block)))
          //
          // })

          if(this._mounted===true){

            //if mouted push directly into the state

            var _blocks = this.state.blocks;

                //TODO _blocks.push(transactions);
                _blocks.unshift(`#${block.number} - (${block.timestamp}) : ${block.hash}`);

            this.setState({
              blocks: _blocks
            })

          }else{

            //if not mouted store it

             state.blocks.push(`#${block.number} - (${block.timestamp}) : ${block.hash}`);

          }

      }); */

  }

  render(){
    return(
      <div className="chain-container">
       
      </div>
    );
  }
}
