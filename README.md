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

#### 20. Extracting Presentational Components (Todo, TodoList)

> Video: https://egghead.io/lessons/javascript-redux-extracting-presentational-components-todo-todolist

In the last few lessons we created the user interface for a simple 
React and Redux Todo List where I can add items, toggle them 
as completed and change the *currently* visible Todos 
and we do that by having a *single* `TodoApp` Component 
that the `<input>`, the `<button>` for *adding* todos 
the *list* of *currently* visible todos with `onClick` handler 
and it has these 3 links that let us change 
the *currently* visible todos.
The *single* Component approach worked so far,
however we really want to have *many* components 
that can be used tested and changed by different people separately 
so we are going to re-factor our application in this lesson. 

The first Component I want to *extract* from the `TodoApp` Component 
is the `Todo` Component that renders a *single* `<li>`
I'm declaring the `Todo` Component as a function 
which React 0.14 allows me to do. 
I'm not *sure* which props its going to have 
so I will leave them blank for now 
and I will just *paste* the `<li>` I coppied before. 

The first thing I am doing is *removing* the special `key` property
because it's only needed when I am enumerating an `Array` 
and I will use it *later* when enumerating *many* todos. 
One of my goals with this refactoring is to make every Component
as flexible as it is *reasonable*.
Right now I have *hard-coded* that *clicking* a todo always
causes the `TOGGLE_TODO` `action` 
and this is perfectly fine to do in your app 
however I prefer to have a bunch of Components 
that don't specify any *behaviours* 
and that are *only* concerned with how things *look* 
or how they `render` and I call such Components 
the "*presentational*" Components 
I would like to keep `Todo` a "*presentational*" Component 
so I *remove* the `onClick` handler and I promote it to be a prop 
so that anyone who uses the `Todo` Component 
can specify what happens on the *click* 
and you don't *have* to do this in your Redux apps 
but I find it to be a very *convenient* pattern. 
*Finally* while it does not make a lot of difference,
I prefer to keep it explicit what is the `data` 
that the Component needs to `render` 
so instead of passing a `todo` `Object` 
I pass `completed` and `text` fields as *separate* props. 
note: how the `Todo` Component 
is now a *purely* "*presentational*" Component 
and does not specify *any* behaviour 
but it *knows* how to `render` a todo. 

```js
const Todo = ({
  onClick,
  completed,
  text
}) => (
<li 
  onClick={onClick}
  style={{
  textDecoration: 
    completed ? 
      'line-through' :
      'none'
  }}
 >
  {text}
</li>
);
```

The *next* Component I create is called `TodoList` 
and it's *also* a "*Presentational*" Component 
its *only* concerned with how things *look* 
and it accepts an `Array` of todos 
and is going to `render` an `<ul>` (*unordered list*) of them
by calling the todos `map` function (`Array.map`) 
and rendering a Todo component for every todo. 
it tells React to use `todo.id` as the unique `key` for the elements 
and it *spreads* over the `todo` `Object` properties 
so that `text` and `completed` end up as props on `Todo` Component 
now I need to *specify* what happens when a `Todo` is clicked 
and I *could* have dispatched an `action` here 
and again, that would be *fine* 
but I want it to be a "*Presentational*" Component 
so I'm going to call *another* function 
called `onTodoClick` and pass the `id` of the `todo` 
and let it decide what should happen 
so `onTodoClick` is another prop for the `TodoList` 
both `Todo` and `TodoList` are "*Presentational*" Components 
so we need something I call "*Container*" Components 
to actually pass the data from the `store` 
and to specify the behaviour

In this case the top-level `TodoApp` Component 
acts as a "*Container*" Components 
and we will see more examples of "*Container*" Components 
in the future lessons. 
In this case you just render the `TodoList` with `visibleTodos`
as the `todos` and with a callback that says 
that when `onTodoClick` is called with a `todo.id` 
we should dispatch an `action` on the `store` 
with the `type` `TOGGLE_TODO` and the `id` of the `todo`.

```js
<TodoList 
  todos={visibleTodos}
  onTodoClick={id =>
    store.dispatch({
      type: 'TOGGLE_TODO',
      id // where is id value?
    })
  } />
```

Let's recap again how this works:
The `TodoApp` Component renders a `TodoList` 
and it passes a function to it 
that can dispatch an `action` 
the `TodoList` Component renders the `Todo` Component 
and passes `onClick` prop which calls `onTodoClick` 
the `Todo` Component uses the `onClick` prop it receives 
and binds it to the `<li>` `onClick` 
this way when its called the `onTodoClick` is called 
and this dispatches the `action` and updates the `visibleTodos` 
because the `action` updates the `store`.

> Code at the *end* of Video 20:
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
