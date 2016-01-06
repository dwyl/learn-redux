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


#### 27. Generating Containers with `connect()` from React Redux (VisibleTodoList)

> Video: https://egghead.io/lessons/javascript-redux-generating-containers-with-connect-from-react-redux-visibletodolist


In the previous lesson I added `ReactRedux` bindings to the project 
and I used the `Provider` Component from `ReactRedux` 
to pass the `store` down the `context` 
so that the *Container* Components can *read* the `store` 
from the `context` and `subscribe` to its' changes. 
All *Container* Components are *very similar*, 
they need to *re-render* when the `store` `state` changes 
they need to `unsubscribe` from the `store` when they `Unmount`. 
and they take the *current* `state` of the Redux `store` 
and use it to `render` the *Presentational* Components 
with some `props` that they *calculate* from the `state` of the `store` 
and they *also* need to *specify* the `contextTypes` 
to get the `store` from the `context`. 

I'm going to write this Component in a *diferent* way now: 
and I'll declare a function called `mapStateToProps` 
which takes the Redux `store` `state` 
and returns the `props` that I need to pass to the 
*Presentational* `TodoList` Component 
to `render` it with the *current* `state`. 
In this case there is just a *single* `prop` called `todos` 
so I *copy-paste* this expression: 

```js
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};
```
It returns the `props` that *depend* on the *current* 
`state` of the Redux `store` 
so in *this* case this is just the `todos` prop. 

I'm creating another function 
that I call `mapDispatchToProps` 
and it accepts the `dispatch` method from the `store`
as the *only* argument and returns 
the `props` that should be passed to the `TodoList` Component 
and that *depend* on the `dispatch` method. 
The *only* `prop` that uses `store.dispatch` 
is called `onTodoClick` 
so I'm *copy-pasting* [*cut-and-pasting*] `onTodoClick` 
into `mapDispatchToProps`. 
Note that I don't have the reference to the `store` here *anymore* 
so instead I'm changing it to use *just* the `dispatch` 
which is provided as an *argument* to `mapDispatchToProps` 
"I will add some *punctuation* to make it *appear* easier on my eyes"
[*brackes around the `id` argument 
& curly-braces around the function block*]
`onTodoClick` is a function that accepts the `id` 
of the `todo` and dispatches an `action`. 

```js
const mapDispatchToProps = (dispatch) => {
  return { 
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  };
}
```

Now I've got two different functions:
The *first* one *maps* the Redux `store` `state` 
to the `props` of the `TodoList` Component 
that are *related* to the *data* from the Redux `store` 
the *second* function maps the `dispatch` method of the `store` 
to the callback `props` of the `TodoList` Component 
it specifies the *behaviour* 
that is which callback `prop` dispatches which `action`. 

Together these two functions describe the a *Container* Component 
*so* well that instead of *writing* it 
I can *generate* it by using the `connect` function 
provided by the `ReactRedux` Library: 

```js
const { connect } = ReactRedux;
```
If you use `npm` and `Babel` you will 
likely *import* it like *this* instead:

```js
import { connnect } from 'react-redux'
```
"*and don't forget the curly braces*..." 
[*destructuring assignment of the `connect` method from the `react-redux` package*]

Now, instead of declaring a `class` I'm going to declare a `variable` 
and I will call the `connect` method to *obtain* it. 
I'm passing `mapStateToProps` as the *first* argument, 
and `mapDispatchToProps` as the *second* argument. 
And notice that this is a 
["*curried*"](https://github.com/iteles/Javascript-the-Good-Parts-notes#curry) 
function so I have to call it once *again* 
and this time I pass the *Presentational* Component 
that I want it to *wrap* and pass the `props` to. 

```js
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
```

The `connect` function will *generate* the Component 
will *generate* the Component just like the one 
I *previously* wrote by *hand* 
so I don't want you to write the *code* 
to `subscribe` to the `store` or to *specify* the `contextTypes` 
because the `connect` function takes care of that. 

> At 03:27 Dan *deletes* the "old" `VisibleTodoList` Component 
and its `contextTypes` definition which 
are *both* now being *generated* by the `connect` call.

Now lets re-cap how to *generate* the *Container* Component 
using the `connect` function: 
 
*First* I write a `function` called `mapStateToProps` 
that takes the `state` of the Redux `store` 
and returns the `props` for the *Presentational* Component 
calculated from it. 
These `props` will be *updated* any time the `state` changes 
*Next* I write a `function` that I call `mapDispatchToProps` 
it takes the `store.dispatch` method as it's *first* argument 
and it returns the `props` that *use* the `dispatch` method 
to `dispatch` *actions*, 
so it *returns* the calback `props` 
needed for the *Presentational* Component. 

To create a *Container* Component from them, 
I *import* `connect` from the `ReactRedux` library 
and I *call* it passing `mapStateToProps` 
as the *first* argument and `mapDispatchToProps` 
as the *second* argument. 
*Finally*, I close the function call parens, 
and I *open* another [*pair of*] parentheses 
because this is a *curried* function and it needs to be 
*called* ***twice*** 
and the last argument is the *Presentational* Component 
that I want to *connect* to the Redux `store`. 
The *result* of the `connect` call 
is the *Container* Component 
that is going to `render` my *Presentational* Component 
it will calculate the `props` to pass to the 
*Presentational* Component by merging the objects 
returned from `mapStateToProps`, `mapDispatchToProps` 
and its *own* `props`. 




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

## Todo: [![contributions welcome](https://img.shields.io/badge/pull-request-welcome-brightgreen.svg?style=flat)](https://github.com/nelsonic/learn-redux/issues)

+ [ ] Explain why ***Unidirectional Data Flow*** is this "better" than bi-directional e.g: Angular.js 

## Kudos to Fellow *DWYLers*

> Props to [Rafe](https://github.com/rjmk) for telling us about Redux and Elm: https://github.com/rjmk/reducks *before* it was *cool*   
> Thanks to [Milo](https://github.com/bananaoomarang) for his 
*fantastic* demo/example: https://github.com/bananaoomarang/isomorphic-redux  
(*which he has painstakingly kept up-to-date with the latest Redux/React versions!*)  
> and *love* to [Niki](https://github.com/nikhilaravi) for her 
*enthusiasm* and *patience* while explaining it all to us ... 
