![learn-redux-header](https://cloud.githubusercontent.com/assets/194400/12328626/12f025de-bad4-11e5-9ebd-c0994b8f2f24.png)

# Learn Redux

Redux simplifies writing **well-structured**, ***predictable***, ***testable*** & ***maintainable*** JavaScript Web Applications.

> **Note**: this guide is aimed at people who already have "***intermediate***" ***JavaScript experience***.
> e.g. you have already built a couple of small apps without
> using a framework and/or have used an older more complex library such as Angular, Ember, Backbone or Flux.
> If you are just *starting* out on your web programming journey,
> we *recommend* you checkout:
> [https://github.com/dwyl/start-here#**javascript**](https://github.com/dwyl/start-here#javascript)
> ***first***
and *then* come *back* here!  
> Bookmark/Star this GitHub repository so you don't forget where it is!


## Why?

![xkcd code quality](https://imgs.xkcd.com/comics/code_quality.png)

JavaScript web applications can become messy if
they don't have a *clear* organisation from the beginning.

**Redux** is an ***elegant*** way
to ***structure*** your **JavaScript web applications**.  

Having built *many* web applications over the past few years
using *all* the most popular frameworks/libraries, we were *delighted*
to discover Redux's *refreshingly simple approach*.

While there is an ***initial learning curve***
we feel the *simplicity*
of the *single* `store` (*snapshot of your app's state*)
and applying changes to your app
by *dispatching* succinct *functional* ***actions***
offers a ***significant***
**benefit** over other ways of organising your code.

> *Please, don't take our word for it,
skim through the notes we have made and*
***always decide for yourself***.

## What?

Redux[<sup>1</sup>](https://github.com/dwyl/learn-redux/issues/22) *borrows the* ***reducer pattern*** *from*
[***Elm*** Architecture](https://github.com/evancz/elm-architecture-tutorial/)
which simplifies writing web apps.  
If you have *never heard of Elm*, ***don't worry***,
you *don't need* to go read another doc before you can understand this...
Just keep reading and (*hopefully*) everything will become clear.

> _If **anything** is **unclear**,
**please tell us** where you are stuck **so we can help**_!
[![Join the chat at https://gitter.im/dwyl/chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dwyl/chat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)



### Three Principals

Redux is based on three principals.  
see: https://redux.js.org/understanding/thinking-in-redux/three-principles

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

#### 3. Changes are made Using *Pure Functions*

To change the state tree we use "*actions*" called "*reducers*",
these are simple functions which perform a *single* action.


<br />

#### tl;dr

Read more about JavaScript's Reduce (Array method):
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce  
and how to reduce an array of Objects:
https://stackoverflow.com/questions/5732043/javascript-reduce-on-array-of-objects  
understanding these two things will help you grasp why Redux is so simple.

You will see this abbreviated/codified as `(state, action) => state`  
to understand what this means, watch: [youtu.be/xsSnOQynTHs?t=15m51s](https://youtu.be/xsSnOQynTHs?t=15m51s)


## How?

### Learn Where Redux Got It's _Best_ Ideas From!

[Redux](https://github.com/dwyl/learn-redux) "_takes cues from_"
(_i.e. takes **all** it's **best ideas/features** from_) Elm.
![redux-borrows-elm](https://cloud.githubusercontent.com/assets/194400/25845941/c7a9ce78-34a7-11e7-91fb-a65f99ce0046.png) <br />
So... by learning **The Elm _Architecture_**,
you will **_intrinsically_ understand Redux** <br />
which will help you learn/develop React apps. <br />

We wrote a ***complete beginner's step-by-step introduction***
to **The Elm _Architecture_** for **JavaScript** developers: <br />
[github.com/dwyl/**learn-elm-architecture**-in-**javascript**](https://github.com/dwyl/learn-elm-architecture-in-javascript)

If _after_ you've learned Redux and built a couple of React Apps,
you decide you want to discover where all the _best_ ideas
in the React _ecosystem_ came from,
checkout: [github.com/dwyl/**learn-elm**](https://github.com/dwyl/learn-elm)



### Learn from the _Creator_ of Redux!

The *fastest* way to learn Redux is to watch the
[Introductory Video Tutorials](https://egghead.io/series/getting-started-with-redux)
recoded by **Dan Abramov** (*the Creator of Redux*). <br />
The videos are broken down into "bite size" chunks which are easily digestible.
Total viewing time for the videos is [**66 minutes**]()

We have made a set of ***comprehensive notes/transcriptions*** on the videos, these are in:
[egghead.io_**video_tutorial**_***notes***.md](https://github.com/dwyl/learn-redux/blob/master/egghead.io_video_tutorial_notes.md)  

We _recommend_ keeping the **notes** open in a distinct window/browser
while you are watching the videos; you can go a *lot* faster because all the sample code is included
and if for any reason you do not _understand_ what Dan is saying you have the notes to refer to.

![learn-redux-video-notes-side-by-side](https://user-images.githubusercontent.com/194400/30913122-fa9cc800-a386-11e7-9801-228bcc5e6512.png)

> *Please* give feedback and suggest improvements by creating issues on GitHub:
https://github.com/dwyl/learn-redux/issues
*Thanks*!


<br />

## Background Reading / Watching / Listening

+ GitHub Project: https://github.com/reduxjs/redux
+ Online Documentation: https://redux.js.org/  
+ ***Interview*** with [@gaearon](https://github.com/gaearon) (*Dan Abramov - creator of Redux*)
on The **Changelog** Podcast: https://changelog.com/187 -
Good history and insight into his motivations for learning to program
and the journey that lead him to writing Redux.
+ Smart and Dumb Components by [Dan Abramov](https://github.com/gaearon)
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
+ Redux: Simplifying Application State in JavaScript -
https://youtu.be/okdC5gcD-dM (*good overview by* [**Tim Griesser**](https://github.com/tgriesser) December 2015)
+ [Write Yourself A Redux](https://zapier.com/engineering/how-to-build-redux/) by Justin Deal/Zapier Engineering - Goes over the entire architecture and lets you build your own Redux _from scratch_! (April 27, 2017)
+ ***Ducks*** - a proposal for bundling reducers, action types and actions when using Redux - by [Erik Rasmussen](https://github.com/erikras)
https://github.com/erikras/ducks-modular-redux
+ Redux ***best practices*** by [Will Becker](https://github.com/wbecker) https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e
+ Starter boilerplate for a universal webapp using express, react, redux, webpack, and react-transform: https://github.com/erikras/react-redux-universal-hot-example
+ Full-Stack Redux Tutorial (Redux, React & Immutable.js) by
[@teropa](https://github.com/teropa)
https://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html - really good but takes 4h+!
+ Single source of truth: https://en.wikipedia.org/wiki/Single_Source_of_Truth
+ Redux Undo: https://github.com/omnidan/redux-undo
+ **Cartoon!** On Redux: https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6#.f9fhidgvl
+ ...And flux: https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207#.jdauhkpjg
+ ...And time travel debugging (this one's short)! https://code-cartoons.com/hot-reloading-and-time-travel-debugging-what-are-they-3c8ed2812f35#.cvkq7d5du

### Architecture

If you are building a React-based app
you will most likely be using [react-router](https://github.com/rackt/react-router)
to manage the routing of your client-side app ...
React-Router manages an important piece of your application state:
the URL. If you are using redux, you want your app state to fully
represent your UI; if you snapshotted the app state,
you should be able to load it up later and see the same thing.

+ Keep react-router and redux in sync: https://github.com/rackt/redux-simple-router
+ A Simple Way to Route with Redux (November 25, 2015) by [James Long @Mozilla](https://github.com/jlongster)
https://jlongster.com/A-Simple-Way-to-Route-with-Redux

### Size (*Matters*)

At the time of writing, the *minified* version of Redux is
[**5.4kb**](https://github.com/dwyl/learn-redux/issues/11#issue-124671091)
which is even *smaller* when GZipped!  


## Frequently Asked Questions (*FAQ*)

### (Do I *Need* to use) React ?

**Short Answer**: ***No***, Redux does not depend on or require you to use React; the two are separate and can be learned/used independently.

**Longer Answer**:
While *many* Redux apps and tutorials use React, Redux is ***totally separate*** from React. Dan's EggHead Video Tutorials do feature React heavily from **Lesson 8** *onwards*.

React is a *good* fit for rendering views in a Redux-based app, however there are many other *great* alternative component-based virtual-DOM-enabled view rendering libraries (*#mouth-full*) that work *really* well with Redux; e.g: https://github.com/anthonyshort/deku

Considering that React is *the* fastest growing "*view*" (*DOM Rendering*) library of 2015
and the pace of its' adoption looks set to *continue* in 2016
... so it won't *hurt* you to know *how* to use React.

We've made some notes to help you get started learning React:
https://github.com/dwyl/learn-react

You can/should use Redux to *organise* your application and ***optionally*** use React
to `render` your views.

### (*Should I use*) Immutable.js ?

**Short Answer**: ***Not Yet!***

**Longer Answer**:
The *convention* in Redux apps is for the `state` to be
[`immutable`](https://stackoverflow.com/questions/3200211/what-does-immutable-mean)
this makes your app far more predictable because
any/all changes to the `state` have to be done via an `action`.

[Immutable.js](https://facebook.github.io/immutable-js/)
makes the data structures in your application `state`
more efficient (*in larger apps*) however,
while you are learning Redux we suggest you ignore **immutable.js**
as you will have more than enough to master for now.

Once you have published your first app using Redux,
come back to immutable.js to appreciate how it makes ***large apps***
run faster. As Lee Byron, the *creator* of Immutable.js states,
for small apps without much change in `state`, adding Immutable.js
will actually make your app perform *worse*!

If you want to understand *why* using Immutable.js
can be a ***good*** thing in ***large apps***, watch
[Lee Byron's intro to Immutable](https://www.youtube.com/watch?v=kbnUIhsX2ds)


## Todo: [![pull requests welcomed!](https://img.shields.io/badge/pull%20requests-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/learn-redux/issues)

+ [ ] Explain why ***Unidirectional Data Flow*** is this "better" than bi-directional e.g: Angular.js

## Kudos to Fellow *DWYLers*

> Props to [***Rafe***](https://github.com/rjmk) for telling us about Redux and Elm: https://github.com/rjmk/reducks *before* it was *cool*  
> Thanks to [***Milo***](https://github.com/bananaoomarang) for his
*fantastic* demo/example: https://github.com/bananaoomarang/isomorphic-redux  
(*which he has painstakingly kept up-to-date with the latest Redux/React versions!*)  
> and *love* to [***Niki***](https://github.com/nikhilaravi) &
> [***Jack***](https://github.com/jrans) for their
> *enthusiasm* and *patience* while explaining it all to us ...

## *Thanks* for Learning with Us!

If you found our notes useful, please share them with others by
starring this repo and/or re-tweeting:

[![dan_abramov_retweeted](https://cloud.githubusercontent.com/assets/194400/12523324/0ee0ac2c-c14e-11e5-9e6c-de4717fa474c.png)](https://twitter.com/dwylhq/status/687703493264732160)

> https://twitter.com/dwylhq/status/687703493264732160
