
## Notes for Dan Abramov's egghead.io Videos [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/nelsonic/learn-redux/issues)

#### 1. The Single Immutable State Tree (*Principal #1*)

> Video: https://egghead.io/lessons/javascript-redux-the-single-immutable-state-tree

The **first principal** to learn in Redux is that you are going to represent your whole
application ("State") as a single JavaScript Object. All changes and mutations
to the state in Redux are *explicit* so it is possible to keep track of all of them.

In this video Dan shows how the state of a Todo app changes over time as
data is added and filters applied; its a *glimpse* of power of the single state tree.

<br />

#### 2. Describing State Changes with Actions (*Principal #2*)

> Video: https://egghead.io/lessons/javascript-redux-describing-state-changes-with-actions

The **second principal** of Redux is that the **state tree** is ***read-only***;
you cannot modify or write to it, instead, any time you want to change the state
you need to dispatch an action. (i.e. *you can only "update" the state using a function*...)
An action is a *plain Javascript Object* describing the change.
Just like the state is the minimal representation of data in your app,
the action is the minimal representation of the change to that data.
The only requirement of an action is that it has a `type` property
(*this more a description for your action*). The convention is to use a `String`
because they are serialisable (*i.e. easy to `JSON.stringify`*)

> "*Any data that gets into your Redux Application gets there by actions*"

<br />

#### 3. *Pure* and *Impure* Functions

> Video: https://egghead.io/lessons/javascript-redux-pure-and-impure-functions

Pure functions depend solely on the values of the arguments.
Pure functions do not have any (*observable*) side-effects such as network
or database calls. Pure functions just calculate the new value [of the state].

The functions you write in redux need to be pure.

#### 4. The Reducer Function (*Principal #3*)

> Video: https://egghead.io/lessons/javascript-redux-the-reducer-function

