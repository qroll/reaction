This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A playground for React, other useful libraries and various techniques.

### A scrim for scrollable elements

`src/pages/OrderForm/Sides.js`

Makes use of the fancy `position: sticky;` property to display fading edges at the top and bottom. This helps to indicate the scroll affordance of a element that overflows vertically. When the user scrolls to the very start or end of the element, the gradient should disappear.

ℹ️ Throttling

I throttled the scrim display logic for "performance", but didn't actually bother comparing it. Maybe the throttling computation would take more effort than just firing a bunch of `setState`s continuously, since React batches `setState` anyway?

ℹ️ Scroll listener

A window-level scroll listener will need to be registered in `ComponentDidMount` and you have to remember to clean it up in `ComponentWillUnmount`. With React Hooks, this can be further simplified with `useEffect`.

### Dealing with nested state

I still love this article about [Twitter's Redux store](https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1) a lot.

[Normalizr](https://github.com/paularmstrong/normalizr) is great for normalizing nested data.
