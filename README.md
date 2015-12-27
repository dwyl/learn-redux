# Learn Redux

Learn how to use Redux to write Predictable / Testable web apps.

> Note: these notes are aimed at people who already have "***intermediate***" ***JavaScript experience***.  
> If you are just starting out on your programming journey, we recommend you read:  
> https://github.com/nelsonic/learn-javascript


## Why?

Redux is a *logical* way to write *simplified* front-end web applications.
While there is an ***initial learning curve*** we feel the *elegance*
of the single store (*snapshot of your app's state*) offers a significant
benefit over other ways of organising your code.

> *Please, don't take our word for it,
skim through the notes we have made and*
***always decide for yourself***.

## What?

Redux<sup>1</sup> *borrows the* ***reducer pattern*** *from*
[***Elm*** Architecture](https://github.com/evancz/elm-architecture-tutorial/)
which simplifies writing web apps.
If you have *never heard of Elm*, don't worry,
you don't need to go read another doc before you can understand this...
Just keep reading this page and (*hopefully*) everything will become clear.


<sup>1</sup> <small> ***Redux*** *the JavaScript Library should not to be confused with the Redux Framework [PHP framework](https://github.com/reduxframework/redux-framework)  
... naming collisions are inevitable in the world of code.
naming things is a [hard problem](http://martinfowler.com/bliki/TwoHardThings.html)*</small>

### Three Principals

Redux is based on three principals.  
see: http://rackt.org/redux/docs/introduction/ThreePrinciples.html

#### 1. *Single* Source of Truth

The state of your whole application is stored in a single object tree; the "Store".  
This makes it *much* easier to keep track of the "*State*" of your application
at any time and roll back to any previous state.

> If its not *intermediately* obvious why this is a good thing,
we *urge* you to have faith and keep reading...

#### 2. State is *Read-Only* ("*Immutable*")

Instead of directly updating data in the store, we describe the update
as a function which gets applied to the existing store and returns a new version.

#### 3. Changes are made Using *Pure Functions*

To change the state tree we use "*actions*" called "*reducers*",
these are simple functions which perform a *single* action.


<br />

#### tl;dr

Read more about JavaScript's Reduce (Array method):
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce  
and how to reduce an array of Objects:
http://stackoverflow.com/questions/5732043/javascript-reduce-on-array-of-objects  
understanding these two things will help you grasp why Redux is so simple.

You will see this abbreviated/codified as `(state, action) => state`  
to understand what this means, watch: [youtu.be/xsSnOQynTHs?t=15m51s](https://youtu.be/xsSnOQynTHs?t=15m51s)


## How?


### *Video Tutorials* by Dan Abramov (*the Creator of Redux*)

The *fastest* way to get started with Redux is to watch the video tutorials
recoded by Dan Abramov (Creator of Redux) for
[egghead.io](https://egghead.io/series/getting-started-with-redux)

We have made a set of *comprehensive* notes:

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

The final code for this video is:



##### Notes on using JSX Syntax in React Components in Browsers

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

Don't forget to add `type="text/jsx"` to your script in `index.html` 
to ensure that the JSX in the React Component is transformed.
see: http://stackoverflow.com/questions/28100644/reactjs-uncaught-syntaxerror-unexpected-token

## Background Reading / Watching / Listening

+ GitHub Project: https://github.com/rackt/redux
+ Online Documentation: http://redux.js.org/  
+ ***Interview*** with [@gaearon](https://github.com/gaearon) (*Dan Abramov - creator of Redux*)
on The **Changelog** Podcast: https://changelog.com/187 -
Good history and insight into his motivations for learning to program
and the journey that lead him to writing Redux.
+ Redux: Simplifying Application State in JavaScript -
https://youtu.be/okdC5gcD-dM (*good overview by* [**Tim Griesser**](https://github.com/tgriesser) December 2015)
+ Full-Stack Redux Tutorial (Redux, React & Immutable.js) by
[@teropa](https://github.com/teropa)
http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html - really good but takes 2h+!
+ Single source of truth: https://en.wikipedia.org/wiki/Single_Source_of_Truth

+ Redux Undo: https://github.com/omnidan/redux-undo

> Props to [Rafe](https://github.com/rjmk) for telling us about Redux and Elm: https://github.com/rjmk/reducks

At the time of writing, the *minified* version of redux is 5.4kb and has

... Unidirectional Data Flow (*why is this better than bi-directional e.g: Angular.js*)
