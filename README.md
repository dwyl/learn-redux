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

#### 19. React Todo List Example (Filtering Todos)
  
> Video: https://egghead.io/lessons/javascript-redux-react-todo-list-example-filtering-todos

In the previous two lessons we working on creating the user-interface
for the Todo List Application that displays the todos 
lets us add new todos and "toggle" them `onClick`
we *implemented* that by dispatching `ADD_TODO` 
and `TOGGLE_TODO` `actions` 
that we already know how to handle in our reducers.

In *this* lesson we are going to dispatch `SET_VISIBILITY_FILTER` `action` 
and use the `visibilityFilter` *field* 
to *only* show the todos the *user* wants to see; 
either the *completed* todos, *active* todos 
or *all* the todos in the *current* `state`. 

I'm starting by creating a *new* Component, 
a *functional* Component called `FilterLink`
that user needs to click to switch the *current* visible todos. 
and the `FilterLink` accepts `filter` prop which is just a `String`
and the `children` which is the contens of the link. 
and its going to be a simple `<a>` ("*anchor*") tag 
that doesn't really *link* anywhere, 
its going to `prevent` the navigation when clicked 
and its going to dispacth and `action` 
with a `type` `SET_VISIBILITY_FILTER` 
and passing the `filter` prop 
so that the reducer knows which filter is being clicked. 
I will pass the `children` down to the `<a>` tag 
so the "consumer" can specify the `text` of the link 
Now I can use it in my `TodoApp` Component. 

Just below the todo list I'm adding a paragraph
where I'm going to offer the user the choice 
as to which todos should be *currently* visible 
by using the `FilterLink` Component I just created.
The `filter` prop is one of these possible values 
such as `SHOW_ALL` which corresponds 
to showing *every* todo in the `state`
`SHOW_ACTIVE` which means just show the todos
that are *not* completed yet,
and `SHOW_COMPLETED` which means show the *completed* todos.

```js
<p>
  Show:
  {' '}
  <FilterLink
    filter='SHOW_ALL'
  >
  All
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_ACTIVE'
  >
  Active
  </FilterLink>
  {' '}
  <FilterLink
    filter='SHOW_COMPLETED'
  >
  Completed
  </FilterLink>
</p>
```

So I'm *copy-pasting* the `FilterLink` 
and I'm changing the lables 
and the filters corresponding to it 
running this code will give me 3 different things
under the list of todos.
Clicking on them will change the `state.visibilityFilter` field
*however* it doesn't have *any* effect yet.
because we don't interpret the value of the `visibilityFilter`


I'm creating a *new* function 
that is going to help me filter the todos according to the 
the filter value, its called `getVisibleTodos`
it accepts two arguments: the `todos` and the `filter`
and it *switches* on the *current* `filter` value 
so if the `filter` is `SHOW_ALL`
its going to `return` all of the todos
but if the `filter` is `SHOW_COMPLETED` 
its going to call `todos.filter()` 
(*that is the `Array.filter` method*) 
to only return those todos that have `completed` set to `true` 
and `SHOW_ACTIVE` is going to be the *opposite* of that 
its going to `return` *only* those todos that 
where `completed` field is `false`.

```js
const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}
```

Now I need to *call* this function 
to `filter` the todos *before* rendering them
so in the `render` function of the `TodoApp` Component
I get the `visibleTodos` by calling the `getVisibleTodos`
with the `todos` and the `visibilityFilter` *values* from my props 
and I'm going to *use* the `visibleTodos` *instead* of
`this.props.todos` when I enumerate them for rendering. 

> Code snapshot for Video 19 @ 03:45: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/5e0622c277a37a478c887ba27e521474a5d480ad/index.html#L83-L128)