The UI/View layer of an application is most predictable when it is described
as a pure function of the application state. Pioneered by ~~React~~ [Ractive](https://github.com/ractivejs/ractive) and now addopted by several other
frameworks, Redux compliments this approach with another idea:
the state mutations in your app need to be described as a pure function
that takes the previous state and the action being "dispatched" (*performed*)
and returns the next state of your app.

Inside any Redux app there is one function that takes the state of the whole
application and the action being dispatched and returns the next state of
the whole application. It is important that it does not modify the state given
to it; it has to be pure, so it has to `return` a new `Object`
Even in *large* applications there is still just a simple function
that manages how the next state is calculated based on the previous state
of the whole application and the action being dispatched.
It does not have to be slow, for example: if I change the visibility filter
I have to create the new object for the whole state, but I can keep the
reference to the previous version of the Todo's array because the list of
todos has not changed when we change the visibility filter; this is what makes
Redux fast.

> this is the 3rd and final principal of Redux: to describe state changes
you have to write a function that takes the previous state of the app
and the action being dispatched and returns the next state.
The function has to be pure and is called the "Reducer".

<br />

#### 5. Writing a Counter Reducer with Tests

This video walks through creating a basic counter in Redux.

> Video: https://egghead.io/lessons/javascript-redux-writing-a-counter-reducer-with-tests

The first [*and only*] function in this video is the Reducer for the counter example.
A reducer accepts state and action as arguments and returns the next state.

Before writing any code, we write a few assertions (*tests*) using
[**Michael Jackson**](https://github.com/mjackson)'s  
(*Yes, there's a* ***developer*** *with that name... and he's* ***really good***)  
***Expect*** (testing/assertion) **library**: https://github.com/mjackson/expect

We assert that when the state of the counter is zero and you pass an `INCREMENT`
action, it should return 1.

```js
expect (
  counter(0, { type: 'INCREMENT' })
).toEqual(1);
```

And similarly when the counter is 1 and we `INCREMENT` it should return 2.

```js
expect (
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

// We add a test that check how `DECREMENT` works; from 2 to 1 and from 1 to zero:

```js
expect (
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect (
  counter(1, { type: 'DECREMENT' })
).toEqual(0);
```

If we run these tests [*in the browser*], they will fail because we have not
even *begun* to implement the reducer.
We are going to start by checking the action type.
If the action type is `INCREMENT` we are going to `return state + 1` (*state plus one*)
If the type is `DECREMENT` we are going to `return state - 1` (*state minus one*)

```js
if (action.type === 'INCREMENT') {
  return state + 1;
} else if (action.type === 'DECREMENT') {
  return state - 1;
}
```

If you run the tests, you will find that that this is enough to get them to pass.
> *Code for*
[***Video 5 @ 1:15*** ](https://github.com/nelsonic/learn-redux/blob/8ded8853d5a789f94aff410eef0799bb66926a0d/index.html#L15)

However, there are still some flaws in our implementation of the counter reducer.
If we dispatch an action that it [*the reducer*] does not understand,
it should return the current state of the application.

```js
expect (
  counter(1, { type: 'SOMETHING_ELSE' })
).toEqual(1);
```

However if we check for that, we will see that this test fails
because we currently don't handle unknown actions.
So I'm going to add an `else` clause that returns the current state
and the tests pass now.

```js
if (action.type === 'INCREMENT') {
  return state + 1;
} else if (action.type === 'DECREMENT') {
  return state - 1;
} else {
  return state;
}
```

And the tests pass now.

> *Code for*
[***Video 5 @ 1:49*** ](https://github.com/nelsonic/learn-redux/blob/d6c9051922e288583d5f43c45dbf3a57f1113648/index.html#L15)

Another issue is that while the reducer is in control of the application state,
*currently* it does not specify the initial state; in the case of the counter
example that would be zero.

The convention in Redux is that if the reducer receives `undefined` as the
`state` argument, it *must* `return` what it considers to be the inital
`state` of the application. In this case it will be zero.

> *Code for*
[***Video 5 @ 2:15*** ](https://github.com/nelsonic/learn-redux/blob/36775c88bb9d236f4918b1721c4d72c3ac8820a1/index.html#L18)

"*Now come a few* ***cosmetic tweaks***" ... At the end of the video Dan replaces
the `if/else` blocks with a `switch` statement* - which we *agree* is *neater* (*and works in* ***all browsers***)

```js
switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
}
```

*However* Dan *also* makes a couple of changes which are *not* just "*cosmetic*":
changing the reducer function to be an **ES6**
[`Arrow Function`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and also includes an **ES6** [`default parameter`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters)
syntax to specify what the state should be if its undefined.

The reducer function written in ES5 (*Works in* ***ALL Browsers***):
```js
function counter(state, action) {
  state = state || 0; // default parameter assignment before ES6
  /* reducer code here */
}
```
is re-written using ES6 features: (***Only Chrome*** *fully-supports both these new features*)

```js
const counter = (state = 0, action) => {
  /* reducer code here */
}
```

***Arrow functions*** can be fewer characters to type but are
[***not supported***](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Browser_compatibility)
in **Safari** *or* **Internet Explorer**
[*at the time of writing*] ...  
![ES6-arrow-functions-not-supported-in-safari-or-internet-explorer](https://cloud.githubusercontent.com/assets/194400/12050430/5800888c-aeed-11e5-91fb-0bb8ff2ae4a4.png)

***Default parameters*** are a *nice* addition to JavaScript (ECMAScript 2015) because
they make it clear what the default value of the parameter should be if its unset,
however they are
[***not supported***](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters#Browser_compatibility) in **Internet Explorer**, **Safari** *or* **Opera** [*at the time of writing*] ...
![es6-default_parameters-browser_compatibility](https://cloud.githubusercontent.com/assets/194400/12050412/095e590c-aeed-11e5-8dae-a8a4105715fb.png)

These browsers still account for between 30%-50% of people using the internet in December 2015
(*depending on the age/geography of the people using your app...
see*:  https://en.wikipedia.org/wiki/Usage_share_of_web_browsers )
And considering that *most* people take *ages* to upgrade to the latest browser
Microsoft ***Internet Explorer 8*** *still has*
[***10%*** *market share*!](https://www.netmarketshare.com/browser-market-share.aspx?qprid=2&qpcustomd=0)
and is [still available](https://www.microsoft.com/en-us/download/internet-explorer-8-details.aspx)
to be downloaded.

using ES6 features has two implications:
+ If you want to run the code in a browser you need Google Chrome ***Canary***.
+ And/Or, You need to "*transpile*" (*convert*) your code using ***Babel*** before running it in browsers.

We will come back to Babel later...

<br />


#### 6. Store Methods: getState(), dispatch(), and subscribe()

> Video: https://egghead.io/lessons/javascript-redux-store-methods-getstate-dispatch-and-subscribe  
> Code: [Video 6 Code Snapshot]( https://github.com/nelsonic/learn-redux/blob/2430c6e95eacd61ebf7ff4a660cc64e80c9e883e/index.html)

Video #6 picks up from where #5 finished, so if you skipped
video 5, go back and watch it, and try writing/running the code!

Dan starts off by showing how to include Redux (*from CDN JS*)
in a client-side app so we can start using the methods.
This is not the *recommended* way of loading Redux but works fine for this
example/demo.

"*In real applications I suggest you use npm and a module bundler like
webpack or browserify*".


In this tutorial we are using a single function from Redux called `createStore`

Using **ES6** [**destructuring assignment**](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
syntax to extract the `createStore` method from Redux:

```js
const { createStore } = Redux;  // 6 fewer characters to type. OMG! what will we do with all that extra free time?!
// this is equivalent to:
var createStore = Redux.createStore;
```

"The store binds together the **3 Principals** of Redux,
it holds the current application state object, it lets you dispatch actions.
When you create it [the store] you need to specify the reducer that tells
how to update the state with actions.
In this example we are calling `createStore` with `counter` as the reducer
that manages the state updates."

Redux Store has **3** (*important*) **methods**:

+ `getState` - retrieves the current state of the Redux store. In the case of our counter the initial state is Zero.
+ `dispatch` - lets you dispatch actions to change the state of your application.
if we log the state of the application after dispatching an action (e.g: `INCREMENT`), we see that the state has changed to 1.
(*the most commonly used method*)
+ `subscribe` - lets you register a callback that the Redux store will call
any time an action has been dispatched. so you can update the UI of your application to reflect the current application state.

The code at the end of video #6 looks like this: (*explanatory comments added*)

```js
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Learn Redux</title>
    <link rel="shortcut icon" type="image/png" href="http://www.favicon.cc/logo3d/805435.png"/>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.0.5/redux.min.js"></script>
    <script>
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

      const { createStore } = Redux; // Redux is GLOBAL Object from redux.min.js
      // create the store for our mini-app using the counter reducer
      const store = createStore(counter);
      console.log(store.getState()); // counter should be 0 (zero)

      store.dispatch({type:'INCREMENT'}); // increment from zero to one
      console.log(store.getState()); // counter is 1 (one)

      const render = () => { // render function updates DOM with counter value
        document.body.innerText = store.getState();
      }
      store.subscribe(render); // all actions re-redner the DOM
      render(); // render the initial state of the page/app

      // listen for click event on the whole document (click anywhere on the page)
      document.addEventListener('click', () => {
        store.dispatch({type:'INCREMENT'});
      });
    </script>
  </body>
</html>
```

Try viewing the [`index.html`](https://github.com/nelsonic/learn-redux/blob/2430c6e95eacd61ebf7ff4a660cc64e80c9e883e/index.html) file in [**Chrome** ***Canary***](https://github.com/nelsonic/learn-redux/issues/5#issue-123923845)

> Download Chrome Canary: https://www.google.co.uk/chrome/browser/canary.html


#### 7. Implementing Store from Scratch

> Video: https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch  
> Code: [Video #7 Code Snapshot](https://github.com/nelsonic/learn-redux/blob/17432aacb7e75702fe66338d9eacf27ffcca33c7/index.html#L15-L43)

In the 7<sup>th</sup> Video Dan shows how the Redux store is *implemented*
in ***20 lines of code***:

```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state; // return the current state (object)

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listeners);
    return () => { // removing the listener from the array to unsubscribe listener
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
}
```

"Because the subscribe function can be called many times,
we need to keep track of all the changed listeners.
And any time it is called we want to push the new listener into the (`listeners`) array.
Dispatching an action is the only way to change the internal state.
in order to calculate the new state we call the reducer with the state
and the action being dispatched.
And after the state is updated we need to notify every change listener by calling it.  
1:44 - There is an important missing piece here: we have not provided a way
to unsubscribe a listener. But instead of adding a dedicated `unsubscribe` method,
we will just return a function from the subscribe method that removes this listener from the `listeners` array.  
2:03 - Finally by the time the store is returned we want it to have the inital
state populated. so we are going to dispatch a dummy action just to get the
reducer to return the initial value.  
2:18 - this implementation of the Redux store is (*apart from a few minor details
  and edge cases*) is the `createStore` we ship with Redux."

> Once you have watched the video, checkout the source code for Redux.createStore
on Github: https://github.com/rackt/redux/blob/master/src/createStore.js

<br />


#### 8. React Counter Example

> Video: https://egghead.io/lessons/javascript-redux-react-counter-example

"In the simplest counter example I update the `document.body` *manually*
any time the store state changes, but of course this approach does not scale
to complex applications. So instead of manually updating the DOM I'm going
to use React."

I'm adding two scripts to the `<head>` corresponding to React and [React-DOM](https://facebook.github.io/react/docs/glossary.html)
and a `root` div to render to:

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react-dom.min.js"></script>
```
> These scripts are available on CDNJS: https://cdnjs.com/libraries/react/
You can opt to use `fb.me` as your React CDN if you *prefer*.

So now I can call `ReactDOM.render` with my root component.
The render function is called any time the store state changes,
so I can safely pass the sate of the store as a `prop` to my
root component.

```js
const Counter = ({ value }) => (
  <h1>{value}</h1>
);

const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()}/>,
    document.getElementById('root')
  );
};
```

Since the state is held inside the Redux Store the counter component can
be a simple function which is a supported way of declaring components
since React version `0.14`.

Now I want to add increment and decrement buttons to the component,
but I don't want to *hard-code* the Redux dependency into the component,
so I just add `onIncrement` and `onDecrement` props as callbacks.

In my render method I pass the callbacks that call `store.dispatch`
with appropriate actions.
Now the application state is updated when I click the buttons.

by the *end* of Video 8 your code should look like this:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/a6cbc789e078d8c42a73066dbb94adf8bd5a7f3f/index.html#L19-L72)

##### *Recap*

[1:20] Now let's recap how this application works.

The `counter` component is what I call a "*dumb component*",
it does not contain *any* business logic, it only specifies how the current application state transforms into renderable output
and how the callback passed via props are bound to the event handlers.

When we render a counter we specify that its `value` should be taken
from the Redux `store` *current* state.
And when the user presses `increment` [button] or `decrement` [button]
we dispatch the corresponding action to the Redux store.

Our reducer specifies how the *next* state is calculated based on the
*current* state and the `action` being dispatched.

And *finally* we subscribe to the Redux store so our `render` function
runs any time the state changes, so the `counter` [component]
gets the *current* state.



#### Notes on using JSX Syntax in React in Browsers

*Most* React.js Examples are written using
[JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax.
This is not *standard* JavaScript so no browser can *understand* it.  

If you want the Counter *example* to work in the browser (*without having to compile your counter component with babel*) you will need to include the `JSXTransformer`:

```js
<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>
```
**note**: in-browser compilation of JSX is [not recommended](http://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html#other-deprecations) for "*Production*" use.
instead you will need to *compile* your JSX to JS using Babel...

For more detail,
read: https://facebook.github.io/react/docs/tooling-integration.html#jsx

Don't forget to add `type="text/jsx"` to your script tag in `index.html`
to ensure that the JSX in the React Component is transformed.
see: http://stackoverflow.com/questions/28100644/reactjs-uncaught-syntaxerror-unexpected-token

> *Final version* of *working* code for Video 8: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/a6cbc789e078d8c42a73066dbb94adf8bd5a7f3f/index.html#L19-L72)  
Run it by opening it in **Google Chrome Canary**:

![learn-redux-video-9-counter-example](https://cloud.githubusercontent.com/assets/194400/12079438/c0203cdc-b230-11e5-9338-00254dc9761a.png)


#### 9. Avoiding Array Mutations with concat(), slice(), and ...spread

In this video we learn how to avoid mutating arrays using concat(), slice(), and the ES6 array spread operator.

> Video: https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread

"In this lesson I use the *expect* library to make assertions
and [**deep-freeze**](https://github.com/substack/deep-freeze) to make sure my code is ***free*** *of* ***mutations***."

```js
<script src="https://wzrd.in/standalone/expect@latest"></script>
<script src="https://wzrd.in/standalone/deep-freeze@latest"></script>
```
These are loaded from [@Substack](https://github.com/substack)'s CDN: https://wzrd.in

"Let's say that I want to implement a **counter** ***list*** application.
I would need to write a few function that operate on its' state and
its' state is an `Array` of JavaScript *Numbers* representing the individual counters."

The first function I want to write is called addCounter
and all it should do is to *append* a zero at the end
of the passed `Array`.


```js
const addCounter = (list) => {
  // write the tests first then implement the function to make them pass.
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter  = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
}

testAddCounter();
console.log('All tests passed.');
```

At first I use the
[`Array.push()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
method to add an item at the end of the `Array`, and it works.
> Snapshot of code for [Video 9 @ 0:36](https://github.com/nelsonic/learn-redux/blob/65fd87d59a91ca1b12fb8b3a3d1e5516ee520174/index.html#L17-L20)

*However* we need to learn to ***avoid mutations*** in Redux
and I'm enforcing this by calling `deepFreeze` on the original array.
Now my attempt to `.push` does not work; it cannot add a new property to a "frozen" object.
Instead of `.push` I'm going to use the `concat` method which does not *modify* the array.

```js
const addCounter = (list) => {
  return list.concat([0]);
};
```

Now the tests pass without *mutations*.

And I can also use the new **ES6** [***spread operator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
to write the code in a more consise way:

```js
const addCounter = (list) => {
  return [...list, 0];
};
```

> **Note**: *Again*, (at the time of writing) You will need to be running
[**Chrome**](https://www.google.co.uk/chrome/browser/canary.html) or
[**Firefox**](https://www.mozilla.org/en-GB/firefox/developer/)
for this example to work because the
[***spread operator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
is still [***not*** *(yet)* ***supported***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator#Browser_compatibility) in *all* browsers ... even though it is a *Standard* ...


The next function is `removeCounter` and it accepts two arguments: `list` (*an `Array` of `Numbers`*) and `index` the `Number` to *skip* from the `Array`.

So if I've got three numbers 
and I'm passing 1 as the second argument,
I expect to receive an `Array` with *two* items with the *second* item *skipped* in the `Array`:


```js
const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter  = [0, 20];
  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};
```

*Usually* to `delete` an item from an `Array` I would use the `splice` method.
However `splice` is a mutating method, so you can't use it in Redux.
I'm going to `deepFreeze` the (`listBefore`) `Array` object,
and now I need to figure out a *different* way of removing an item from 
the array *without mutating it*.
I'm using a method called `slice` here and it does not have *anything* to do with `splice`; it is ***not mutating*** and it gives me a part of the `Array` from some beginning to some end index.
So what I am doing is taking the parts before the index I want to skip
and after the index I want to skip
and I `concat` them to get a new array:

```js
const removeCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat(list.slice(index+1));
};
```

Finally, instead of writing it as a method chain with `concat` calls, 
I can use the **ES6** [***spread operator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) 
to write it more concicely:

```js
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};
```

> **Note**: *make* ***sure*** *you* ***understand*** *how* ***both*** 
*of these work before proceeding ... Dan is a big fan of his ES6; he uses it* ***everywhere***!

Now that we have implemented adding and removing counters,
lets implement *incrementing* the counter:

```js
incrementCounter = (list, index) => {
  
};

// write a test/assertion before implementing the function:
testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter  = [0, 11, 20];

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);

}
```

The `incrementCounter` function takes two arguments:
`list` - the `Array` (*of all our counters*) 
and `index` - the counter that should be incremented.
So the returned value (`Array`) has the same count of items
but one of them is incremented.

Directly setting the value at the `index` *works* but this a mutation.
so if we add a `deepFreeze` call its *not* going to work *anymore*.

So *how* do we *replace* a single value in the array
 ***without mutating*** it?
 it turns out the *answer* is *really similar* to how we *remove* an item.

 ```js
incrementCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat(list[index] + 1)
    .concat(list.slice(index + 1));
};
 ```

We want to take a slice *before* the `index` 
and `concat` it with a single item `Array` with a *new* value
and then `concat` it with the *rest* of the original `Array`.

Fincally with the **ES6** [***spread operator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) 
we can spread over the left part of the `Array`
*specify* the *new* item,
and then *spread* over the right part of the *original* `Array`
and this *looks* much nicer ... 

```js
incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
};
```

In this lesson you learned how to use the `concat` method
*or* the *spread operator*
and the `slice` method to add, remove and change items in arrays
*without mutating* them
and how to *protect* yourself from *mutation* with `deepFreeze`
in your tests.


> Code snapshot at the end of Video 9:
[`index.html`(https://github.com/nelsonic/learn-redux/blob/f25da6293c26b9262c888219139830979c51633b/index.html#L16-L67)

<br />

#### 10. Avoiding Object Mutations with Object.assign() and ...spread

> Video: https://egghead.io/lessons/javascript-redux-avoiding-object-mutations-with-object-assign-and-spread

Like in the previous example I use `expect` and `deepFreeze` libraries
from NPM to make test assertions.
And this time I'm testing a function called `toggleTodo`
that takes a todo `Object` and *flips* its "*completed*" field.
So if `completed` was `false` it should be `true` in the returned value
or if it was `true` it should be `false`

```js
const toggleTodo = (todo) => {
  
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  }
  const todoAfter  = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  }
  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
}

