let interval;
let counter = 0;

export const startCounter = (value) => {
  
      return (dispatch) => {

        interval = setInterval(()=>{

            counter++;
            dispatch({type: "SET_COUNTER", payload: counter})

        }, 1000);

      }
  }

  export const stopCounter = (value) => {
  
    return (dispatch) => {

        counter = 0;

        clearInterval(interval);

        dispatch({type: "SET_COUNTER", payload: counter})

    }
}  