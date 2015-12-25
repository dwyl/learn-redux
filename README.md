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
recoded by Dan Abramov = Creator of Redux for
[egghead.io](https://egghead.io/series/getting-started-with-redux)

<br />

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

#### 3. Pure and Impure Functions (*Principal 3*)

> Video: https://egghead.io/lessons/javascript-redux-pure-and-impure-functions

Pure functions depend solely on the values of the arguments.
Pure functions do not have any (*observable*) sideeffects such as network
or database calls. Pure functions just calculate the new value [of the state].

The functions you write in redux need to be pure.


#### 6. Store Methods: getState(), dispatch(), and subscribe()

> Video: https://egghead.io/lessons/javascript-redux-store-methods-getstate-dispatch-and-subscribe
x
Redux Store has 3 methods:

+ `dispatch` - used to instruct redux to
+


Try the [`index.html`]() in [**Chrome** ***Canary***](https://github.com/nelsonic/learn-redux/issues/5#issue-123923845)

## Background Reading / Watching / Listening

+ GitHub Project: https://github.com/rackt/redux
+ Online Documentation: http://redux.js.org/  
+ ***Interview*** with [@gaearon](https://github.com/gaearon) (*Dan Abramov - creator of Redux*)
on The **Changelog** Podcast: https://changelog.com/187 -
Good history and insight into his motivations for learning to program
and the journey that lead him to writing Redux.
+ Redux: Simplifying Application State in JavaScript -
https://youtu.be/okdC5gcD-dM (*good overview by* [**Tim Griesser**](https://github.com/tgriesser))
+ Full-Stack Redux Tutorial (Redux, React & Immutable.js) by
[@teropa](https://github.com/teropa)
http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html - really good but takes 2h+!
+ Single source of truth: https://en.wikipedia.org/wiki/Single_Source_of_Truth

+ Redux Undo: https://github.com/omnidan/redux-undo

> Props to [Rafe](https://github.com/rjmk) for telling us about Redux and Elm: https://github.com/rjmk/reducks

At the time of writing, the *minified* version of redux is 5.4kb and has
