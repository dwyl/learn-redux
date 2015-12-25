# Learn Redux

Learn how to use Redux to write Predictable / Testable web apps.

> Note: these notes are aimed at people who already have some JavaScript experience.
> If you are still starting out, we recommend you read:


## Why?

Redux is a *logical* way to write *simplified* front-end web applications.
While there is an ***initial learning curve*** we feel the *elegance*
of the single store (*snapshot of your app's state*) offers a significant
benefit over other ways of organising your code.

> *Please, don't take my/our word for it,
skim through the notes we have made and*
***decide for yourself***.

## What?

Redux (the JavaScript Libarary - *not to be confused with
  https://github.com/reduxframework/redux-framework the PHP framework...*) *borrows the* ***reducer pattern*** *from*
[***Elm***](https://github.com/evancz/elm-architecture-tutorial/)
which simplifies writing web apps.

At the time of writing, the *minified* version of redux is 5.4kb and has


### Three Principals

#### 1. *Single* Source of Truth

The state of your whole application is stored in a single object tree; the "Store".
This makes it *much* easier to keep track of the "*State*" of your application
at any time and roll back to any previous state.


#### 2. State is *Read-Only* ("*Immutable*")

Instead of directly updating data in the store, we describe the update
as a function which gets applied to the existing store and returns a new version.

#### 3. Changes are made Using *Pure Functions*

`(state, action) => state` see: [youtu.be/xsSnOQynTHs?t=15m51s](https://youtu.be/xsSnOQynTHs?t=15m51s)

To change the state tree we use "*actions*" called "*reducers*",
these are simple functions which perform a *single* action.

Read more about JavaScript's Reduce (Array method):
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce  
and how to reduce an array of Objects:
http://stackoverflow.com/questions/5732043/javascript-reduce-on-array-of-objects  
ensure you understand these two things before proceeding.

> see: http://rackt.org/redux/docs/introduction/ThreePrinciples.html

## How?

<br />

### *Video Tutorials* by the Creator of Redux

Dan Abramov recorded a series of videos tutorials for
[egghead.io](https://egghead.io/series/getting-started-with-redux)


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

+ Redux Undo: https://github.com/omnidan/redux-undo