testToggleTodo(); // run the test

```

Just like in the last lesson, I'm going to start by writing 
a *mutating* version that passes the current test.
So a *mutating* version just flips the `completed` field and re-assigns it on the passed `Object` (*the `todo`):

```js
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
}
```
And while it works, 
we know that *mutations* are ***not allowed*** in Redux.
So to *enforce* this, I'm calling `deepFreeze` on my `todo` Object 
(*in the case of the test `todoBefore`*) 
and I'm *not allowed* to change its `completed` field anymore.

One way out of this would be to create a new object 
with every field copied from the original object
*except* the `completed` field which would be flipped:

```js
const toggleTodo = (todo) => {
  return {
    id: todo.id,
    text: todo.text,
    completed: !todo.completed
  }
}
```

However if we later add new properties to the `todo` object,
we might *forget* to update this piece of code to include them.

This is why I suggest that you use the **ES6**
[`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 
method which is *new* to **ES6** 
and it lets you `assign` properties of *several* objects onto the target object. Note how the `Object.assign` order corresponds to that of the JavaScript assignment operator. 
The left (*first*) argument is the one who's properties 
are going to be assigned, so its going to be *mutated*.
This is why we are passing an *empty* `Object` as the *frist* argument
so we don't *mutate* any *existing* data.
Every further argument to `Object.assign` will be considered a 
"*source*" `Object` who's properties will be copied to the target object.

It is ***important*** that if several *sources* specifiy 
different values for the *same* property, the ***last*** one "*wins*".
and this is what we use to *overwite* the `completed` field 
despite what the original object says.

```js
const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};
```

*Finally* you need to *remember* that 
[`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 
is a *new* method in **ES6** so it is *not natively available* in 
all the Browsers (*specifically not supported in Internet Explorer*).

![object assign-browser-compatibility](https://cloud.githubusercontent.com/assets/194400/12080810/6fbc745c-b25f-11e5-9e58-ed860ea2872a.png)

You should use a "*pollyfill*" either the one that ships with ***Babel***
or a *standalone* pollyfill to use it (`Object.assign`) without risking
crashing your website.

Another option that does not require a pollyfill is use 
the new [`Object` ***spread*** operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
which is ***not part of ES6*** however it is *proposed* for **ES7**
it is "*fairly popular*" and it is *enabled* in Babel 
if you use the "*stage 2 preset*":

```js
const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  }
};
```

> Code at the *end* of Video 10:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/63c9e49f7d3ff4611c3c9e91b131102a7729ff30/index.html#L16-L44)

> **Note**: we have *not* used the `Object` spread operator in
our code because it does not run in *any* browser!!

<br />

#### 11. Writing a Todo List Reducer (Adding a Todo)

> Video: https://egghead.io/lessons/javascript-redux-writing-a-todo-list-reducer-adding-a-todo

Just like in the previous two lessons, I'm using the 
**expect** library to make test assertions and
**deep-freeze** library to *prevent accidental mutations* in my code.

In this lesson I will create a reducer for a Todo-list application
who's state is described as an array of Todos.

Just to remind you what a reducer is: its a "*pure function*" 
you write to implement the update logic of your application.
That is how the next state is calculated given the current state
and the action being disptched.

Before writing a reducer I want a way of knowing whether its code is correct. So I'm starting by writing a test for it:


```js
const todos = (state = [], action) => {
    
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  expect(
    todos(stateBefore, action);
  ).toEqual(stateAfter);
};

testAddTodo();

console.log('All tests passed.');
```

I'm declaring two variables:
+ `stateBefore` - the state before, which is an *empty* `Array`
+ `action` - the action being dispatched - which is an action describing a user adding a new todo with some `id` and a `text` (*fields*).

I am also declaring the *state* I `expect` *after* calling the reducer.
and like `stateBefore` it is an `Array`, but this time it has 
a *single element* representing the Todo that was just added;
so it has the same `id` and `text` as the action `Object`.
and it *also* has an *additional* field called `completed` 
that I want to be *initialised* to be `false`

We want to make sure that the reducer is a "*pure function*",
so I am calling `deepFreeze` both on the `stateBefore`
*and* the `action`.

*Finally* I'm ready to use the `expect` library to verify that if I call
the todo reducer with the `stateBefore` and the `action`
I'm going to get the result that is ***deeply*** **equal** 
to the `stateAfter` I *just* declared.

This concludes my *first* test, now I can call it 
just like a regular JavaScript function: `testAddTodo();` 
And if it doesn't `throw` in the `expect` call I'm going to see a message
that the tests have passed.

Of *course* it fails because the reducer is not implemented yet;
it's an *empty* function, so it returns `undefined` 
instead of the `Array` with a single item that I `expect` in the test.

To fix this I will need my reducer to take a look at the 
`action.type` property which is a `String`
when it matches the `ADD_TODO` string which I specify in my test
to *satisfy* the test I need to return a *new* `Array`
which includes all the items from the *original* `Array`
but *also* a *new* Todo item that has its `id` and `text`
copied from the `action` Object 
and a `completed` field set to `false`

Finally I add a `default` case to my `switch` statement
because *every* reducer has to `return` the *current* state
for any *unknown* `action`:

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    default:
      return state;
  }
};
```

Now the tests run *successfully*!

Lets **recap** the *data flow* in this example to see why
first I create the state `Array` (`stateBefore`) 
which is an *empty* `Array`
and the `action` Object inside my test function.
I'm passing them as arguments to my *reducer* function called todos
the `todos` reducer accepts the state and action as *arguments*
and takes a look at the `action.type`
in this case the `action.type` is a `String` saying `ADD_TODO`
so it matches the `switch` `case` inside the reducer
the reducer returns a *new* `Array` 
which contains the items from the *old* `Array`
(*in the case of our test, the empty `stateBefore` Array*...)
and a *new* item (`Object`) representing the added todo
however the `state` we passed from the test was an *empty* `Array`
so at the end we are going to get an `Array` with a *single* item
which is the *new* todo
*finally* we compare the returned value 
to an `Array` with a single todo item 
to make sure the reducer works as intended
the equality check passes 
so this makes the test successful.

> Code snapshot for the end of Video 11: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/278a17be1fafe2e0f354aa431e0ad4fc776bbc41/index.html#L15-L56)

<br />

#### 12. Writing a Todo List Reducer (Toggling a Todo)

This lesson picks up where we left off in Video 11,
so make sure you watched that an tried writing/running the code!

> Video: https://egghead.io/lessons/javascript-redux-writing-a-todo-list-reducer-toggling-a-todo

In this lesson we will continue creating the reducer for the
todo list application
and the only action that this reducer *currently* handles 
is called `ADD_TODO`
we also created a ***test*** that makes sure that when the reducer
is called with an *empty* `Array` and the `ADD_TODO` `action`
it returns an `Array` with a *single* todo element.

In this lesson we will follow the same approach
to implement another action called `toggleTodo`

