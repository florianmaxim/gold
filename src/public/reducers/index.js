import {combineReducers}    from 'redux';

import ReducerSelectedBlock from './reducer-selected-block';
import ReducerBlocks        from './reducer-blocks';

import ReducerAccount       from './reducer-account';
import ReducerContract      from './reducer-contract';

import ReducerElements      from './reducer-elements';

import ReducerOverlay       from './reducer-overlay';
import ReducerMode          from './reducer-mode';
import ReducerCounter       from './reducer-counter';

const reducer = combineReducers({

    elements: ReducerElements,

    account: ReducerAccount,
    contract: ReducerContract,

    selectedBlock: ReducerSelectedBlock,
    blocks: ReducerBlocks,

    counter: ReducerCounter,
    overlay: ReducerOverlay,
    mode: ReducerMode

});

export default reducer;