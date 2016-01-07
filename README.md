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


#### 28. Generating Containers with connect() from React Redux (AddTodo)

> Video: https://egghead.io/lessons/javascript-redux-generating-containers-with-connect-from-react-redux-addtodo

In the *previous* lesson we used the `connect` function from 
`ReactRedux` bindings library to *generate* 
the *Container* Component that *renders* 
a *Presentational* Component 
I *specify* how to calculate the `props` to "*inject*" 
from the *current* Redux `store` `state` 
and the callback `props` to *inject* 
from the `dispatch` function on the Redux `store`. 

*Normally* I would keep these functions 
called `mapStateToProps` and `mapDispatchToProps` 
but I'm working in a *single* file right now 
and I need to write these functions for a few *other* 
*Container* Components so I'm going to *re-name* 
them to something more *specific*:

+ `mapStateToProps` becomes `mapStateToTodoListProps`
+ `mapDispatchToProps` becomes `mapDispatchToTodoListProps` 

Which you don't *have* to do in your code, 
if you keep each Component in its' *own* file. 

I will also remove the line-breaks here 
to make it *clear* that these functions are only relevant 
for generating this particular *Container* Component 

Final Code (*after re-naming*):

```js
const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};
const mapDispatchToTodoListProps = (dispatch) => {
  return { 
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  };
}
const { connect } = ReactRedux;
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToProps
)(TodoList);
```

Now I'm *scrolling* up to the `AddTodo` Component 
which is not clearly a *Container* or a *Presentational* Component 
however it uses the `store`, 
it *reads* the `store` from the `context` 
to `dispatch` an `action` when the `<button>` is *clicked* 
and it *has* to declare the `contextTypes` 
to be able to grab the `store` from the `context`. 
[React] Context is a an ***unstable API*** so 
its best to ***avoid using*** it ***in application code***. 

Instead of reading the `store` from the `context` 
I will read the `dispatch` function from the `props` 
because I only need the `dispatch` here 
I don't *need* the whole `store` 
and I will create a *Container* Component with `connect` 
that will *inject* the `dispatch` function as a `prop`. 
I will *remove* the `contextTypes` 
[*from the `AddTodo` Component*] 
because the Component generated by `connect` function 
will take care of reading the `store` from the `context`. 

Because I changed the `AddTodo` declaration 
from the `const` to the `let` binding 
I can re-assign it now 
so that the *consuming* Component does not need to *specify* 
the `dispatch` prop because it will be *injected* 
by the Component *generated* by the `connect` call. 
The *first* argument to the `connect` function is `mapStateToProps` 
but there aren't any `props` for `AddTodo` Component 
that *depend* on the *current* `state`, 
so I `return` an *empty* `Object`. 
The *second* argument to `connect` is `mapDispatchToProps` 
but `AddTodo` Component doesn't *need* any callback `props` 
it just accepts the `dispatch` function its' self, 
so I'm returning it as a `prop` with the *same name*. 
*Finally* I'm calling the function for a *second* time 
to specify the Component I want to *wrap*, 
in this case `AddTodo` its' self:

`AddTodo` with the re-assignment as a call to `connect`:

```js
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = '';
      }}>
        Add Todo 
      </button> 
    </div>
  );
}
AddTodo = connect(
  state => {
    return {};
  },
  dispatch => {
    return { dispatch };
  }
)(AddTodo);
```

The *generated* *Container* Component 
will not pass any `props` dependent on the `state` 
but it will pass `dispatch` its' self 
as a `function` so that the Component can read it from the `props` 
and use it without worrying about *context* 
or specifying `contextTypes`. 
However it is *wasteful* to even `subscribe` to the `store` 
if we don't calculate any `props` from its' `state` 
so I'm *replacing* the `mapStateToProps` function with a `null` 
which tells `connect` that there is *no need* 
to `subscribe` to the `store`. 
Additionally its a pretty *common pattern*
to *inject just the `dispatch` function* 
so this is why if you specify `null` or any "*falsy*" value 
in `connect` as the *second* argument 
you're going to get `dispatch` injected as a `prop`.

So in fact I can just ***remove all arguments*** here 
and the *default* behaviour will be to *not* `subscribe` 
to the `store` and to *inject* just the `dispatch` function 
as a `prop`. 

```js
AddTodo = connect()(AddTodo);
```

Let's re-cap ...




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