We're going to start with the *test* again 
and *this* time we are testing a different action 
and we have a different *initial* `state` 
the `state` *before* calling the reducer (`stateBefore`) 
now includes two different todos with `id` `0` and `1`.
notice how *both* of them have their `completed` field set to `false`

Next I declare the `action`
and the action is as `Object` with the `type` property 
wich is `TOGGLE_TODO` `String`
and the `id` of the todo that I want to be "*toggled*"
I declare the state that I `expect` 
to receive *after* calling the reducer (`stateAfter`)
its pretty much the same as *before* calling the reducer 
however I `expect` the todo with `id` specified in the `action`
or `1` in this case 
to change its `completed` field 

```js
const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
  },
  {
    id: 1,
    text: 'Go shopping',
    completed: false
  }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
  },
  {
    id: 1,
    text: 'Go shopping',
    completed: true
  }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

testToggleTodo();
console.log('All tests passed.')

```

the reducer *must* be a "*pure function*"
so at a matter of *precaution* I call `deepFreeze` 
on the `state` and the `action`

*Finally*, just like in the previous lesson, I'm asserting 
that the result of calling our reducer with the `stateBefore` and the `action` 
is going to be "*deeply equal*" (`toEqual`) the `stateAfter`.

Now, my test is a function so I need to call it at the end of the file
And if I run it, it fails because I have not *implemented* 
handling this action yet.

I'm adding a new `switch case` to my reducer
and I remember that I should not change the original `Array`
so I'm using the [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method
to produce a *new* `Array`
the function I pass as an argument will be called for *every* todo
so if its *not* the todo I'm looking for, I don't want to change it,
so I just `return` it as is.  
*However* if the todo *is* the one we want to toggle
I'm going to `return` a *new* `Object`
that *all* the properties of the *original* todo `Object`
thanks to the `Object` spread operator
but *also* an *inverted* value of the `completed` field:

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if(todo.id !== action.id){
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed
        };
      });
    default:
      return state;
  }
};
```

Now both of our tests run successfully...
And we have an implementation of the reducer that can add and toggle todos.

> Code at the end of Video 12: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/92b9a312678ba26ca90050f17d796b26f992de63/index.html#L31-L33) (*using `Object` spread*)

> ***Note***: While the [*spread operator*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator#Browser_compatibility)
is an **ES6** *Standard* for `Array`, its only a ***Draft*** for `Object`
proposed for **ES7** which means it is 
**not** yet **available** in ***any*** **Browser**! 
As such I have modified Dan's
code to use `Object.assign` (*see Video #10) 
which (*at least*) works in Chrome...:

```js

case 'TOGGLE_TODO':
  return state.map(todo => {
    if(todo.id !== action.id){
      return todo;
    }
    return Object.assign({}, todo, {
      completed: !todo.completed
    });
  });
```

The *works* in ***ALL Modern Browsers Today (Without Babel)*** way of doing this is:
```js
case 'TOGGLE_TODO':
  return state.map(todo => {
    if(todo.id !== action.id){
      return todo;
    }
    var keys = Object.keys(todo); // IE9+
    var toggled = {};             // new object to avoid mutation
    keys.forEach(function(index) {
      toggled.index = todo.index; // copy all properties/valud of todo
    });
    toggled.completed = !todo.completed
    return toggled;
  });

```

We can *probably* ***all*** agree that the code is more *elegant* 
with the ES7 Object spread operator.  
But in the interest of having something that works *now* 
(*without Babel for running this tutorial in a Chrome without a node.js "workflow"...*)
I've opted to use the `Object.assign` method is an **ES6** *Standard*.

> Code at the end of Video 12: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/de238f6391dbaf85de9527932c48d7702e4e2336/index.html#L31-L33) (*using `Object.assign`*)

<br />

#### 13. Reducer Composition with Arrays

> Video: https://egghead.io/lessons/javascript-redux-reducer-composition-with-arrays

In the *previous* lesson we created a *reducer* 
that can handle two actions: adding a *new* todo 
and toggling an *existing* todo.
Right now the code to *update* the todo item
or to *create* a new one is placed right inside the todos reducer
this function is hard [*difficult*] to understand
because it mixes two different concerns:
how the todos `Array` is updated *and* 
how individual todos (`Objects`) are updated.
This is not a problem *unique* to Redux
any time a function does *too many* things
you want to *extract* other functions from it and call them 
so that every function only addresses a single concern

In this case I decided that creating and updating a todo
in response to an `action` is a *separate* operation
and needs to be handled by a *separate* function called `todo`

```js
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, { // see: http://git.io/vuBzV
        completed: !state.completed     // here state is the individual todo
      });
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};
```

As a matter of convention I decided that it should also accept 
two arguments: the *current* `state` and the `action` being dispatched
and it should `return` the *next* `state`. 
But in this case the `state` refers to the *individual* todo
and *not* to the *list* (`Array`) of todos.

*Finally* there is no "*magic*" in Redux to make it work.
We extracted the todo reducer from the todos reducer.
So now we need to call it for every todo 
and assemble the results into an `Array`.
While this is not required in this particular example 
I suggest that you *always* have the `default` case 
where you `return` the *current* `state`
to avoid "*odd bugs*" in the future.

The ***Pattern*** described in this lesson 
is *pervasive* in Redux development 
and is called "[***Reducer Composition***](http://rackt.org/redux/docs/basics/Reducers.html)".

Different reducers specify how different parts of the `state` tree
are updated in response to different actions.
Reducers are also "*normal*" JavaScript functions 
so they can call *other* reducers
to delegate and abstract away handling of updates 
of some parts of the `state` they manage
this pattern can be applied *many* times 
and while there is still a *single* top-level reducer
managing the `state` of your app
you will find it convenient 
to express it as *many* reducers calling each other 
each contributing to a *part* of the application `state` tree.


> Recap: this video/lesson was simply to show how
to extract a method from inside the *main* ("*top-level*")
reducer and have a *separate* reducer 
which handles updates on the *individual* todo items.  
> While there are ***more lines of code***,
> the *separate* reducers are ***more maintainable***

> Note that the tests from the *previous* video still pass
after we have created the `todo` reducer, 
because the *functionality* has not changed, 
its merely been separated to simplify the *main* reducer.

> Code at the end of Video 13: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/89572d3b8e751c2fe11d8a1750ea4f82d64d5e3c/index.html#L15-L47)

<br />

#### 14. Reducer Composition with Objects

Tip: This tutorial builds apon the code written in Video/Lesson 13.
If you skipped it, or left a break between watching the videos,
go back and re-aquaint yourself before proceeding.

> Video: https://egghead.io/lessons/javascript-redux-reducer-composition-with-objects

In the *previous* lesson we established 
the *pattern* of "*Reducer Composition"
where one reducer can be called by another reducer
to update items inside an array. 
If we creat a `store` with this reducer and log its `state` 
we will find that the *initial* `state` of it
is an *empty* `Array` of todos 
and if we *dispatch* an `ADD_TODO` `action` 
we will find that the *corresponding* todo has been added 
to the `state` `Array`
if we *dispatch* *another* `ADD_TODO` `action` 
the *corresponding* todo will *also* be added at the end of the `Array`.
And dispatching a `TOGGLE_TODO` `action` with `id` (*set to*) `0` 
will flip the `completed` field of the todo with `id` *zero* (`0`).

> The new code not in the previous tutorial is:

```js

const { createStore } =  Redux;
const store = createStore(todos);

console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.'); // first todo
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});

console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.'); // second todo
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Go shopping'
});

console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching TOGGLE_TODO.'); // toggle first todo
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});

console.log('Current state:');
console.log(store.getState());
console.log('--------------');
```

> or you can run: [`index.html`](https://github.com/nelsonic/learn-redux/blob/33a46dbc0eb733f6494fdb8de89d91dde58c1731/index.html#L50-L87) 
(Code Snapshot for Video 14 @ 0:40)  
> which has the following developer console *output*:

![learn-redux-output-of-video-14-console logs](https://cloud.githubusercontent.com/assets/194400/12122835/6dc1bc44-b3d5-11e5-8e4d-691bdd86f910.png)


Representing the *whole* `state` of the application 
as an `Array` of todos works for a *simple* example 
but what if we want to store *more* information?
For *example* we may want to let the user choose which todos 
are *currently* *visible* with a `visibilityFilter`
such as `SHOW_COMPLETED`, `SHOW_ALL` or `SHOW_ACTIVE`.

```js
const visibilityFilter = (
  state = 'SHOW_ALL', // default state
  action
) => {
  switch (action.type) {
    case: 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
```

The `state` of the `visibilityFilter` is a *simple* `String`
representing the *current* filter
and it is *changed* by the `SET_VISIBILITY_FILTER` `action`.

```js
const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  };
};
```

To *store* this *new* information, I don't need to *change* 
the *exisiting* reducers, I will use the Reducer Composition Pattern
and create a *new* reducer that *calls* the existing reducers 
to manage parts of its state 
and combines the results in a *single* `state` `Object`
***note*** that the first time it runs, it will pass `undefined` as the `state`
to the "*child*" reducers because the *initial* state 
of the *combined* reducer is an *empty* `Object`
so all its fields are `undefined` 
this gets the "*child*" reducers to return their *initial* `state`
and populates the `state` `Object` for the first time.

> Code Snapshot for Video 14 @ 1:45 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/7fef9d1ede97b48a03a4e55c6b8f10bdcc0b5a89/index.html#L62-L73)

When an `action` comes in, it calls the reducers 
with the parts of the `state` that they manage and the `action`
and combines the result into the *new* `State` object.
This is *another* example of the Reducer Composition Pattern
but this time we use it to *combine* *several* reducers
into a single reducer that we will now use to create our `store`.

The *initial* `state` of the *combined* reducer now contains
the *initial* `state` of the *independent* reducers 
and any time an `action` comes in those reducers handle the action 
*independently* this pattern helps *scale* Redux development
because different people on the team
can work on differnt reducers handling the *same* actions 
without running into each other and causing merge conflicts.

```js
console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});

