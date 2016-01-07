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


#### 29. Generating Containers with connect() from React Redux (FooterLink)

> Video: https://egghead.io/lessons/javascript-redux-generating-containers-with-connect-from-react-redux-footerlink

*Finally* let's take a look at the `FilterLink` 
*Container* Component that renders a `Link` with an `active` property 
and a *click* handler. 
*First* I will write the `mapStateToProps` function 
which I will call `mapStateToLinkProp` 
because I have everything in a *single* file. 
And it's going to accept the `state` of the Redux `store` 
and `return` the `props` that should be passed to the `Link` 
and we only have a *single* such `prop` called `active` 
that determines whether the link displays 
the *current* `visiblityFilter`. 
When I *paste* this *expression* from the `render` method 
I see that it references the `filter` prop 
of the `FilterLink` Component. 
To tell whether a link is *active* we need to 
compare this `prop` with with the `visibilityFilter` 
from the Redux `store` `state` 
it is fairly common to use the *Container* `props` 
when calculating the *Child* `props` 
so this is why `props` are passed as a *second* argument 
to `mapStateToProps` [*or in this example `mapStateToLinkProps`*]
I will re-name it [*the `mapStateToLinkProps` second argument*] 
to `ownProps` to make it clear that 
we are talking about the *Container* Component's *own* `props` 
and not the `props` that are *passed* to the *Child* 
which is the `return` value of `mapStateToLinkProps` 

```js
const mapStateToLinkProps = ( 
  state,
  ownProps
) => {
  return {
    active: 
      ownProps.filter ===
      state.visibilityFilter  
  }
} 
```

The second function I'm writing here is `mapDispatchToProps` 
or to avoid name clashes in the JSBin [*single file app*]
`mapDispatchToLinkProps`. 
The only argument so far is the `dispatch` function 
and I'm going to need to look at the *Container* Component 
I wrote by hand to see what `props` depend on the `dispatch` function. 
In this case this is just the `onClick` handler 
where I `dispatch` the `SET_VISIBILITY_FILTER` `action`. 
the only `prop` I'm passing down is called `onClick` 
and I declare it as an **ES6** [***Arrow Function***]() 
with no arguments and I *paste* the `dispatch` call. 

```js
const mapDispatchToLinkProps = (
  dispatch
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: props.filter
      });
    }
  };
}
```

But it references the `props` *again*, 
so I need to add `ownProps` as an *argument* 
the *second* argument to `mapDispatchToLinkProps` function 
thus: 

```js
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}

*Finally* I will call the `connect` function from `ReactRedux` Library 
to generate the `FilterLink` *Container* Component 
I pass the relevant `mapStateToProps` function 
as the *first* argument [*in our case `mapStateToLinkProps`*] 
the `mapDispatchToProps` as the *second* argument 
[*or `mapDispatchToLinkProps` in our case*] 
and I call the function *again* with the `Link` Component 
which should be *rendered*:

```js
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);
```

Now I can *remove* the "*old*" `FilterLink` implementation 



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
