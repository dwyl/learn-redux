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

#### 21. Extracting Presentational Components (AddTodo, Footer, FilterLink)

> Video: https://egghead.io/lessons/javascript-redux-extracting-presentational-components-addtodo-footer-filterlink

In the previous lesson I extracted the `Todo` and `TodoList` 
Components from the `TodoApp` Component. 
In this lesson I will continue extracting 
other "*Presentational*" Components to separate the *looks* 
from the *behaviour*. 
Now I want to extract the `<input>` and the `<button>`
into a separate Component called `AddTodo`. 
I'm declaring `AddTodo` as a "*Functional* Component" 
that does not accept any props 
and I'm going to `return` these 
*copy-pasted*  `<input>` and `<button>` 
but I'm wrapping them in a `<div>` because 
a (React) Component needs to have a *single* root element. 

```js
const AddTodo = () => {
  return (
    <div>
      <input ref={node => {
        this.input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          text: this.input.value,
          id: nextTodoId++
        });
        this.input.value = '';
      }}>
        Add Todo 
      </button> 
    </div>
  );
}
```

The *Functional* Components don't have instances 
however instead of using `this`, 
I can use a *local* variable called `input`
that I'm going to "*close over*" so that I can write to it 
in the callback ref and I can read from it in the event handler. 
Like previously I want it to be a "*Presentational*" Component 
and not specify behaviour 
so I'm just calling a function called `onAddClick` 
passing the *current* `input` value and I make `onAddClick` a prop 
so that the Component that *uses* `AddTodo` 
can specify what happens when `Add` button is clicked.

Again, the `TodoApp` Component acts as a "*Container*" Component 
for the `AddTodo` and it specifies that when the *add* `<button>` 
is clicked we should dispatch an action with the `type: 'ADD_TODO'` 
the corresponding `text` and the `nextTodoId`. 

The *last* Component I want to extract is the *footer* which contains 
all these three `FilterLink`. 
I'm creating a *new* "*Functional*" Component called `footer` 
and I'm not sure which props it needs so I skip them 
and I *paste* the markup. 
It seems that the `FilterLink` need the `visbilityFilter` 
so I add it as a prop.
I would like the `Footer` and the `FilterLink` to be 
"*Presentational*" Components 
however the `FilterLink` currently includes a `store.dispatch` call. 
I'm replacing it with an `onClick` call 
and I pass the `filter` as the single parameter 
for the calling Component's convenience 
I add `onClick` to the props and now I need to specify it 
every time `FilterLink` is used 
so I add `onFilterClick` to the `Footer` 
and I pass `onClick={onFilterClick}` for every link in the `Footer`
so what ever we pass to the `Footer` as `onFilterClick` prop is
going to end up in the `FilterLink` as `onClick`. 

```js
const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL' 
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
    All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE' 
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
    Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED' 
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
    Completed
    </FilterLink>
  </p>
);
```


Now I can use the `Footer` Component I just defined 
inside my `TodoApp` Component 
and I need to pass *two* props 
one of them is the `visibilityFilter` so it can highlight the *active* link 
and another prop is `onFilterClick` where I say that 
whenever a `Filter` is clicked I want to dispatch an `action` 
with the `type: 'SET_VISIBILITY_FILTER'` and the `filter` being clicked.

```js
// inside the TodoApp Component:

  <Footer 
    visibilityFilter={visibilityFilter} 
    onFilterClick={filter =>
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      })
    }
  />

// see index.html for full TodoApp
```

*Finally* I just noticed that the `TodoApp` Component doesn't actually
*have* to be a `Class`, I can turn it into a `function` 
and I prefer to do that when possible. 
Instead of `destructuring` the props inside the `render` method
I am now doing it inside the arugments.
I can remove now the `destructuring` and I can also remove
the `render` method declaration 
the `visibleTodos` are only used in a *single* place 
so I'm moving the `getVisibleTodos` call 
to the `TodoList` `todos` prop declaration. 

Now the body of my function is just a *single* expression 
so I can get rid of the `return` statement 
and *un-indent* the code to make it look nicer. 

