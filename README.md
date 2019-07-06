This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A playground for React, other useful libraries, various techniques and disorganized rambling.

### A scrim for scrollable elements

`src/pages/OrderForm/Sides.js`

Makes use of the fancy `position: sticky;` property to display fading edges at the top and bottom. This helps to indicate the scroll affordance of a element that overflows vertically. When the user scrolls to the very start or end of the element, the gradient should disappear.

ℹ️ Throttling

I throttled the scrim display logic for "performance", but didn't actually bother comparing it. Maybe the throttling computation would take more effort than just firing a bunch of `setState`s continuously, since React batches `setState` anyway?

ℹ️ Scroll listener

A window-level scroll listener will need to be registered in `ComponentDidMount` and you have to remember to clean it up in `ComponentWillUnmount`. With React Hooks, this can be further simplified with `useEffect`.

### Dealing with state

I still love this article about [Twitter's Redux store](https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1) a lot.

[Normalizr](https://github.com/paularmstrong/normalizr) is great for normalizing nested data.

... Storing data in local state vs redux still keeps me up at night.

#### Forms in particular are still a pain
State shape?

```
form: { values: { [field] : [value] }, errors: { [field] : [error] }, topLevelError: { [error] } }
```

```
form: { [field]: { value : [value], error: [error] }, $topLevelError: { [error] } }
```
Lifting state?
1. Storing form state and actions in Redux
2. Storing local form state and actions, passing them down as props
3. Storing form state and actions locally, passing them via Context

Approach 2 is used in `src/pages/OrderForm`. A handler blindly swaps out the field value, and passes the responsibility of formatting that value to the child component. Works fine for objects, with a slight caveat of having to be aware of the field shape (see `src/pages/OrderForm/Sides.js`). This means form fields can only read and write their own fields though...

### E2E testing
After playing around with various E2E tools, nightwatch and cypress ended up being my favourites.

Cypress has a bit of a learning curve but is really really nice to use - autowait for XHR requests, stubbing support, hot reload. It was a pain to integrate Cucumber but it works. Too bad parallel testing is a paid feature.

We're using nightwatch at work, and we have some specific requirements like video recording in headless Chrome. The code on `chrome-video-recording` is a proof of concept and I've cleaned up the implementation significantly since. I'll get around to applying those changes to this repo one day.
- Recording in a child process
- Setting it up in Before/After hooks
- More options and better file management
- Converting images to video with FFMPEG instead of gif which is much faster and of better quality
