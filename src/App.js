import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperaitonButton';
import './styles.css';

export const ACTIONS = {
  ADD_DIGIT : 'add-digit',
  CHOOSE_OPERATION : 'choose-operation',
  CLEAR : 'clear',
  DELETE_DIGIT : 'delete-digit',
  EVALUATE : 'evaluate'
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})
function formatOperand(operand)
{
  if(operand == null ) return 
  const[integer,decimal] = operand.split('.')
  if(decimal == null ) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

const reducer = (state,{type,payload})=>{
  //the state will be changed in reducer function in useReducer
  switch (type) {
    case ACTIONS.ADD_DIGIT :
      if(state.overwrite)
      {
        return {
          ...state,
          currentOperand : payload.digit,
          overwrite : false
        }
      }
      //we should not allow multiple 0's at the start
      if(payload.digit === '0' && state.currentOperand === '0') return state

      //we should not allow multiple .'s in numbers
      if(payload.digit === '.' && state.currentOperand.includes('.')) return state
      console.log(payload.digit);
        return{
          ...state,
          currentOperand : `${state.currentOperand || ""}${payload.digit}`,
        } 
        
    case ACTIONS.CLEAR :
      return {}
    case ACTIONS.EVALUATE :
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null)
      {
        return state
      }
      return {
        ...state,
        previousOperand : null,
        currentOperand : evaluate(state),
        operation : null,
        overwrite : true

      }
    case ACTIONS.CHOOSE_OPERATION :
        if (state.currentOperand == null && state.previousOperand == null) {
          return state;
        }
      //handling duble opration after another
      if(state.currentOperand == null)
      return {
        ...state,
        operation : payload.operation
      }


      //making current operand as previous operand(small letters and got to top)
      if(state.previousOperand == null )
      {
        return {
          ...state,
          operation : payload.operation,
          previousOperand : state.currentOperand,
          currentOperand : null
        }
        
      }
      break
    case ACTIONS.DELETE_DIGIT : 
      if(state.overwrite)
      {
        return {
          ...state,
          overwrite : false,
          currentOperand : null,

        }
      }
      if(state.currentOperand == null)  return state
      if(state.currentOperand.length === 1 )
      {
        return {
          ...state,
          currentOperand : null
        }
      }
      return {
        ...state,
        currentOperand : state.currentOperand.slice(0,-1)
      }

      default :
      return {
        ...state,
        previousOperand : evaluate(state),
        operation : payload.operation,
        currentOperand : null
      }
  }
}
function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(currentOperand)
  const current = parseFloat(previousOperand)

  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current   
      break     
    case "/":
      computation = prev / current
      break
      
    case "*":
      computation = prev * current
      break

    default :
      break    
  }
  return computation.toString()

}

function App() {

  const[{currentOperand,previousOperand,operation},dispatch]  = useReducer(reducer,{});


  /*

  go to this link in youtube for this calculator app

  https://www.youtube.com/watch?v=DgRrrOt0Vr8


   
  We are using useReducer hook.
  It is similar to the useState hook

  go to this link for ReducerHook 
  https://www.youtube.com/watch?v=kK_Wqx3RnHk


  to learn CSS grid
  https://www.youtube.com/watch?v=9zBsdzdE4sM

  to learn css Box Model
  https://www.youtube.com/watch?v=rIO5326FgPE

  





  It allows for custom state logic
  If you find yourself keeping track of multiple pieces of state that relay on complex logic, useReduce may be useful

  useReducer takes two arguments useReducer(<reducer>,<Initial State>)
  The reducer function contains your custom state logic and the initialState can be a simple value but generally will contain a object.
  
  did't got it look at below link

  https://www.w3schools.com/react/react_usereducer.asp




   */
  return (
    <div className="calculator-grid">
     <div className='output'>
       <div className='previous-operand'>{previousOperand} {operation}</div>
       <div className='current-operand'>{formatOperand(currentOperand)}</div>
     </div>


      <button className='span-two' onClick={() => {dispatch({type: ACTIONS.CLEAR})}}>AC</button>
      <button onClick={()=> {dispatch({type: ACTIONS.DELETE_DIGIT})}}>DEL</button>
      <OperationButton operation='/' dispatch={dispatch}/>
      <DigitButton digit = '1' dispatch={dispatch}/>
      <DigitButton digit = '2' dispatch={dispatch}/>
      <DigitButton digit = '3' dispatch={dispatch}/>
      <OperationButton operation='*' dispatch={dispatch}/>

      <DigitButton digit = '4' dispatch={dispatch}/>
      <DigitButton digit = '5' dispatch={dispatch}/>
      <DigitButton digit = '6' dispatch={dispatch}/>
      <OperationButton operation='+' dispatch={dispatch}/>

      <DigitButton digit = '7' dispatch={dispatch}/>
      <DigitButton digit = '8' dispatch={dispatch}/>
      <DigitButton digit = '9' dispatch={dispatch}/>
      <OperationButton operation='-' dispatch={dispatch}/>
      <DigitButton digit = '.' dispatch={dispatch}/>
      <DigitButton digit = '0' dispatch={dispatch}/>
      <button className='span-two' onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>



    </div>
  );
}

export default App;
