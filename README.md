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

#### 22. Extracting Container Components (FilterLink)

> Video: https://egghead.io/lessons/javascript-redux-extracting-container-components-filterlink

In the previous lesson we separated the "*Presentational*" Components 
from the the main "*Container*" Component 
the `TodoApp` specifies the *behaviours* 
such as what happens when the **Add** `<button>` is clicked 
how the todos are selected 
what happens when a *single* `Todo` has been clicked 
and what happens when a `Footer` Link is clicked.
And the components such as `AddTodo`, the `TodoList`, the `Todo` its' self 
the `Footer` and the `FilterLink` they don't dispatch actions 
they call their callbacks [passed] in the props 
so they are *only* responsible for the *looks* but not for the behaviour. 
The downside of this approach is that 
I have to pass a lot of props down the "tree" 
even when the *intermediate* Components don't really *use* them 
for example: the `FilterLink` needs to know the `currentFilter` 
so that it can chose a different appearance when it is *active* 
however, in order to *receive* the `currentFilter` it has to be passed down 
from the top, so this is why the `Footer` has to accept `visibilityFilter` 
as a prop so it can pass it down as a `currentFilter` to the `FilterLink`.

In a way this *breaks* encapsulation 
because the "*Parent*" Components need to *know* too much 
about what data the *Child* Components need 
so to solve this we are going to *extract* a few more "*Container*" Components 
just like we extracted the "*Presentational*" Components in the previous lesson. 

The *first* Component I'm going to re-factor is the `Footer` Component 
and *currently* it accepts two props the `visibilityFilter` 
and the `onFilterClick` callback, 
but it doesn't actually *use* either of them, 
it just passes them down to the `Filterlink` 
so this seems like a *good* opportunity for *simplification*. 
We can only do this because we *know* that the `Footer` Component 
doesn't *care* about the values of these props 
they only exist to be passed down to the `Filterlink` 
that cares about them.

```js
const Footer = () => (
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
);
```

I'm removing the props definition
and I'm removing these props from the `FilterLink` usage 
and it might start to seem a lot like the code *before* 
separating the "*Presentational*" Components 
however what I want to do here is a little bit different.

The `FilterLink` does not *currently* specify the behaviour 
for clicking on the link 
it also needs the `currentFilter` 
to tell whether it should be rendered as *active*
therefore its a bit "*dishonest*" to say that `FilterLink` 
is a "*Presentational*" Component 
because it is inseperable from its *behaviour* 
the only *reasonable* reaction to clicking on it 
is setting the `visibilityFilter` by dispatching an `action` 
this is why I am changing it to a *different* "*Presentational*" Component 
I'm going to call `Link` 
and I will create another `FilterLink` Component 
as a Container that uses it for rendering. 

```js
const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

```

The `Link` Component doesn't know *anything* about the `Filter` 
it only accepts the `active` prop and calls its `onClick` handler 
it is *only* concerned with rendering 
however I am *also* creating another Component called `FilterLink` 
and its going to be a `Class` this time.
It's going to `render` the `Link` 
with the *current* data from the `store`.
It's going to read the props, the Component props 
and it's going to read the `state` 
but I don't mean the *React* `state` 
I mean the Redux `store` state 
it gets by calling `store.getState()`. 
As a "*Container*" Component the `FilterLink` 
doesn't have its *own* markup 
and it delegates rendering to the `Link` 
"*Presentational*" Component.
In this case it *calculates* its' `active` prop 
by comparing its *own* `filter` prop 
with the `visibilityFilter` in the Redux `store` `state`. 
The `filter` prop is the one that is passed 
to the `FilterLink` from the `Footer` 
and the `visibilityFilter` corresponds to the 
*currently* chosen `visibilityFilter` 
that is held in the Redux `store` `state`. 
and if they *match* we want the `Link` to appear *active*
(*un-clickable*). 
The "*Container*" Component also needs to specify the *behaviour* 
so in this case the `FilterLink` 
specifies that when this particular link is *clicked* 
we should dispatch the `action` with the `type: 'SET_VISIBILITY_FILTER'`
and the `filter` value that we take from the props 
the `FilterLink` may accept "*Children*" 
which are used as the *contents* of the `Link` 
so we are going to pass the *children* down 
to the `Link` Component which is going to `render` them
inside the `<a>` tag. 

```js
class FilterLink extends Component {
  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link 
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}
```

There is a *small problem* with this implementation of `FilterLink` 
inside the `render` method it reads the *current* `state` 
of the Redux `store` however it is not *subscribed* to this `store`. 
So if the *Parent* Component does not update when 
the `store` is updated its going to render the "*stale*" value. 

Currently we re-render the *whole* application when the `state` changes 
however this is *not* very efficient 
so in future we will instead move the *subscription* to the `store` 
to the lifecycle methods of the "*Container*" Components. 
React provides a *special* `forceUpdate` method 
on the Component instances to *force* their re-rendering 
and we're going to use it together with `store.subscribe` method 
so that any time the `store` `state` changes 
we `forceUpdate` the "*Container*" Components. 
We perform the subscription inside the `componentDidMount` 
lifecycle method so its important to 
to *unsubscribe* inside the `componentWillUnmount` method. 

```js
class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => 
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link 
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

```

Note that we don't actually have the `unsubscribe` method,
but this is the returned value of the `store.subscribe` method 
so we can keep it and then *call* it in `componentWillUnmount`. 

Let's re-cap this part:
the `FilterLink` Component subscribes to the `store` 
calling `forceUpdate` any time the `store` changes 
so it can `render` the *current* `state` of the `store`. 
it saves the *reference* to the `unsubscribe` function 
returned by `store.subscribe` 
and it *invokes* it when the Component is about to *Unmount* 
to clean up the subscription. 

Let's re-cap the relationship between the  
`FilterLink` "*Container*" Component 
and the `Link` "*Presentational*" Component:
The `Link` Component only specifies the *appearance* of a link
when it is *active* or *inactive* 
but it doesn't know about the behaviour. 
The `FilterLink` Component is a *Container* 
so it provides the *data* and the *behaviour* for 
the "*Presentational*" Component. 
When it mounts it subscribes to the `store` so 
it *independently* re-renders when the `store` `state` changes 
because it needs to use the `store` *current* `state` 
inside its `render` method. 
Instead of specifying the DOM tree 
it delegates all the rendering to 
the `Link` "*Presentational*" Component 
and its' only job is to calculate the props 
base on its *own* props and the *current* `state` of the Redux `store` 
and it also specifies the callbacks that are 
going to dispatch the `actions` on the `store`. 

After the `action` is dispatched the `store` will remember 
the *new* `state` returned by the reducer 
and will call *every* subscriber to the `store` 
and this case every `FilterLink` Component instance 
is subscribed to the `store` 
so they will all have their `forceUpdate` methods called on them 
and they will re-render according to the *current* `store` `state`.

The `FilterLink` is a "*Container*" Component 
so it is completely self-sufficient 
and can be used inside the "*Presentational*" Components such as
`Footer` without passing additional props 
to get the data from the `store` and specify the behaviour 
this lets us keep the `Footer` Component simple 
and de-coupled from the behaviour and data 
that its' child Components need. 


> Code at the *end* of Video 22: 
[`index.html`](https://github.com/nelsonic/learn-redux/blob/4572cb33f575567687b2683dfe20b22cfda8b16e/index.html)

<br />




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
