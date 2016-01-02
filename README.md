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


#### 17. React Todo List Example (Adding a Todo)

> Video: https://egghead.io/lessons/javascript-redux-react-todo-list-example-adding-a-todo

In the *previous* lesson we learned how to split the "*root*" reducer
into *many* smaller reducers that manage *parts* of the `state` tree
and now we have a ready `todoApp` reducer 
that handles all the `actions` of our simple todo application.

So now it's time to *implement* the ***view layer***
and I'm going to use React in this example

I'm adding **React** and [React-DOM](https://facebook.github.io/react/docs/glossary.html) packages from the Facebook CDN 
and I'm also adding a div with `id='root'`
which is where I'm going to `render` my React application

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react-dom.min.js"></script>
```

Similar to the React *Counter* example from the 8<sup>th</sup> Lesson
I declare a `render` function that is going to update the DOM
in response to the *current* application `state`
and I'm going to `subscribe` to the `store` changes
and call `render` when ever the `store` changes 
and *once* to `render` the *initial* state:

```js
const { createStore } =  Redux;
const store = createStore(todoApp);

const render = () => {
  // gets expanded below ...
};

store.subscribe(render);
render();
```

And the *implementation* of the `render` method
is going to use React so its calling `ReactDOM.render`
for some `TodoApp` *component* I haven't written *yet*
and it renders it into the `div` I created inside the `html`
called `root`.

React provides a "*base*" `Class` for all components 
so I'm grabbing it from the React `Object` 
its called `React.Component`
and I'm declaring my own `TodoApp` component 
that `extends` the React "*base*" `Component`

```js
const { Component } = React;

class TodoAPP extends Component {
// filled out below ...
}

const render = () => {
  ReactDOM.render( 
    <TodoApp />,
    document.getElementById('root')
  );
};
```

This `Component` is only going to have a `render` function
and is going to return a `<div>` 
and *inside* the `<div>` I'm going to place a `<button>` saying "Add Todo"
but I don't want to add an `input` field *yet* to keep the example *simple*
at first so I'm dispatching the `ADD_TODO` `action` 
and I'm going to put `Test` as my `text` for the `action`
so it's going to keep adding todos with the `text` "Test".
and the `id` I need to specify a sequential `id` 
so this is why I'm declaring a *global* variable called `nextTodoId`
and I'm going to keep incrementing it.
so every time its going to emit (*dispatch an `action` with*) a *new* `id` 
and *finally* I aslo want to display a *list* of the todos
so, *assuming* that I have the todos injected as a `todos` prop
I will call `.map` and for every `todo` item I'm going to show a `<li>`
showing the text of that particular todo.

*Finally* because I need the `todos` as a `prop` 
I'm going to pass it to the `TodoApp` 
by reading the the *current* `store` `state`
and reading its `todos` field: 

```js
const { Component } = React;

let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    return (
      <div>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: 'Test',
            id: nextTodoId++
          });
        }}>
          Add Todo 
        </button> 
        <ul>
          {this.props.todos.map(todo => 
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render( 
    <TodoApp todos={store.getState().todos} />,
    document.getElementById('root')
  );
};
```

> Code snapshot for Video 17 @ 02:56:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/c44025b2ea3ed7f8cd4b1120c4aad7f98cce2c97/index.html#L81-L104)

If you open the file in your browser, you should expect to see:

![learn-redux-video-17-example](https://cloud.githubusercontent.com/assets/194400/12147411/a1bb3974-b490-11e5-8ab0-b011dfecc959.png)


You can see that there is a `<button>` "Add todo"
and any time I press it I see a *new* todo with the "Test" `text`.

Now I'm going to add an `input` inside my render function
and I'm using the React callback `ref` API where `ref` is a function
it gets the `node` corresponding to the `ref` 
and I'm saving that `node` in this case `this.input`
so I'm able to *read* the `value` of the `input` 
inside my event handler, I'm reading `this.input.value`
and I'm also able to *reset* that value 
*after* dispatching the `action` so that the field is cleared.

Now if I try to write something in the `input` field and press "Add Todo"
the `ADD_TODO` `action` is dispatched and the field is *cleared*.

Lets take a moment to recap how this application works.

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
