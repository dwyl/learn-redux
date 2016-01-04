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

#### 24. Passing the Store Down Explicitly via Props

> Video: https://egghead.io/lessons/javascript-redux-passing-the-store-down-explicitly-via-props

In the *previous* lessons we used the `store` top level variable 
to refer to the Redux `store`. 
The Components that *access* the `store` such as 
the *Container* Components read the `state` from it, 
`subscribe` to the `store` and dispatch *actions* on the `store` 
using the `store` top level variable. 
This approach works fine for a "*JS Bin*" example where 
everything is in a *single* file 
however it doesn't *scale* to "*real*" applications 
for *several* reasons. 
*First* of all it makes your *Container* Components harder to *test* 
because they reference a *specific* `store` 
but you might want to supply a *different* "*Mock*" `store` 
in the *Tests*. 
*Secondly* it makes it very hard to implement "*Universal Applications*" 
that are rendered on the *server* 
because on the *server* you want to supply a different `store` 
instance for every `request` becuase different requests 
have different *data*.

I'm going to *start* by moving the `store` creation code 
to the *bottom* of the file where I `render` my React Components. 
I'm going to change it *slightly* 
and *instead* of creating the `store` top level variable 
I will pass the `store` I create as a prop 
to the top level Component 
so it is completely "*injectable*" to it. 
Every *Container* Component needs a reference to the `store` 
so *unfortunately* we have to pass it down to every Component 
as a prop.
Its *less effort* than passing different *data* to every Component 
but its still *inconvenient* 
so don't worry, we'll find a *better* solution later. 
But for *now* we need to see the problem. 
The *problem* is that the *Container* Components 
need to have the `store` instance to get the `state` from it, 
dispatch *actions* and get the changes. 
So this time I'm changing the *Container* Component 
to take the `store` from the `props` using the **ES6** ***Destructuring Syntax*** which just means `const { store } = props.store;` ...

> **Note**: destructuring **Objects** is not yet available in *any* browser, so I'm using "traditional" variable assignment: `const store = props.store;` (*almost identical*!)

And I'm doing the *same* here, just taking the `store` from the `props` 
so I can call `dispatch` on it. 

I need to make similar changes to other *Container* Components 
and in this case I have this `AddTodo` Component, 
which is not *exactly* a *Container* Component 
but it still needs the `store` to `dispatch` the `ADD_TODO` `action` 
so I add it as a `prop`. 
And I'm also going to add the `store` to the `Footer` Component 
because *unfortunately* `FilterLink` needs it 
and the `Footer` Component renders `FilterLink`. 
So this is not *convenient* but as I said, 
we'll figure out a way to avoid this *later* 
but for *now* we need to pass the `store` down 
so that *every* *Container* Component such as `FilterLink` 
can use it to `subscribe` to the changes, 
to *read* the `state` and to `dispatch` actions 
without relying on a top-level variable being available. 
I'm changing the `render` method to read the `store` 
from the `props` and now all *Containers* 
read the `store` instance from the `props` 
and don't rely on a top-level variable that I removed. 

Note that this change did not change the behaviour or *data* flow 
of this application. 
The *Container* Components `subscribe` to the `store` 
just like *before* and update their `state` 
in response to its' changes, 
however what changed is how they *access* the `store`. 
Previously they would *access* a top-level variable 
but this approach does not *scale* 
to "*real world*" applications 
and this is why right now I'm passing down the `store` 
as a `prop` so the *Container* Components can `subscribe` to it. 

In the *future* lessons we will see how to pass the `store` down 
to the *Container* Components *implicitly* 
but without introducing the top level variable. 





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