console.log('Current state:');
console.log(store.getState());
console.log('--------------');
```

> Note: This `action` is merely setting the `visibilityFilter` *propert*
of the `store` `Object`

![console-log-output-for-set_visibility_filter](https://cloud.githubusercontent.com/assets/194400/12123718/753f2a92-b3da-11e5-982a-17be0a075f1b.png)


> ***NOTE***: this code does not actually do anything 
to the ***UI** *yet*. (*be patient that's next...*)

*Finally* I'm dispatching the `SET_VISIBILITY_FILTER` `action`
and you can see that it does not affect the todos 
but the `visibilityFilter` field has been updated. 

> Code Snapshot for *End* of Video 14: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/9702c1c858b4a22fff85339c55cf914ae3969666/index.html#L115-L123)

<br />

#### 15. Reducer Composition with `combineReducers`()

> Video: https://egghead.io/lessons/javascript-redux-reducer-composition-with-combinereducers

In the previous lesson we learned how to use 
the "*Reducer Composition*" Pattern 
to let different reducers handle different parts of the `state` tree
and then *combine* their results.
In fact this pattern is *so* common 
that it's present in *most* Redux applications.
And this is why Redux provides a function called `combineReducers`
that lets you avoid writing this code by *hand*
and instead it *generates* the top-level reducer *for* you.

The *only* argument to `combineReducers` is an `Object`
and this `Object` lets me specify the *mapping* between
the `state` field names and the reducers managing them:

```js
const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
```

The returned value of the `combineReducers` call is a reducer function
which is pretty much equivalent to 
the reducer function I wrote by hand previously [*See: Video 14 above*]

The keys of the `Object` that I configure `combineReducers` with
correspond to the fields of the `state` `Object` its going to manage. 

The *values* of the `Object` I pass to combine reducers are the reducers
it should call to update the corresponding `state` fields
this *combined* reducer call says that 
the todos field inside the state object manages 
will be updated by the `todos` reducer 
and the `visibilityFilter` field inside the the `state` `Object` 
will be will be updated by calling the `visibilityFilter` reducer
and the results will be assembled into a *single* `Object`
in other words it behaves pretty much exactly as the function
commented out below:

```js
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   };
// };
```

*Finally* I will establish a *useful* convention:
I will *always* name my reducers after the `state` keys they manage
since the *key* names and the *value* names are now the *same*
I can *omit* the *values* thanks to the **ES6** Object Litteral 
***Shorthand Notation***:

```js
const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
```

In this lesson you learned how to *generate* a single reducer 
that calls many reducers to manage parts of its state 
by using the `combineReducers` utility function. 

> Code Snapshot for *End* of Video 15 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/128196f61fe5d0e752b16625e8676961f74858ff/index.html#L62-L66)


##### Read more about ES6 Object Litteral *Shorthand* Notation

+ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015
+ Good examples: http://eslint.org/docs/rules/object-shorthand.html (*by Nicholas C. Zakas*)

> ***NOTE***: as *usual*, while **ES6** Object Litteral *Shorthand* Notation is a *Standard* it is *still* not implemented in the *majority* of web browsers:

![es6-object-literal-shorthand-notation](https://cloud.githubusercontent.com/assets/194400/12127256/0d4190d8-b3ee-11e5-9191-8c4a532ad59f.png)

> *I have a* ***strong bias*** *towards* ***explicitly*** 
*typing the* ***Values*** *in an `Object` litteral for clarity*.
*But given the* ***naming convention*** *in Redux*,
*its pretty safe to omit them in this case*.

<br />

#### 16. Implementing combineReducers() from Scratch

> Video: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch

In the previous lesson we learned to use the `combineReducers` function
which comes with Redux and generates one reducer
from several other reducers
delegating to them parts of the `state` tree.

To gain a *deeper* understanding of how *exactly* `combineReducers` works
we will *implement* it ***from scratch*** in this lesson.

`combineReducers` is a function so I'm writing a function declaration
and its' only argument is the *mapping* between `state` keys
and the reducers, so I'm just going to call it `reducers`.

```js
// const { combineReducers } = Redux;
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {} // empty initial nextState
    );
  };
};
```

The returned value is supposed to be a reducer its' self
so this is a function that returns another function
and the signature of the returned function is a reducer signature
it has the `state` and the `action`
now I'm calling the [`Object.keys` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) (*IE9+*) 
which gives me all the `keys` of the `reducers` `Object`
in our example this is `todos` and `visibilityFilter`
next I am calling the (Array) `reduce` method on the `keys`
because I want to produce a *single* value such as the `nextState`
by *accumulating* over every reducer `key`
and calling the *corresponding* reducer
each reducer passed to the combined reducers function is only responsible
for updating a *part* of the `state` 
this is why I'm saying that the `nextState` by the given `key`
can be calculated by calling 
the *corresponding* reducer by the *given* `key` with 
the *current* `state` by the *given* `key` 
and the `action`
the `Array.reduce` wants me to `return` the *next* accumulated value
from the callback so I am returning the `nextState` 
and I'm also specifying an *empty* `Object` as the *initial* `nextState`
*before* all the `keys` are processed. 
And there we have it this is a *working* re-implementation of 
`combineReducers` utility from Redux

Lets briefly *recap* how it works.
I'm calling `combineReducers` with an `Object`
who's values are the reducer functions 
and keys are the `state` fields they manage
inside the *generated* reducer I'm retrieving all the keys 
of the reducers I passed to `combineReducers` which is 
an `Array` of `Strings` (*spcifically*) 
`todos` and `visibilityFilter` (*in our example*).
I'm starting with an *empty* `Object` for my `nextState`
and I'm using the `Reduce` operation over these `keys` 
to fill it *gradually*.
Notice that I am *mutating* the `nextState` `Object` on every itteration
this is not a problem because it is an `Object` I created 
*inside* the reducer it is not something passed from *outside*
so reducer stays a "*pure*" function.
To calculate the `nextState` for a given `key` 
it calls the corresponding reducer function 
such as `todos` or `visibilityFilter` 
the *generated* reducer will pass to the *child* reducer 
only a *part* of its `state` by the `key`
so if its `state` is a *single* `Object`
its only going to pass the *relevant* part
such as `todos` or `visibilityFilter` 
depending on the *current* `key`
and save the result in the `nextState` by the same `key`

*Finally* we use the `Array.reduce` operation (*method*) 
with the *empty* `Object` as the *initial* `nextState` 
that is being filled on every itteration 
until it is the return value of the whole `.reduce` operation

In this lesson you learned how to implement the `combineReducers`
utility that comes with Redux from *scratch* 
it is not *essential* to use in Redux 
so it is *fine* if you don't fully understand how it works *yet* 
however it is a *good* [*great*!] idea to 
*practice* functional programming 
and *understand* that functions can take other functions 
and `return` other functions
because knowing this will help you get more productive in Redux
in the long term. 

<br />

#### 17. React Todo List Example (Adding a Todo)

> Video: https://egghead.io/lessons/javascript-redux-react-todo-list-example-adding-a-todo

In the *previous* lesson we learned how to split the "*root*" reducer
into *many* smaller reducers that manage *parts* of the `state` tree
and now we have a ready `todoApp` reducer 
that handles all the `actions` of our simple todo application.

So now it's time to *implement* the ***view layer***
and I'm going to use React in this example

I'm adding **React** and [React-DOM](https://facebook.github.io/react/docs/glossary.html) packages from the Facebook CDN 
and I'm also adding a div with `id='root'`
which is where I'm going to `render` my React application

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react-dom.min.js"></script>
```

Similar to the React *Counter* example from the 8<sup>th</sup> Lesson
I declare a `render` function that is going to update the DOM
in response to the *current* application `state`
and I'm going to `subscribe` to the `store` changes
and call `render` when ever the `store` changes 
and *once* to `render` the *initial* state:

```js
const { createStore } =  Redux;
const store = createStore(todoApp);

const render = () => {
  // gets expanded below ...
};

store.subscribe(render);
render();
```

And the *implementation* of the `render` method
is going to use React so its calling `ReactDOM.render`
for some `TodoApp` *component* I haven't written *yet*
and it renders it into the `div` I created inside the `html`
called `root`.

React provides a "*base*" `Class` for all components 
so I'm grabbing it from the React `Object` 
its called `React.Component`
and I'm declaring my own `TodoApp` component 
that `extends` the React "*base*" `Component`

```js
const { Component } = React;

class TodoAPP extends Component {
// filled out below ...
}

const render = () => {
  ReactDOM.render( 
    <TodoApp />,
    document.getElementById('root')
  );
};
```

This `Component` is only going to have a `render` function
and is going to return a `<div>` 
and *inside* the `<div>` I'm going to place a `<button>` saying "Add Todo"
but I don't want to add an `input` field *yet* to keep the example *simple*
at first so I'm dispatching the `ADD_TODO` `action` 
and I'm going to put `Test` as my `text` for the `action`
so it's going to keep adding todos with the `text` "Test".
and the `id` I need to specify a sequential `id` 
so this is why I'm declaring a *global* variable called `nextTodoId`
and I'm going to keep incrementing it.
so every time its going to emit (*dispatch an `action` with*) a *new* `id` 
and *finally* I aslo want to display a *list* of the todos
so, *assuming* that I have the todos injected as a `todos` prop
I will call `.map` and for every `todo` item I'm going to show a `<li>`
showing the text of that particular todo.

