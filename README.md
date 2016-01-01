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
> Note that the tests from the *previous* video still pass
after we have created the `todo` reducer, 
because the *functionality* has not changed, 
its merely been separated to simplify the *main* reducer.

> Code at the end of Video 13: 
[`index.html`]()

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
