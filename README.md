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
While there is an ***initial learning curve*** we feel the *simplicity*
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
If you have *never heard of Elm*, ***don't worry***,
you *don't need* to go read another doc before you can understand this...
Just keep reading this page and (*hopefully*) everything will become clear.

> _If **anything** is **unclear**, 
**please tell us** where you are stuck **so we can help**_!


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


#### 30. Extracting Action Creators

> Video: https://egghead.io/lessons/javascript-redux-extracting-action-creators

So far we have covered the *Container* Components 
the *Presentational* Components, 
the Reducers and the `store`, 
but we have not covered the concept of `action` *Creators* 
which you might see in the Redux *talks* and *examples*. 

Let's consider the following example: 
I `dispatch` the `ADD_TODO` `action` 
from inside the `<button>` `onClick` handler 
and this is "*fine*", 
however it references the `nextTodoId` variable 
which I declare along side the `AddTodo` Component 
*normally* it would be *local* 
however what if another componet wants to `dispatch` 
the `ADD_TODO` `action` ? 
It would need to have access to the `nextTodoId` somehow 
and while I *could* make this variable *GLOBAL* 
it's *not* a very good idea ... 
instead it would be *best* if the Components 
dispatching the `ADD_TODO` `action` 
did not have to *worry* about specifying the `id` 
because the only information they *really* pass 
is the `text` of the `todo` being added 
I don't *want* to generate the `id` inside the *reducer* 
because that would make it *non-deterministic* 
however I can extract this code 
generating the `action` `Object` 
into a function I will call `addTodo` 
I pass the `input.value` to `addTodo` 
and `addTodo` is just a function that takes 
the `text` of the `todo` and constructs an `action` `Object` 
representing `ADD_TODO` `action`. 
So it has the `type: 'ADD_TODO'`, 
it takes care of *generating* the `id` 
and it includes the `text`. 

```js
let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text // implied value from function argument
  }
}
```

Although extracting such function is not required 
it is a very common pattern in Redux applications 
to keep them *maintainable* 
so we call these functions `action` *Creators* 
and we usually place them separately from Components 
or from *Reducers*. 

I will now *extrac* other `action` *Creators* from the Components 
and I see that I have a `SET_VISIBILITY_FILTER` in a `dispatch` here 
[*in the `mapDispatchToLinkProps` method*] 
so I will change this to call the `setVisiblityFilter` 
`action` *Creator* with the `ownProps.filter` as the argument 
and it's going to `return` the `action` 
that needs to be `dispatched` 
so I'm declaring the `setVisibilityFilter` function 
this is what I call an `action` *Creator* because 
it takes the arguments *about* the `action` 
and it returns the `action` `Object` 
with the `type: 'SET_VISIBILITY_FILTER'` 
and the `filter` its' self. 

```js
cosnt setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter // implied value from argument
  }
}
```

You might think that this kind of code is "*boiler plate*" 
and you would rather `dispatch` the `action` in-line 
inside the Component 
however don't *underestimate* how `action` *Creators* 
*document* your software because they tell your *team* 
what kinds of *actions* the Components can `dispatch` 
and this kind of information can be *invaluable* 
in *large* applications. 

I will now scroll down to the *last* place where I call `dispatch` 
with an *in-line* `action` `Object` 
[*the `mapDispatchToTodoListProps` function*]
and I will *extract* that to add `toggleTodo` `action` *Creator* 
to which I pass the `id` of the `todo` as the argument. 

I'm now scrolling up to my `action` *Creators* 
and I will add a new one that I call `toggleTodo` 
it accepts the `id` as the argument 
and it returns the `action` with the `type: 'TOGGLE_TODO'`
and this `id`:

```js
const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id // inferred value from argument
  };
};
```

Lets take a moment to consider how *convenient* it is 
to have all the `action` Creators in a single place 
so that I can use them from Components and Tests 
without worrying about the *actions* internal structure. 

Note that whether you use `action` Creators or *not* 
the *data flow* is *exactly* the same 
because I just calle the `action` Creator to get 
the `action` `Object` and then I call `dispatch` 
just like I did *before* passing the `action`. 


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

At the time of writing, the *minified* version of redux is 
[**5.4kb**](https://github.com/nelsonic/learn-redux/issues/11#issue-124671091) 
and has
No Dependencies.
[![Dependency Status](https://david-dm.org/rackt/redux.svg)](https://david-dm.org/rackt/redux)  
We *like* this. It means the Library is *self-contained* ("*stand-alone*") and you can read/understand it quite easily.

## Todo: [![pull requests welcomed!](https://img.shields.io/badge/pull%20requests-welcomed-brightgreen.svg?style=flat)](https://github.com/nelsonic/learn-redux/issues)

+ [ ] Explain why ***Unidirectional Data Flow*** is this "better" than bi-directional e.g: Angular.js 

## Kudos to Fellow *DWYLers*

> Props to [Rafe](https://github.com/rjmk) for telling us about Redux and Elm: https://github.com/rjmk/reducks *before* it was *cool*   
> Thanks to [Milo](https://github.com/bananaoomarang) for his 
*fantastic* demo/example: https://github.com/bananaoomarang/isomorphic-redux  
(*which he has painstakingly kept up-to-date with the latest Redux/React versions!*)  
> and *love* to [Niki](https://github.com/nikhilaravi) for her 
*enthusiasm* and *patience* while explaining it all to us ... 
