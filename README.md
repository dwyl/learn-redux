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


#### 15. Reducer Composition with combineReducers()

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




##### Read more about ES6 Object Litteral *Shorthand* Notation

+ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015
+ Good examples: http://eslint.org/docs/rules/object-shorthand.html (*by Nicholas C. Zakas*)

> ***NOTE***: as *usual*, while **ES6** Object Litteral *Shorthand* Notation is a *Standard* it is *still* not implemented in the *majority* of web browsers:

![es6-object-literal-shorthand-notation](https://cloud.githubusercontent.com/assets/194400/12127256/0d4190d8-b3ee-11e5-9191-8c4a532ad59f.png)

> *I have a* ***strong bias*** *towards* ***explicitly*** 
*typing the* ***Values*** *in an `Object` litteral for clarity*.
*But given the* ***naming convention*** *in Redux*,
*its pretty safe to omit them in this case*

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
