
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

#### 3. Pure and Impure Functions

> Video: https://egghead.io/lessons/javascript-redux-pure-and-impure-functions

Pure functions depend solely on the values of the arguments.
Pure functions do not have any (*observable*) side-effects such as network
or database calls. Pure functions just calculate the new value [of the state].

The functions you write in redux need to be pure.

#### 4. The Reducer Function (*Principal 3*)

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
(*Yes, there's a developer with that name...*)
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

We add a test that check how `DECREMENT` works; from 2 to 1 and from 1 to zero:

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

<br />

