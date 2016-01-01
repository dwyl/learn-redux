# Learn Redux

Learn how to use Redux to write Predictable / Testable web apps.

> Note: these notes are aimed at people who already have "***intermediate***" ***JavaScript experience***.  
> If you are just starting out on your programming journey, we recommend you read:  
> [https://github.com/nelsonic/***learn-javascript***](https://github.com/nelsonic/learn-javascript)
> ***first***
and *then* come *back* here!  
> :star: this GitHub repo so you don't forget where it is!


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

> or you can run: [`index.html`]() (Snapshot for Video 14 @ 0:40)
> which has the following console *output*:

![learn-redux-output-of-video-14-console logs](https://cloud.githubusercontent.com/assets/194400/12122835/6dc1bc44-b3d5-11e5-8e4d-691bdd86f910.png)


Representing the *whole* `state` of the application 
as an `Array` of todos works for a *simple* example 
but what if we want to store *more* information?
For *example* we may want to let the user choose which todos 
are *currently* *visible* with a visibility filter
such as `SHOW_COMPLETED`, `SHOW_ALL` or `SHOW_ACTIVE`.

The `state` of the `visibilityFilter` is a *simple* `String`
representing the *current* filter
and it is *changed* by the `SET_VISIBILITY_FILTER` `action`.
To *store* this *new* information, I don't need to *change* 
the *exisiting* reducers, I will use the Reducer Composition Pattern
and create a *new* reducer that *calls* the existing reducers 
to manage parts of its state 
and combines the results in a *single* `state` `Object`
note that the first time it runs, it will pass `undefined` as the `state`
to the "*child*" reducers because the *initial* state 
of the *combined* reducer is an *empty* `Object`
so all its fields are `undefined` 
this gets the "*child*" reducers to return their *initial* `state`
and populates the `state` `Object` for the first time.

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
without running into each other and causing merge conflicts 

*Finally* I'm dispatching the `SET_VISIBILITY_FILTER` `action`
and you can see that it does not affect the todos 
but the `visibilityFilter` field has been updated. 


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