> Full code snapshot for Video 21 @ 04:12:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/6577aa2eb0256fca4aba7bf1694d998e9f128100/index.html)
> *This version of `TodoApp` is *so* ***much cleaner***...

This concludes the *initial* refactoring of the Todo List Application 
into a single "*Container*" Component called `TodoApp` 
and many "*Presentational*" Components that are 
only concerned with how things *look*.

Lets re-cap the *data* flow in this example:
We have a *single* "*Container*" Component called `TodoApp` 
and we re-render it any time the `store` changes 
it receives the `keys` of the *global* `state` `Object` as the props 
so it receives the `todos` and the `visibilityFilter` values 
the *first* Component it renders is called `AddTodo`. 
`AddTodo` is a "*Presentational*" Component that 
renders an `<input>` and a `<button>` 
and when the `<button>` is *clicked* it passes the *current* `<input>` value 
to the `onAddClick` function.
`onAddClick` function is a prop for the `AddTodo` Component 
in this case it is *specified* by the `TodoApp` 
which says that when the `<button>` is clicked it should dispatch an `action` 
containing the *current* `text` in the `action` `Object`. 
Dispatching the `ADD_TODO` `action` will call our reducer 
update the `store` `state` with the new todos 
and re-render the `TodoApp` Component with the new todos. 
The todos themselves are rendered by the `TodoList`
"*Presentational*" Component that receives two props:
the *currently* visible todos and the `onTodoClick` callback 
the `TodoList` Component receives an `Array` of todos 
and it *maps* over them rendering individual `Todo` Components 
it uses the *spread* operator to pass every property of the todo `Object` 
as a prop to `Todo` Component 
and it specifies the `onClick` handler as calling `onTodoClick` 
with the `id` of the particular todo 
the `Todo` Component is defined above 
and it is also a "*Presentational*" Component 
so it doesn't specify the behaviour 
it says that when a `<li>` is *clicked* 
it should call the `onClick` handler 
being a "*Presentational*" Component it specifies how the Component *looks* 
in different circumstances 
and in this case it uses the `completed` prop 
to chose between two different styles of the todo item 
the `TodoList` is also a "*Presentational*" Component 
so it delegates actually *handling* the *click* to `onTodoClick` prop 
and it pass the `id` of the todo being *clicked*.

*Finally* the `TodoApp` reacts to it by dispatching an `action` 
containing the `id` of the todo clicked and the `type: 'TOGGLE_TODO'`
the `store` will call our reducer and update the `state` of the application 
re-rendering the `TodoApp` Component with the *new* todos. 

The `Footer` Component receives the *current* `visibilityFilter` as a prop 
and also receives the `onFilterClick` callback that sets 
the *current* `visibilityFilter`. 
The `Footer` Component renders *three* `FilterLink` 
passing down their respective `filter` values 
the `onClick` handler and the *current* `visibilityFilter` 
the `FilterLink` Component being a "*Presentational*" Component 
doesn't know *what* to do when it is *clicked*. 
so it calls the `onClick` callback passing the `filter` 
which is different for each of those links as an *argument* 
the `Footer` delegates handling the *click* of the `FilterLink` 
to its own prop called `onFilterClick`. 

*Finally* the `TodoApp` Component being the "*Container*" Component 
in our application specifies the *behaviour* 
which in this case means that when the `FilterLink` is *clicked* 
it should dispatch and `action` with the `action` 
`type: 'SET_VISIBILITY_FILTER` and the *new* `filter`. 

Separation of the "*Presentational*" Components is *not required* in Redux.
But I *recommend* this pattern because it de-couples your rendering from Redux. So if you later chose to move your project to another framework 
such as Relay you will not have to *change* all your components 
because you can keep all your "*Presentational*" Component exactly the same. 

This approach also has *downsides* such as that you have to 
thread a lot of props through the Components to get them 
to the "*leaf*" Components including the callbacks 
this problem can be *easily* solved by introducing 
many intermediate "*Container*" Components as we will see in the next lesson. 

> Code at the *end* of Video 21:
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
