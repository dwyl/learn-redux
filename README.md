# Learn Redux

Learn how to use Redux to write Predictable / Testable web apps.

> Note: these notes are aimed at people who already have "***intermediate***" ***JavaScript experience***.  
> If you are just starting out on your programming journey, we recommend you read:  
> https://github.com/nelsonic/learn-javascript


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

If you have them open while you are watching the videos you can
go a lot faster.
*Please* give feedback and suggest improvements by creating issues on GitHub:
https://github.com/nelsonic/learn-redux/issues
*Thanks*!

<br />


#### 9. Avoiding Array Mutations with concat(), slice(), and ...spread

In this video we learn how to avoid mutating arrays using concat(), slice(), and the ES6 array spread operator.

> Video: https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread

"In this lesson I use the *expect* library to make assertions
and [**deep-freeze**](https://github.com/substack/deep-freeze) to make sure my code is ***free*** *of* ***mutations***."

```js
    <script src="https://wzrd.in/standalone/expect@latest"></script>
    <script src="https://wzrd.in/standalone/deep-freeze@latest"></script>
```
These are loaded from [@Substack](https://github.com/substack)'s CDN: https://wzrd.in

"Let's say that I want to implement a **counter** ***list*** application.
I would need to write a few function that operate on its' state and
its' state is an `Array` of JavaScript *Numbers* representing the individual counters."

The first function I want to write is called addCounter
and all it should do is to *append* a zero at the end
of the passed `Array`.


```js
const addCounter = (list) => {
  // write the tests first then implement the function to make them pass.
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter  = [0];

  deepFreeze(listBefore);

  expect(
  	addCounter(listBefore)
  ).toEqual(listAfter);
}

testAddCounter();
console.log('All tests passed.');
```

At first I use the
[`Array.push()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
method to add an item at the end of the `Array`, and it works.
> Code: [Video 9 @ 0:36](https://github.com/nelsonic/learn-redux/blob/65fd87d59a91ca1b12fb8b3a3d1e5516ee520174/index.html#L17-L20)

*However* we need to learn to ***avoid mutations*** in Redux
and I'm enforcing this by calling `deepFreeze` on the original array.
Now my attempt to `.push` does not work; it cannot add a new property to a "frozen" object.
Instead of `.push` I'm going to use the `concat` method which does not *modify* the array.

```js
const addCounter = (list) => {
  return list.concat([0]);
};
```

Now the tests pass without *mutations*.

And I can also use the new **ES6** [***spread operator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
to write the code in a more consise way:

```js
const addCounter = (list) => {
  return [...list, 0];
};
```

> **Note**: *Again*, (at the time of writing) You will need to be running
[**Chrome**](https://www.google.co.uk/chrome/browser/canary.html) or
[**Firefox**](https://www.mozilla.org/en-GB/firefox/developer/)
for this example to work because the
[***spread operator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
is still [***not*** *(yet)* ***supported***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator#Browser_compatibility) in *all* browsers ... even though it is a *Standard* ...


My next function is `removeCounter` and it accepts two arguments: `list` (*an `Array` of `Numbers`*) and `index` the `Number` to *skip* from the `Array`.

So if I've got three numbers 
and I'm passing 1 as the second argument,
I expect to receive an `Array` with *two* items with the *second* item *skipped* in the `Array`:


```js
const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter  = [0, 20];
  expect(
  	removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};
```

*Usually* to `delete` an item from an `Array` I would use the `splice` method.
However `splice` is a mutating method, so you can't use it in Redux.
I'm going to `deepFreeze` the (`listBefore`) `Array` object,
and now I need to figure out a *different* way of removing an item from 
the array *without mutating it*.
I'm using a method called `slice` here and it does not have *anything* to do with `splice`; it is ***not mutating*** and it gives me a part of the `Array` from some beginning to some end index.
So what I am doing is taking the parts before the index I want to skip
and after the index I want to skip
and I `concat` them to get a new array:

```js
const removeCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat(list.slice(index+1));
};
```

Finally, instead of writing it as a method chain with `concat` calls, 
I can use the **ES6** [***spread operator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) 
to write it more concicely:

```js
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};
```

> **Note**: *make* ***sure*** *you* ***understand*** *how* ***both*** 
*of these work before proceeding ... Dan is a big fan of his ES6; he uses it* ***everywhere***!

Now that we have implemented adding and removing counters,
lets implement *incrementing* the counter:

```js
incrementCounter = (list, index) => {
	
};

// write a test/assertion before implementing the function:
testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter  = [0, 11, 20];

  expect(
  	incrementCounter(listBefore, 1)
  ).toEqual(listAfter);

}
```

The `incrementCounter` function takes two arguments:
`list` - the `Array` (*of all our counters*) 
and `index` - the counter that should be incremented.
So the returned value (`Array`) has the same count of items
but one of them is incremented.

Directly setting the value at the `index` *works* but this a mutation.
so if we add a `deepFreeze` call its *not* going to work *anymore*.

So *how* do we *replace* a single value in the array
 ***without mutating*** it?
 it turns out the *answer* is *really similar* to how we *remove* an item.

 ```js
incrementCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat(list[index] + 1)
    .concat(list.slice(index + 1));
};
 ```

We want to take a slice *before* the `index` 
and `concat` it with a single item `Array` with a *new* value
and then `concat` it with the *rest* of the original `Array`.

Fincally with the **ES6** [***spread operator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) 


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

> Props to [Rafe](https://github.com/rjmk) for telling us about Redux and Elm: https://github.com/rjmk/reducks

At the time of writing, the *minified* version of redux is 5.4kb and has
No Dependencies.
[![Dependency Status](https://david-dm.org/rackt/redux.svg)](https://david-dm.org/rackt/redux)
We like this. It means the Library is *self-contained* ("*stand-alone*") and you can read/understand it quite easily.

... Unidirectional Data Flow (*why is this better than bi-directional e.g: Angular.js*)