*Finally* because I need the `todos` as a `prop` 
I'm going to pass it to the `TodoApp` 
by reading the the *current* `store` `state`
and reading its `todos` field: 

```js
const { Component } = React;

let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    return (
      <div>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: 'Test',
            id: nextTodoId++
          });
        }}>
          Add Todo 
        </button> 
        <ul>
          {this.props.todos.map(todo => 
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render( 
    <TodoApp todos={store.getState().todos} />,
    document.getElementById('root')
  );
};
```

> Code snapshot for Video 17 @ 02:56:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/c44025b2ea3ed7f8cd4b1120c4aad7f98cce2c97/index.html#L81-L104)

If you open the file in your browser, you should expect to see:

![learn-redux-video-17-example](https://cloud.githubusercontent.com/assets/194400/12147411/a1bb3974-b490-11e5-8ab0-b011dfecc959.png)


You can see that there is a `<button>` "Add todo"
and any time I press it I see a *new* todo with the "Test" `text`.

Now I'm going to add an `input` inside my render function
and I'm using the React callback `ref` API where `ref` is a function
it gets the `node` corresponding to the `ref` 
and I'm saving that `node` in this case `this.input`
so I'm able to *read* the `value` of the `input` 
inside my event handler, I'm reading `this.input.value`
and I'm also able to *reset* that value 
*after* dispatching the `action` so that the field is cleared.

Now if I try to write something in the `input` field and press "Add Todo"
the `ADD_TODO` `action` is dispatched and the field is *cleared*.

Lets take a moment to recap how this application works.

It starts with the TodoApp React Component 
and this Component is not aware *exactly* how todos are being added
however it can express its desire to mutate the `state` 
by dispatching an `action` with the `type` `ADD_TODO`
for the `text` field it uses the *current* `input` value (`this.input.value`)
and it passes an *incrementing* `id` as the `id` of todo
every todo needs its own `id` and in this approach we are just going 
to increment the counter so it always gives us the next integer as `id`
it is common for React Components to dispatch `actions` in Redux apps
however it is *equally* important to be able to `render` the *current* `state`
my `TodoApp` Component assumes that it is going to receive todos 
as a `prop` and it *maps* over the todos to display a *list* of them.
using the `id` as a `key`.
This Component is being rendered in the `render` function 
that runs any time the `store` `state` changes, and *initially*. 
The `render` function reads the *current* `state` of the `store` 
and passes the todos `Array` that it gets 
from the *current* `state` of the `store`
to the `TodoApp` Component as a `prop`
the `render` function is called on every `store` change
so the `todos` prop is always up-to-date 
this was the *rendering* part of the Redux flow. 

Lets recap how *mutations* work in Redux:
any `state` change is caused by a `store.dispatch` 
call somewhere in the Component.
When an `action` is dispatched 
the `store` calls the *reducer* it was created with 
with the *current* `state` and the `action` being dispatched 
and in our case, this is the `todoApp` reducer
which we obtained by combining the `visibilityFilter` and the `todos` reducer.
It matches the `action` `type` in a `switch` statement 
and if the `action` `type` is `ADD_TODO` 
and indeed it is equal to `ADD_TODO` `String`
in this case it will call the "*child*" `todo` reducer,
passing it `undefined` because there is no `state` for a *new* todo
and the `action`.
We have a *similar* `switch` statement inside the `todo` reducer
and the `action` `type` is `ADD_TODO` which returns the 
*initial* `state` of the todo with the `id` and `text` from the `action`
and `completed` field set to `false`
the todos reducer that *called* it will return 
a *new* `Array` with all *existing* items 
and the *new* item added at the very end as a *new* todo
to the *current* `state`

*Finally* the combined reducer called `todoApp`
will use this *new* `Array` as the new value for the todos field 
in the *global* `state` `Object` 
so its going to return a *new* `state` `Object` 
where the todos field corresponds to the `Array` 
with the newly added Todo item.
The `todoApp` reducer is the "*root*" reducer in this application 
it is the one the `store` was created with. 
so its next state is the *next* `state` of the Redux `store` 
and all the *listeners* are notified 
the `render` function is *subscribed* to the `store` changes 
so it is called *again* and it gets the *fresh* `state` 
by calling `getState` and it passes the *fresh* todos to the Component 
re-rending it with the *new* data.

> Code at the *end* of Video 17:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/c7715af33d93b499d8e607b3bbd0d82505d941fd/index.html)

Which should look like this: (*when you open it in Chrome Canary*)

