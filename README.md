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

#### 18. React Todo List Example (Toggling a Todo)

> https://egghead.io/lessons/javascript-redux-react-todo-list-example-toggling-a-todo

In the last lesson we implemented a simple UI for the Todo List application
that is able to add *new* todos and view the *existing* todos in a list
to *add* the todos we dispatched the `ADD_TODO` `action`
and in *this* lesson we are going to the `TOGGLE_TODO` `action`
to *toggle* the *completed* `state` of the todos by clicking on them.

I'm scrolling down to my React Component and I've got a `<li>` here 
corresponding to the todo so I'm adding the `onClick` handler 
so when the user clicks on the list item I want to dispatch an `action` 
to my `store` with the `type` `TOGGLE_TODO` and the `id` 
of the todo being *toggled* which I get from the todo `Object`

The event handler *knows* which todo it corresponds to so it is able 
to pass its `id` in the `action`. 
In the user interface I want the completed todos to appear crossed out. 
so I'm adding the `style` attribute to the `<li>` 
and I'm going to use the `textDecoration` property 
which is going to be "line-through" (*strike-through*) 
when `completed` is `true` and *none* when `todo.compleded` is `false`
so I get a "normal" looking todo.
And now if I add a couple of todos
I can click on them and they are going to appear toggled:

```js
<ul>
  {this.props.todos.map(todo => 
    <li key={todo.id}
     onClick={() => {
      store.dispatch({
        type: 'TOGGLE_TODO',
        id: todo.id
      });
     }}
     style={{
      textDecoration: 
        todo.completed ? 
          'line-through' :
          'none'
     }}
     >
      {todo.text}
    </li>
  )}
</ul>
```

> Code snapshot for Video 18 @ 1:25:
[`index.html`](https://github.com/nelsonic/learn-redux/blob/fbc9a10538f513d21e9b06a9db13f33af79f938f/index.html#L104-L116)

When you run it (*in Google Chrome Canary*) you should expect to see:

![video-18-at-1min25sec-screenshot](https://cloud.githubusercontent.com/assets/194400/12149808/a7565b22-b49d-11e5-87b5-a66dec698686.png)

... And I can *toggle* them back. Isn't that *satisfying*...?

Lets recap how *toggling* the todo actually *works*.
it starts with me dispatching the `TOGGLE_TODO` `action` 
inside my `onClick` handler with the `type` `TOGGLE_TODO` 
and the `id` which is the `id` of the todo being rendered 
I get the `todo` `Object` as an *argument* to the `Array.map` callback 
inside my `render` method where I render all the todos
when an `action` is dispatched the `store` will call the "*root*" reducer 
which will call the todos reducer with the `Array` of todos 
and the `action` and in *this* case the `action` `type` is `TOGGLE_TODO`
so the todos reducer delegates the handling of *every* todo 
to the `todo` reducer with a `.map` function to call it for *every* todo item.
 So the `todo` reducer receives the todo as `state` and the `action`
again we `switch` on the `action.type` and it matches `TOGGLE_TODO` `String`
and now for *every* todo who's `id` does not match the `id` specified 
in the `action` we just `return` the *previous* `state` 
that is the todo `Object` as it was 
*however* if the `id` of the todo matches 
the one *specified* in the `action` 
we are going to `return` a *new* `Object`
with all the properties of the *original* todo 
but with the `completed` field equal to 
the *opposite* value of what it was; 
e.g: `completed: !state.completed`

The updated todo item will be will be included in the todos field 
under the *new* application `state`
and because we `subscribe` the `render` function 
its going to get the *next* `state` of the application 
in `store.getState()
and pass the *new* version of the todos to the `TodoApp` Component. 
Which is going to render the *updated* todos.

*Finally* the (CSS) `style` of the `<li>` 
depends on the `todo.completed` field which we just updated. 
which is why it re-renders in a crossed-out `state`.



  


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
