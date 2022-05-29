import './styles.css';

function App() {



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
       <div className='previous-operand'>100,000 +</div>
       <div className='current-operand'>5,000</div>
     </div>


      <button className='span-two'>AC</button>
      <button>DEL</button>
      <button>/</button>

      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>

      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>

      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>

      <button>.</button>
      <button>0</button>
      <button className='span-two'>=</button>



    </div>
  );
}

export default App;