*Finally* I now use the `visibilityFilter` inside my `TodoApp` Component 
so I need to pass it as a prop
and I can do this *explicitly* 
but its *easier* just to "spread" over *all* the `state` fields 
so *every* property of the `state` `Object` is passed 
as a prop to the `TodoApp` Component 
this way it receives the `visibilityFilter` 
and if I *add* some todo items and then click on them
so I change their `completed` fields 
and then click on the `visibilityFilter` links 
the *currently* visible todos are rendered according 
to the *chosen* `visibilityFilter`. 

The links look all the same right now 
but we want to highlight the *chosen* one. 
To *implement* this, we're going to need the `visibilityFilter` prop 
which says which is the *current* one.
I'm changing the *beginning* of the `render` method 
to "*destructure*" the `todos` and `visibilityFilter` from the props 
so I can access them *directly* without typing `this.props` every time. 

> ***NOTE***: [**ES6** ***Destructuring assignment***](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
is ***not supported*** in Chrome yet, so I'm not using this in the code example.
> so Instead of:

```js
const {
  todos,
  visibilityFilter
} = this.props; // destructuring assignment
```

I'm using:

```js
const todos = this.props.tods, visibilityFilter = this.props.visibilityFilter
```

and I'm going to pass the `visibilityFilter` to every `FilterLink`
so it can *know* which `filter` is the *current* one 
and *apply* different styling 
if the `currentFilter` matches the `FilterLink`'s *own* filter. 

After passing the `currentFilter` prop to every `FilterLink` 
I go back to the `FilterLink` declaration and I'm adding
`currentFilter` as a prop to it and I'm adding a *condition* 
that says that when the `filter` is the `currentFilter` 
that is when the link is *active* 
I want to `return` a `<span>` instead of a link
because I don't want it to be *clickable*, 
I want it to be *static* text 
this completes the user-interface of our Todo List example 
it lets us *add* items, it lets us *view* items,
toggle them as *completed* 
and when we `switch` the `visibilityFilter` 
it displays only *relevant* todos 
and it *also* updates the link *appearance* 
so we see which link is *active*.

Lets recap how changing the `visibilityFilter` *works*
it starts with a dispatch call with an `action` 
of the `type: 'SET_VISIBILITY_FILTER'` 
and it passes `filter` which is a prop to the `FilterLink` Component 
so every one of those 3 links is going to have a different `filter` prop 
it passes in the `action`.
The `store.dispatch` function will call our *root* reducer with
the `state` and the `action` which in turn 
will call the `visibilityFilter` reducer 
with the *part* of the `state` and the `action`. 
Note that when the `action.type` is `SET_VISIBILITY_FILTER` 
it doesn't *care* for the *previous* `state` 
it just returns the `action.filter` as the *next* value, 
the next `state` of the `visibilityFilter` reducer 
the root reducer will *use* this new field as part of its *new*
`state` `Object` and because the `render` function is
*subscribed* to the `store` changes ( `store.subscribe(render);` ) 
its going to get this *new* `state` `Object` 
and pass all its keys as props to the `TodoApp` Component 
so the `TodoApp` Component will receive the todos 
and the *updated* `visibilityFilter` as its' props 
both its props are passed to the `getVisibleTodos` function 
which calculates the *currently* `visibleTodos` 
according to a list of *all* `todos` and the `visibilityFilter` 
and the `filter` is just a `String` saying
`SHOW_ALL`, `SHOW_COMPLETED` or `SHOW_ACTIVE` 
and the returned value is a *new* `Array` of todos 
that in some cases filters them and in some cases returns as is 
and the `SHOW_COMPLETED` and `SHOW_ACTIVE` are 
only different in their *predicates*. 

The `return` value is the `Array` of `visibleTodos` and it is used 
in the `render` function to actually enumerate every `todo`
and *render* it 
and the `visibilityFilter` field is also used byt the `FilterLink`
as the `currentFilter` because the `FilterLink` wants to know
whether its `filter` is the *current* one 
in order to `render` a `<span>` instead of a link (`<a>` tag). 
This is how clicking a link makes it appear selected 
and changes the *currently* displayed items in the list.


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