![learn-redux-video17-end-screenshot](https://cloud.githubusercontent.com/assets/194400/12149102/c2e4c7e2-b499-11e5-9c4a-0b61619addc4.png)

<br />

#### 18. React Todo List Example (Toggling a Todo)

> https://egghead.io/lessons/javascript-redux-react-todo-list-example-toggling-a-todo

In the last lesson we implemented a simple UI for the Todo List application
that is able to add *new* todos and view the *existing* todos in a list
to *add* the todos we dispatched the `ADD_TODO` `action`
and in *this* lesson we are going to the `TOGGLE_TODO` `action`
to *toggle* the *completed* `state` of the todos by clicking on them.

I'm scrolling down to my React Component and I've got a `<li>` here 
corresponding to the todo so I'm adding the `onClick` handler 
so when the user clicks on the list item I want to dispatch an `action` 
to my `store` with the `type` `TOGGLE_TODO` and the `id` 
of the todo being *toggled* which I get from the todo `Object`

The event handler *knows* which todo it corresponds to so it is able 
to pass its `id` in the `action`. 
In the user interface I want the completed todos to appear crossed out. 
so I'm adding the `style` attribute to the `<li>` 
and I'm going to use the `textDecoration` property 
which is going to be "line-through" (*strike-through*) 
when `completed` is `true` and *none* when `todo.compleded` is `false`
so I get a "normal" looking todo.
And now if I add a couple of todos
I can click on them and they are going to appear toggled:

```js
<ul>
  {this.props.todos.map(todo => 
    <li key={todo.id}
     onClick={() => {
      store.dispatch({
        type: 'TOGGLE_TODO',
        id: todo.id
      });
     }}
     style={{
      textDecoration: 
        todo.completed ? 
          'line-through' :
          'none'
     }}
     >
      {todo.text}
    </li>
  )}
</ul>
```

> Code snapshot for Video 18 @ 1:25:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/fbc9a10538f513d21e9b06a9db13f33af79f938f/index.html#L104-L116)

When you run it (*in Google Chrome Canary*) you should expect to see:

![video-18-at-1min25sec-screenshot](https://cloud.githubusercontent.com/assets/194400/12149808/a7565b22-b49d-11e5-87b5-a66dec698686.png)

... And I can *toggle* them back. Isn't that *satisfying*...?

Lets recap how *toggling* the todo actually *works*.
it starts with me dispatching the `TOGGLE_TODO` `action` 
inside my `onClick` handler with the `type` `TOGGLE_TODO` 
and the `id` which is the `id` of the todo being rendered 
I get the `todo` `Object` as an *argument* to the `Array.map` callback 
inside my `render` method where I render all the todos
when an `action` is dispatched the `store` will call the "*root*" reducer 
which will call the todos reducer with the `Array` of todos 
and the `action` and in *this* case the `action` `type` is `TOGGLE_TODO`
so the todos reducer delegates the handling of *every* todo 
to the `todo` reducer with a `.map` function to call it for *every* todo item.
 So the `todo` reducer receives the todo as `state` and the `action`
again we `switch` on the `action.type` and it matches `TOGGLE_TODO` `String`
and now for *every* todo who's `id` does not match the `id` specified 
in the `action` we just `return` the *previous* `state` 
that is the todo `Object` as it was 
*however* if the `id` of the todo matches 
the one *specified* in the `action` 
we are going to `return` a *new* `Object`
with all the properties of the *original* todo 
but with the `completed` field equal to 
the *opposite* value of what it was; 
e.g: `completed: !state.completed`

The updated todo item will be will be included in the todos field 
under the *new* application `state`
and because we `subscribe` the `render` function 
its going to get the *next* `state` of the application 
in `store.getState()`
and pass the *new* version of the todos to the `TodoApp` Component. 
Which is going to render the *updated* todos.

*Finally* the (CSS) `style` of the `<li>` 
depends on the `todo.completed` field which we just updated 
which is why it re-renders in a crossed-out `state`.


> Code at the *end* of Video 18:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/2c731d6b76fe74684968aa6153131354805a9568/index.html)

<br />

#### 19. React Todo List Example (Filtering Todos)
  
> Video: https://egghead.io/lessons/javascript-redux-react-todo-list-example-filtering-todos

In the previous two lessons we were working on creating the user-interface
for the Todo List Application that displays the todos 
lets us add new todos and "toggle" them `onClick`
we *implemented* that by dispatching `ADD_TODO` 
and `TOGGLE_TODO` `actions` 
that we already know how to handle in our reducers.

In *this* lesson we are going to dispatch `SET_VISIBILITY_FILTER` `action` 
and use the `visibilityFilter` *field* 
to *only* show the todos the *user* wants to see; 
either the *completed* todos, *active* todos 
or *all* the todos in the *current* `state`. 

I'm starting by creating a *new* Component, 
a *functional* Component called `FilterLink`
that user needs to click to switch the *current* visible todos. 
and the `FilterLink` accepts `filter` prop which is just a `String`
and the `children` which is the contens of the link. 
and its going to be a simple `<a>` ("*anchor*") tag 
that doesn't really *link* anywhere, 
its going to `prevent` the navigation when clicked 
and its going to dispacth and `action` 
with a `type` `SET_VISIBILITY_FILTER` 
and passing the `filter` prop 
so that the reducer knows which filter is being clicked. 
I will pass the `children` down to the `<a>` tag 
so the "consumer" can specify the `text` of the link 
Now I can use it in my `TodoApp` Component. 

Just below the todo list I'm adding a paragraph
where I'm going to offer the user the choice 
as to which todos should be *currently* visible 
by using the `FilterLink` Component I just created.
The `filter` prop is one of these possible values 
such as `SHOW_ALL` which corresponds 
to showing *every* todo in the `state`
`SHOW_ACTIVE` which means just show the todos
that are *not* completed yet,
and `SHOW_COMPLETED` which means show the *completed* todos.

```js
<p>
  Show:
  {' '}
  <FilterLink
    filter='SHOW_ALL'
  >
  All
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_ACTIVE'
  >
  Active
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_COMPLETED'
  >
  Completed
  </FilterLink>
</p>
```

So I'm *copy-pasting* the `FilterLink` 
and I'm changing the lables 
and the filters corresponding to it 
running this code will give me 3 different things
under the list of todos.
Clicking on them will change the `state.visibilityFilter` field
*however* it doesn't have *any* effect yet.
because we don't interpret the value of the `visibilityFilter`


I'm creating a *new* function 
that is going to help me filter the todos according to the 
the filter value, its called `getVisibleTodos`
it accepts two arguments: the `todos` and the `filter`
and it *switches* on the *current* `filter` value 
so if the `filter` is `SHOW_ALL`
its going to `return` all of the todos
but if the `filter` is `SHOW_COMPLETED` 
its going to call `todos.filter()` 
(*that is the `Array.filter` method*) 
to only return those todos that have `completed` set to `true` 
and `SHOW_ACTIVE` is going to be the *opposite* of that 
its going to `return` *only* those todos that 
where `completed` field is `false`.

```js
const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}
```

Now I need to *call* this function 
to `filter` the todos *before* rendering them
so in the `render` function of the `TodoApp` Component
I get the `visibleTodos` by calling the `getVisibleTodos`
with the `todos` and the `visibilityFilter` *values* from my props 
and I'm going to *use* the `visibleTodos` *instead* of
`this.props.todos` when I enumerate them for rendering. 

> Code snapshot for Video 19 @ 03:45: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/5e0622c277a37a478c887ba27e521474a5d480ad/index.html#L83-L128)

*Finally* I now use the `visibilityFilter` inside my `TodoApp` Component 
so I need to pass it as a prop
and I can do this *explicitly* 
but its *easier* just to "spread" over *all* the `state` fields 
so *every* property of the `state` `Object` is passed 
as a prop to the `TodoApp` Component 
this way it receives the `visibilityFilter` 
and if I *add* some todo items and then click on them
so I change their `completed` fields 
and then click on the `visibilityFilter` links 
the *currently* visible todos are rendered according 
to the *chosen* `visibilityFilter`. 

The links look all the same right now 
but we want to highlight the *chosen* one. 
To *implement* this, we're going to need the `visibilityFilter` prop 
which says which is the *current* one.
I'm changing the *beginning* of the `render` method 
to "*destructure*" the `todos` and `visibilityFilter` from the props 
so I can access them *directly* without typing `this.props` every time. 

> ***NOTE***: [**ES6** ***Destructuring assignment***](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
is ***not supported*** in Chrome yet, so I'm not using this in the code example.
> so Instead of:

```js
const {
  todos,
  visibilityFilter
} = this.props; // destructuring assignment
```

I'm using:

```js
const todos = this.props.tods, visibilityFilter = this.props.visibilityFilter
```

and I'm going to pass the `visibilityFilter` to every `FilterLink`
so it can *know* which `filter` is the *current* one 
and *apply* different styling 
if the `currentFilter` matches the `FilterLink`'s *own* filter. 

After passing the `currentFilter` prop to every `FilterLink` 
I go back to the `FilterLink` declaration and I'm adding
`currentFilter` as a prop to it and I'm adding a *condition* 
that says that when the `filter` is the `currentFilter` 
that is when the link is *active* 
I want to `return` a `<span>` instead of a link
because I don't want it to be *clickable*, 
I want it to be *static* text 
this completes the user-interface of our Todo List example 
it lets us *add* items, it lets us *view* items,
toggle them as *completed* 
and when we `switch` the `visibilityFilter` 
it displays only *relevant* todos 
and it *also* updates the link *appearance* 
so we see which link is *active*.

Lets recap how changing the `visibilityFilter` *works*
it starts with a dispatch call with an `action` 
of the `type: 'SET_VISIBILITY_FILTER'` 
and it passes `filter` which is a prop to the `FilterLink` Component 
so every one of those 3 links is going to have a different `filter` prop 
it passes in the `action`.
The `store.dispatch` function will call our *root* reducer with
the `state` and the `action` which in turn 
will call the `visibilityFilter` reducer 
with the *part* of the `state` and the `action`. 
Note that when the `action.type` is `SET_VISIBILITY_FILTER` 
it doesn't *care* for the *previous* `state` 
it just returns the `action.filter` as the *next* value, 
the next `state` of the `visibilityFilter` reducer 
the root reducer will *use* this new field as part of its *new*
`state` `Object` and because the `render` function is
*subscribed* to the `store` changes ( `store.subscribe(render);` ) 
its going to get this *new* `state` `Object` 
and pass all its keys as props to the `TodoApp` Component 
so the `TodoApp` Component will receive the todos 
and the *updated* `visibilityFilter` as its' props 
both its props are passed to the `getVisibleTodos` function 
which calculates the *currently* `visibleTodos` 
according to a list of *all* `todos` and the `visibilityFilter` 
and the `filter` is just a `String` saying
`SHOW_ALL`, `SHOW_COMPLETED` or `SHOW_ACTIVE` 
and the returned value is a *new* `Array` of todos 
that in some cases filters them and in some cases returns as is 
and the `SHOW_COMPLETED` and `SHOW_ACTIVE` are 
only different in their *predicates*. 

The `return` value is the `Array` of `visibleTodos` and it is used 
in the `render` function to actually enumerate every `todo`
and *render* it 
and the `visibilityFilter` field is also used byt the `FilterLink`
as the `currentFilter` because the `FilterLink` wants to know
whether its `filter` is the *current* one 
in order to `render` a `<span>` instead of a link (`<a>` tag). 
This is how clicking a link makes it appear selected 
and changes the *currently* displayed items in the list.

> Code at the *end* of Video 19:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/bebd3844c144ceb072365b4a4bf7b816124e9626/index.html)

<br />

#### 20. Extracting Presentational Components (Todo, TodoList)

> Video: https://egghead.io/lessons/javascript-redux-extracting-presentational-components-todo-todolist

In the last few lessons we created the user interface for a simple 
React and Redux Todo List where I can add items, toggle them 
as completed and change the *currently* visible Todos 
and we do that by having a *single* `TodoApp` Component 
that the `<input>`, the `<button>` for *adding* todos 
the *list* of *currently* visible todos with `onClick` handler 
and it has these 3 links that let us change 
the *currently* visible todos.
The *single* Component approach worked so far,
however we really want to have *many* components 
that can be used tested and changed by different people separately 
so we are going to re-factor our application in this lesson. 

The first Component I want to *extract* from the `TodoApp` Component 
is the `Todo` Component that renders a *single* `<li>`
I'm declaring the `Todo` Component as a function 
which React 0.14 allows me to do. 
I'm not *sure* which props its going to have 
so I will leave them blank for now 
and I will just *paste* the `<li>` I coppied before. 

The first thing I am doing is *removing* the special `key` property
because it's only needed when I am enumerating an `Array` 
and I will use it *later* when enumerating *many* todos. 
One of my goals with this refactoring is to make every Component
as flexible as it is *reasonable*.
Right now I have *hard-coded* that *clicking* a todo always
causes the `TOGGLE_TODO` `action` 
and this is perfectly fine to do in your app 
however I prefer to have a bunch of Components 
that don't specify any *behaviours* 
and that are *only* concerned with how things *look* 
or how they `render` and I call such Components 
the "*presentational*" Components 
I would like to keep `Todo` a "*Presentational*" Component 
so I *remove* the `onClick` handler and I promote it to be a prop 
so that anyone who uses the `Todo` Component 
can specify what happens on the *click* 
and you don't *have* to do this in your Redux apps 
but I find it to be a very *convenient* pattern. 
*Finally* while it does not make a lot of difference,
I prefer to keep it explicit what is the `data` 
that the Component needs to `render` 
so instead of passing a `todo` `Object` 
I pass `completed` and `text` fields as *separate* props. 
note: how the `Todo` Component 
is now a *purely* "*Presentational*" Component 
and does not specify *any* behaviour 
but it *knows* how to `render` a todo. 

```js
const Todo = ({
  onClick,
  completed,
  text
}) => (
<li 
  onClick={onClick}
  style={{
  textDecoration: 
    completed ? 
      'line-through' :
      'none'
  }}
 >
  {text}
</li>
);
```

The *next* Component I create is called `TodoList` 
and it's *also* a "*Presentational*" Component 
its *only* concerned with how things *look* 
and it accepts an `Array` of todos 
and is going to `render` an `<ul>` (*unordered list*) of them
by calling the todos `map` function (`Array.map`) 
and rendering a Todo component for every todo. 
it tells React to use `todo.id` as the unique `key` for the elements 
and it *spreads* over the `todo` `Object` properties 
so that `text` and `completed` end up as props on `Todo` Component 
now I need to *specify* what happens when a `Todo` is clicked 
and I *could* have dispatched an `action` here 
and again, that would be *fine* 
but I want it to be a "*Presentational*" Component 
so I'm going to call *another* function 
called `onTodoClick` and pass the `id` of the `todo` 
and let it decide what should happen 
so `onTodoClick` is another prop for the `TodoList` 
both `Todo` and `TodoList` are "*Presentational*" Components 
so we need something I call "*Container*" Components 
to actually pass the data from the `store` 
and to specify the behaviour

```js
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo 
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul> 
```

In this case the top-level `TodoApp` Component 
acts as a "*Container*" Components 
and we will see more examples of "*Container*" Components 
in the future lessons. 
In this case you just render the `TodoList` with `visibleTodos`
as the `todos` and with a callback that says 
that when `onTodoClick` is called with a `todo.id` 
we should dispatch an `action` on the `store` 
with the `type` `TOGGLE_TODO` and the `id` of the `todo`.

```js
<TodoList 
  todos={visibleTodos}
  onTodoClick={id =>
    store.dispatch({
      type: 'TOGGLE_TODO',
      id // where is id value?
    })
  } />
```

Let's recap again how this works:
The `TodoApp` Component renders a `TodoList` 
and it passes a function to it 
that can dispatch an `action` 
the `TodoList` Component renders the `Todo` Component 
and passes `onClick` prop which calls `onTodoClick` 
the `Todo` Component uses the `onClick` prop it receives 
and binds it to the `<li>` `onClick` 
this way when its called the `onTodoClick` is called 
and this dispatches the `action` and updates the `visibleTodos` 
because the `action` updates the `store`.

> Complete Code at the *end* of Video 20:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/3014d077563b3a7a195596d17bf2040d49a06ddb/index.html)

