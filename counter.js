// counter is the reducer (function) that manages state updates:
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const Counter = ({ 
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const { createStore } = Redux; // Redux is GLOBAL Object from redux.min.js
// create the store for our mini-app using the counter reducer
const store = createStore(counter);
console.log(store.getState()); // counter should be 0 (zero)

store.dispatch({type:'INCREMENT'}); // increment from zero to one
console.log(store.getState()); // counter is 1 (one)

const render = () => { // render function updates DOM with counter 
  ReactDOM.render(
    <Counter 
      value={store.getState()} 
      onIncrement={() => 
        store.dispatch({
          type: 'INCREMENT'
        })
      } 
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('root')
  )
}
store.subscribe(render); // all actions re-redner the DOM
render(); // render the initial state of the page/app

// listen for click event on the whole document (click anywhere on the page)
document.addEventListener('click', () => {
  store.dispatch({type:'INCREMENT'});
});

// tests make sure everything still works when ever we change any code
expect (
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect (
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect (
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect (
  counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect (
  counter(1, { type: 'SOMETHING_ELSE' })
).toEqual(1);

expect (
  counter(undefined, {})
).toEqual(0);

// Confirm that the test are successful:
console.log('Tests passed!');
