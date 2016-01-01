# Learn Redux

Learn how to use Redux to write Predictable / Testable web apps.

> Note: these notes are aimed at people who already have "***intermediate***" ***JavaScript experience***.  
> If you are just starting out on your programming journey, we recommend you read:  
> [https://github.com/nelsonic/***learn-javascript***](https://github.com/nelsonic/learn-javascript)
> https://github.com/nelsonic/learn-javascript ***first***
and then come *back* here!  
> :star: this GitHub repo so you don't forget where it is!


## Why?

Redux is a *logical* way to write *simplified* front-end web applications.
While there is an ***initial learning curve*** we feel the *elegance*
of the single store (*snapshot of your app's state*) offers a significant
benefit over other ways of organising your code.

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


#### 12. Writing a Todo List Reducer (Toggling a Todo)

This lesson picks up where we left off in Video 11,
so make sure you watched that an tried writing/running the code!

> Video: https://egghead.io/lessons/javascript-redux-writing-a-todo-list-reducer-toggling-a-todo

In this lesson we will continue creating the reducer for the
todo list application
and the only action that this reducer *currently* handles 
is called `ADD_TODO`
we also created a ***test*** that makes sure that when the reducer
is called with an *empty* `Array` and the `ADD_TODO` `action`
it returns an `Array` with a *single* todo element.

In this lesson we will follow the same approach
to implement another action called `toggleTodo`

We're going to start with the *test* again 
and *this* time we are testing a different action 
and we have a different *initial* `state` 
the `state` *before* calling the reducer (`stateBefore`) 
now includes two different todos with `id` `0` and `1`.
notice how *both* of them have their `completed` field set to `false`

Next I declare the `action`
and the action is as `Object` with the `type` property 
wich is `TOGGLE_TODO` `String`
and the `id` of the todo that I want to be "*toggled*"
I declare the state that I `expect` 
to receive *after* calling the reducer (`stateAfter`)
its pretty much the same as *before* calling the reducer 
however I `expect` the todo with `id` specified in the `action`
or `1` in this case 
to change its `completed` field 

```js
const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
	},
	{
	  id: 1,
	  text: 'Go shopping',
	  completed: false
	}
  ];
  const action = {
  	type: 'TOGGLE_TODO',
  	id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
	},
	{
	  id: 1,
	  text: 'Go shopping',
	  completed: true
	}
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
  	todos(stateBefore, action)
  ).toEqual(stateAfter);
}

testToggleTodo();
console.log('All tests passed.')

```

the reducer *must* be a "*pure function*"
so at a matter of *precaution* I call `deepFreeze` 
on the `state` and the `action`

*Finally*, just like in the previous lesson, I'm asserting 
that the result of calling our reducer with the `stateBefore` and the `action` 
is going to be "*deeply equal*" (`toEqual`) the `stateAfter`.

Now, my test is a function so I need to call it at the end of the file
And if I run it, it fails because I have not *implemented* 
handling this action yet.

I'm adding a new `switch case` to my reducer
and I remember that I should not change the original `Array`
so I'm using the [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method
to produce a *new* `Array`
the function I pass as an argument will be called for *every* todo
so if its *not* the todo I'm looking for, I don't want to change it,
so I just `return` it as is.  
*However* if the todo *is* the one we want to toggle
I'm going to `return` a *new* `Object`
that *all* the properties of the *original* todo `Object`
thanks to the `Object` spread operator
but *also* an *inverted* value of the `completed` field:

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
      	if(todo.id !== action.id){
      	  return todo;
      	}
      	return {
      	  ...todo,
      	  completed: !todo.completed
        };
      });
    default:
      return state;
  }
};
```

Now both of our tests run successfully...
And we have an implementation of the reducer that can add and toggle todos.

> ***Note**: While the [*spread operator*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator#Browser_compatibility)
is an **ES6** *Standard* for `Array`, its only a ***Draft*** for `Object`
proposed for **ES7** which means it is 
**not** yet **available** in ***any*** **Browser**! 
As such I have modified Dan's
code to use `Object.assign` (*see Video #10) 
which (*at least*) works in Chrome...:

```js
return Object.assign({}, todo, {
  completed: !todo.completed
});
```

The *works* in ***ALL Modern Browsers Today (Without Babel)*** way of doing this is:
```js
var keys = Object.keys(todo);
var toggled = {};             // new object to avoid mutation
keys.forEach(function(index) {
  toggled.index = todo.index; // copy all properties/valud of todo
});
toggled.completed = !todo.completed
return toggled;
```

We can *probably* ***all*** agree that the code is more *elegant* 
with the ES7 Object spread operator.
But in the interest of having something that works *now* 
(*without Babel for running this tutorial in a Chrome...*)
I've opted to use the `Object.assign` method.




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