<br />

#### 21. Extracting Presentational Components (AddTodo, Footer, FilterLink)

> Video: https://egghead.io/lessons/javascript-redux-extracting-presentational-components-addtodo-footer-filterlink

In the previous lesson I extracted the `Todo` and `TodoList` 
Components from the `TodoApp` Component. 
In this lesson I will continue extracting 
other "*Presentational*" Components to separate the *looks* 
from the *behaviour*. 
Now I want to extract the `<input>` and the `<button>`
into a separate Component called `AddTodo`. 
I'm declaring `AddTodo` as a "*Functional* Component" 
that does not accept any props 
and I'm going to `return` these 
*copy-pasted*  `<input>` and `<button>` 
but I'm wrapping them in a `<div>` because 
a (React) Component needs to have a *single* root element. 

```js
const AddTodo = () => {
  return (
    <div>
      <input ref={node => {
        this.input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          text: this.input.value,
          id: nextTodoId++
        });
        this.input.value = '';
      }}>
        Add Todo 
      </button> 
    </div>
  );
}
```

The *Functional* Components don't have instances 
however instead of using `this`, 
I can use a *local* variable called `input`
that I'm going to "*close over*" so that I can write to it 
in the callback ref and I can read from it in the event handler. 
Like previously I want it to be a "*Presentational*" Component 
and not specify behaviour 
so I'm just calling a function called `onAddClick` 
passing the *current* `input` value and I make `onAddClick` a prop 
so that the Component that *uses* `AddTodo` 
can specify what happens when `Add` button is clicked.

Again, the `TodoApp` Component acts as a "*Container*" Component 
for the `AddTodo` and it specifies that when the *add* `<button>` 
is clicked we should dispatch an action with the `type: 'ADD_TODO'` 
the corresponding `text` and the `nextTodoId`. 

The *last* Component I want to extract is the *footer* which contains 
all these three `FilterLink`. 
I'm creating a *new* "*Functional*" Component called `footer` 
and I'm not sure which props it needs so I skip them 
and I *paste* the markup. 
It seems that the `FilterLink` need the `visbilityFilter` 
so I add it as a prop.
I would like the `Footer` and the `FilterLink` to be 
"*Presentational*" Components 
however the `FilterLink` currently includes a `store.dispatch` call. 
I'm replacing it with an `onClick` call 
and I pass the `filter` as the single parameter 
for the calling Component's convenience 
I add `onClick` to the props and now I need to specify it 
every time `FilterLink` is used 
so I add `onFilterClick` to the `Footer` 
and I pass `onClick={onFilterClick}` for every link in the `Footer`
so what ever we pass to the `Footer` as `onFilterClick` prop is
going to end up in the `FilterLink` as `onClick`. 

```js
const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL' 
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
    All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE' 
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
    Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED' 
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
    Completed
    </FilterLink>
  </p>
);
```


Now I can use the `Footer` Component I just defined 
inside my `TodoApp` Component 
and I need to pass *two* props 
one of them is the `visibilityFilter` so it can highlight the *active* link 
and another prop is `onFilterClick` where I say that 
whenever a `Filter` is clicked I want to dispatch an `action` 
with the `type: 'SET_VISIBILITY_FILTER'` and the `filter` being clicked.

```js
// inside the TodoApp Component:

  <Footer 
    visibilityFilter={visibilityFilter} 
    onFilterClick={filter =>
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      })
    }
  />

// see index.html for full TodoApp
```

*Finally* I just noticed that the `TodoApp` Component doesn't actually
*have* to be a `Class`, I can turn it into a `function` 
and I prefer to do that when possible. 
Instead of `destructuring` the props inside the `render` method
I am now doing it inside the arugments.
I can remove now the `destructuring` and I can also remove
the `render` method declaration 
the `visibleTodos` are only used in a *single* place 
so I'm moving the `getVisibleTodos` call 
to the `TodoList` `todos` prop declaration. 

Now the body of my function is just a *single* expression 
so I can get rid of the `return` statement 
and *un-indent* the code to make it look nicer. 

> Full code snapshot for Video 21 @ 04:12:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/6577aa2eb0256fca4aba7bf1694d998e9f128100/index.html)

> *This version of `TodoApp` is *so* ***much cleaner***... **IMO**.

This concludes the *initial* refactoring of the Todo List Application 
into a single "*Container*" Component called `TodoApp` 
and many "*Presentational*" Components that are 
only concerned with how things *look*.

Lets re-cap the *data* flow in this example:
We have a *single* "*Container*" Component called `TodoApp` 
and we re-render it any time the `store` changes 
it receives the `keys` of the *global* `state` `Object` as the props 
so it receives the `todos` and the `visibilityFilter` values 
the *first* Component it renders is called `AddTodo`. 
`AddTodo` is a "*Presentational*" Component that 
renders an `<input>` and a `<button>` 
and when the `<button>` is *clicked* it passes the *current* `<input>` value 
to the `onAddClick` function.
`onAddClick` function is a prop for the `AddTodo` Component 
in this case it is *specified* by the `TodoApp` 
which says that when the `<button>` is clicked it should dispatch an `action` 
containing the *current* `text` in the `action` `Object`. 
Dispatching the `ADD_TODO` `action` will call our reducer 
update the `store` `state` with the new todos 
and re-render the `TodoApp` Component with the new todos. 
The todos themselves are rendered by the `TodoList`
"*Presentational*" Component that receives two props:
the *currently* visible todos and the `onTodoClick` callback 
the `TodoList` Component receives an `Array` of todos 
and it *maps* over them rendering individual `Todo` Components 
it uses the *spread* operator to pass every property of the todo `Object` 
as a prop to `Todo` Component 
and it specifies the `onClick` handler as calling `onTodoClick` 
with the `id` of the particular todo 
the `Todo` Component is defined above 
and it is also a "*Presentational*" Component 
so it doesn't specify the behaviour 
it says that when a `<li>` is *clicked* 
it should call the `onClick` handler 
being a "*Presentational*" Component it specifies how the Component *looks* 
in different circumstances 
and in this case it uses the `completed` prop 
to chose between two different styles of the todo item 
the `TodoList` is also a "*Presentational*" Component 
so it delegates actually *handling* the *click* to `onTodoClick` prop 
and it pass the `id` of the todo being *clicked*.

*Finally* the `TodoApp` reacts to it by dispatching an `action` 
containing the `id` of the todo clicked and the `type: 'TOGGLE_TODO'`
the `store` will call our reducer and update the `state` of the application 
re-rendering the `TodoApp` Component with the *new* todos. 

The `Footer` Component receives the *current* `visibilityFilter` as a prop 
and also receives the `onFilterClick` callback that sets 
the *current* `visibilityFilter`. 
The `Footer` Component renders *three* `FilterLink` 
passing down their respective `filter` values 
the `onClick` handler and the *current* `visibilityFilter` 
the `FilterLink` Component being a "*Presentational*" Component 
doesn't know *what* to do when it is *clicked*. 
so it calls the `onClick` callback passing the `filter` 
which is different for each of those links as an *argument* 
the `Footer` delegates handling the *click* of the `FilterLink` 
to its own prop called `onFilterClick`. 

*Finally* the `TodoApp` Component being the "*Container*" Component 
in our application specifies the *behaviour* 
which in this case means that when the `FilterLink` is *clicked* 
it should dispatch and `action` with the `action` 
`type: 'SET_VISIBILITY_FILTER` and the *new* `filter`. 

Separation of the "*Presentational*" Components is *not required* in Redux.
But I *recommend* this pattern because it de-couples your rendering from Redux. So if you later chose to move your project to another framework 
such as Relay you will not have to *change* all your components 
because you can keep all your "*Presentational*" Component exactly the same. 

This approach also has *downsides* such as that you have to 
thread a lot of props through the Components to get them 
to the "*leaf*" Components including the callbacks 
this problem can be *easily* solved by introducing 
many intermediate "*Container*" Components as we will see in the next lesson. 

> Code at the *end* of Video 21:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/9a791dbc032e0c945a4c82a0c8b9fd8bd027a2be/index.html)


<br />


