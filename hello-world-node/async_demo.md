# Async Demo

## the Node REPL

Use the node REPL - Read, Evaluate, Print Loop
Simply type `node` from the command line.

## Process.nextTick

```javascript
var truth_value = false;
process.nextTick(function() {
  console.log(truth_value)  
});
truth_value = true;
```

What will the output be? `false` or `true`?

The answer is that the output will be `true`. Why? You might have thought
it would be `false`, right? It's like the statements are having out of order.

It's because we are placing our function with `console.log` on the event queue. Read more about [`process.nextTick`](https://nodejs.org/api/process.html#process_process_nexttick_callback).



