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

#### 23. Extracting Container Components (VisibleTodoList, AddTodo)

> Video: https://egghead.io/lessons/javascript-redux-extracting-container-components-visibletodolist-addtodo

In the previous lesson I separated the 
`Link` "*Presentational*" Component from the 
`FilterLink` "*Container*" Component 
that is subscribed to the Redux `store` 
and that provides the *data* and the *behaviour* 
for the `Link` Component it renders.
While it makes the data flow a little bit *less* explicit 
it makes it easier to use `FilterLink` in 
*any* Component without worrying about passing additional data 
to the `FilterLink` or to the Component that *contains* it. 

In *this* lesson we will continue extracting 
the "*Container*" Components from the top-level 
"*Container*" Component and the *first* candidate is 
the `TodoList` Component. 

I actually want to *keep* the `TodoList` a "*Presentational*" Component 
however I want to *encapsulate* within the *currently* 
visible Todos into a *separate* "*Container*" Component 
that connects the `TodoList` to the Redux `store` 
so I'm going to call this Component the `VisibleTodoList`.
Just like when declaring the `FilterLink` Component 
in the *previous* lesson, I calculate the data for the *current* 
Component by using the *current* `state` 
which is the `state` from the Redux `store` 
and I'm using the `getVisibleTodos` function 
to calculate the *currently* visible todos 
based on all the todos from the Redux `store` 
and the *current* `visibilityFilter` from the Redux `store` `state` 
and I'm specifying the *behaviour* as well 
I'm saying that when the todo is *clicked* 
we should dispatch an `action` with `type: 'TOGGLE_TODO'`
and the `id` of the todo being clicked.
All "*Container*" Components are similar 
their job is to *connect* a "*Presentational*" Component 
to the Redux `store` and specify the data and the behaviour 
that it needs. 

```js
class VisibleTodoList extends Component {
  render() {
    const props = this.props;
    const state = store.getState();
    return (
      <TodoList 
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
    )
  }
}
```

I'm scrolling up to the `FilterLink` *Container* Component 
I wrote in the *previous* lesson to *copy-paste* 
the `store` *subscription* logic:

```js
componentDidMount() {
  this.unsubscribe = store.subscribe(() => 
    this.forceUpdate()
  );
}

componentWillUnmount() {
  this.unsubscribe();
}
```

Just like the `FilterLink` the `VisibleTodoList` is 
going to *subscribe* to the `store` 
and *force* an update any time the `store` `state` changes 
because it uses the `state` in its' `render` method. 
Now that the `VisibleTodoList` is connected to the Redux `store` 
we can use it *instead* of the `TodoList` 
and we no longer have to pass all the props from the top.

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
