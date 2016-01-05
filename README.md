![learn-redux-header](https://cloud.githubusercontent.com/assets/194400/12205940/0c75bc34-b636-11e5-91b5-1e9a3a104400.png)

# Learn Redux

Learn how to use Redux to write Predictable / Testable web apps.

> Note: these notes are aimed at people who already have "***intermediate***" ***JavaScript experience***.  
> If you are just starting out on your programming journey, we recommend you read:  
> [https://github.com/nelsonic/***learn-javascript***](https://github.com/nelsonic/learn-javascript)
> ***first***
and *then* come *back* here!  
> :star: this GitHub repo so you don't forget where it is!


## Why?

Redux is a *very* ***elegant*** way 
to **structure** JavaScript web applications.
While there is an ***initial learning curve*** we feel the *simplicyt*
of the *single* `store` (*snapshot of your app's state*) 
offers a ***significant***
**benefit** over other ways of organising your code.

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

> See: https://en.wikipedia.org/wiki/Immutable_object

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
[egghead.io_**video_tutorial**_***notes***.md](https://github.com/nelsonic/learn-redux/blob/master/egghead.io_video_tutorial_notes.md)

If you have the notes open while you are watching the videos you can
go a *lot* faster.  

*Please* give feedback and suggest improvements by creating issues on GitHub:
https://github.com/nelsonic/learn-redux/issues
*Thanks*!

#### 25. Passing the Store Down Implicitly via Context

> Video: https://egghead.io/lessons/javascript-redux-passing-the-store-down-implicitly-via-context

In the previous lesson we got rid of the top-level `store` variable 
and instead started passing the `store` as a `prop` to the `TodoApp` 
Component so *every* Component below received the `store` 
as a `prop`. And we even have to do this for *Presentational* Components 
because sometimes they contain *Container* Components 
that need the `store` to `subscribe` to the changes. 
We have to write a lot of "*boilerplate*" code 
to pass the `store` down as a `prop` 
but there is *another* way using the "*advanced*" React feature 
called "***Context***".

I'm creating a *new* Component called `Provider` 
and from its' `render` method it just returns what ever its' *child* is. 
So we can *wrap* any Component in a `Provider` 
and it's going to `render` that Component. 

```js
class Provider extends Component {
  render() {
    return this.props.children;
  }
}
```

I'm changing the `render` call 
to render a `TodoApp` inside the `Provider` 
and I'm moving the `store` `prop` from the `TodoApp` 
to the `Provider` Component.

```js
ReactDOM.render( 
  <Provider store={createStore(todoApp)}>
  <TodoApp />,
  </Provider>
  document.getElementById('root')
);
```

The `Provider` Component will use the React 
*advanced* ***Context*** Feature to make the `store` 
available to *any* Component inside it 
including "*Grand Children*". 
To do this it has to define a special method called 
`getChildContext` that will be *called* by React. 
We are using `this.props.store` which corresponds to 
`store` passed to the `Provider` as a `prop` just *once*.
*this* `store` will be part of the *Context* 
that the `Provider` specifies 
for any "*Children*" and "*Grand Children*" 
so the `TodoApp` is going to receive this *Context* 
and any Component inside `TodoApp` is going to receive 
this *Context* `Object` with the `store` inside it. 
However there is an *important condition* for the *Context* to work, 
and this *condition* is that you have to specify 
`childContextTypes` on the Component that defines 
`getChildContext` these are just `React.PropTypes` definitions 
but *unlike* `PropTypes`, the `ChildContext` Types are ***essential*** 
for the *Context* to be turned on. 
If you don't specify them, no *Child* Components 
will receive this *Context*. 

The *Container* Components *currently* access `store` by `props` 
but we are going to change this to read the `store` from React *Context* 
and to do that we just refer to `this.context` 
similarly in the `render` method I'm also going to *read* the `store` 
from the *Context* instead of the `props`:

```js
const store = this.context.store; // no ES6 required.
```

*Finally* the *Context* is "*Opt In*" 
for the *receiving* Components *too* 
so you *have* to *specify* a special field called `contextTypes` 
which are *similar* to `childContextTypes` 
but in this case we are specifying which Context we
want to *receive* and not pass down. 

```js
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
```
If you *forget* to declare the `contextTypes` 
the Component will *not* receive the relevant Context 
so it is ***essential*** to remember to declare them.

What about the *functional* Components that don't have [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) 
(*JavaScript context*). 
It turns out that they *also* receive the Context 
but as a *second* argument *after* the `props` 
so I'm destructuring the *second argument* 
and getting the `store` from there 
and the *second argument* is the Context 


<br />

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
http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html - really good but takes 4h+!
+ Single source of truth: https://en.wikipedia.org/wiki/Single_Source_of_Truth
+ Redux Undo: https://github.com/omnidan/redux-undo


## Notes:

At the time of writing, the *minified* version of redux is **5.4kb** and has
No Dependencies.
[![Dependency Status](https://david-dm.org/rackt/redux.svg)](https://david-dm.org/rackt/redux)  
We like this. It means the Library is *self-contained* ("*stand-alone*") and you can read/understand it quite easily.

... Unidirectional Data Flow (*why is this better than bi-directional e.g: Angular.js*)

## Kudos

> Props to [Rafe](https://github.com/rjmk) for telling us about Redux and Elm: https://github.com/rjmk/reducks *before* it was *cool*   
> Thanks to [Milo](https://github.com/bananaoomarang) for his 
*fantastic* demo: https://github.com/bananaoomarang/isomorphic-redux  
> and *love* to [Niki](https://github.com/nikhilaravi) for her enthusiasm
while explaining it all to us ... 
