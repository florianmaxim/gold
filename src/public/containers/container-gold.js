import * as config from '../../../config.json';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import GoldController from '../controllers/controller-gold';

const ControllerGold = new GoldController();

class ContainerGold extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    //Init Gold Element
    let element = ControllerGold.init()

    //Append HTML Canvas Element
    this.refs.gold.appendChild(element);

  }

  componentWillReceiveProps(newProps){

    if(newProps.threeDimensionalView.rotation!==this.props.threeDimensionalView.rotation){
      ControllerGold.updateRotation(newProps.threeDimensionalView.rotation);
    }

    if(newProps.selectedBlock.number!==this.props.selectedBlock.number){
      ControllerGold.generateGold(newProps.selectedBlock);   
    }else{
      if(newProps.selectedBlock.state!==this.props.selectedBlock.state)
      {
        ControllerGold.updateGold(newProps.selectedBlock);
      }
     
    }
    
  }

  render(){
    return(
        <div ref="gold" style={{position: 'fixed', left: '0', top: '0', width:'100vw',height:'100vh'}}/>
    );
}

}

function props(state) {

  return {

    threeDimensionalView: state.threeDimensionalView,

    selectedBlock: state.selectedBlock,
    started: state.started

  };

}

function actions(dispatch){

  return bindActionCreators({

  }, dispatch);

}

export default connect(props, actions)(ContainerGold);