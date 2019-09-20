/*
********************************************
  LIBRARY
********************************************
*/

// If a string is given, return an array containing only the string.
// If undefined is given, return an empty array.
// If an array is given return it.
const arr = p => {
  if (p === undefined) {
    return [];
  }
  if (typeof p === "string") {
    return [p];
  }
  return p;
};

// A sync object must provide either a requested or a waited-for event.
const validate = sync => {
  // throw if there's a problem
  return sync;
};

// Sync data includes three properties: request, wait, and block.
// If a string or array is provided, it's interpreted as a request.
// If an object is provided, each property can be given as a string or array.
const sync = sync => {
  if (typeof sync === "object" && !Array.isArray(sync)) {
    const { request, wait, block } = sync;
    return validate({
      request: arr(request),
      wait: arr(wait),
      block: arr(block)
    });
  }
  return {
    request: arr(sync),
    wait: [],
    block: []
  };
};

// A threadMap is a collection of threads keyed by the threads themselves
//   (by their address in memory).
// The value of each thread is its sync data.
// Upon inclusion in a map, each thread is initialized to its first sync point.
const createMap = threads => {
  const keyValue = threads.map(thread => [thread, {}]);

  const threadMap = new Map(keyValue);
  advance(threadMap, threads);

  return threadMap;
};

// Given a threadMap,
//   we can generate a list of all the requested threads which are not blocked.
const selectEvents = threadMap => {
  let blocked = [];
  let requested = [];
  let count = 0;
  threadMap.forEach((sync, thread) => {
    requested = requested.concat(sync.request);
    blocked = blocked.concat(sync.block);
  });
  return requested.filter(event => !blocked.includes(event));
};

// Given a threadMap and a single event,
//   return all threads that are dependent on the event
//   (those which requested it or are waiting for it).
const matchThreads = (threadMap, event) => {
  let threads = [];
  threadMap.forEach((sync, thread) => {
    if (sync.request.includes(event) || sync.wait.includes(event)) {
      threads.push(thread);
    }
  });
  return threads;
};

// Given a threadMap and a list of threads,
//   advance the threads in the list to their next sync point.
// If a thread is done remove it from the threadMap.
const advance = (threadMap, threads) => {
  threadMap.forEach((_, thread) => {
    if (threads.includes(thread)) {
      const { value, done } = thread.next();
      if (done) {
        threadMap.delete(thread);
      } else {
        threadMap.set(thread, value);
      }
    }
  });
};

// Weave is itself a thread.
// It requests a list of events, which is generated from it's given threads.
function* weave(...threads) {
  const threadMap = createMap(threads);

  while (threadMap.size) {
    const selectedEvents = selectEvents(threadMap);
    if (!selectedEvents.length) {
      // Nothing is requested,
      // or everything requested is blocked.
      return;
    }
    const event = yield sync(selectedEvents);
    const threadsToAdvance = matchThreads(threadMap, event);
    if (!threadsToAdvance.length) {
      // None of the active threads are dependent on the selected event.
      return;
    }
    advance(threadMap, threadsToAdvance);
  }
}

// Continuously calls next on a thread until its done.
// Always selects the first of the requested events.
export function* run(thread) {
  const { value, done } = thread.next();
  let v = value;
  let d = done;

  while (!d) {
    const event = v.request[0];
    if (event === undefined) {
      // The running thread is not requesting anything.
      return;
    }
    yield event;
    const { value, done } = thread.next(event);
    v = value;
    d = done;
  }
}

/*
********************************************
  PROGRAM - FILL THE TUB
********************************************
*/

// Events
const addHot = "addHot";
const addCold = "addCold";
const cancelLimit = "cancelLimit";

// Threads
function* hot() {
  while (true) {
    yield sync(addHot);
  }
}

function* cold() {
  while (true) {
    yield sync(addCold);
  }
}

function* stabilize() {
  while (true) {
    yield sync({ block: addCold, wait: addHot });
    yield sync({ block: addHot, wait: addCold });
  }
}

function* limit(max) {
  let count = 0;
  while (count < max) {
    yield sync({ wait: [addHot, addCold] });
    count++;
  }
  yield sync({ wait: cancelLimit, block: [addHot, addCold] });
}

/*
********************************************
  EXECUTION
********************************************
*/

const publish = event => {
  console.log(event);
};

const fill = run(weave(hot(), cold(), stabilize(), limit(10)));

for (event of fill) {
  publish(event);
}

/*
********************************************
  DOCS
********************************************
*/

/*
Threads define syncronization points where they stop to share data with peers and ask for direction.
Sync data is a listing of events of three types: "request", "wait", and "block".
Each type can include any number of events.
Every sync point must have either a requested or a waited-for event (or both).

Weave takes any number of threads and returns a new thread.
The resulting thread will request a list of events at each sync point.
It won't wait for or block any events.
Requested events are ordered by thread priorty.
Thread priority is decided by the order of arguments (left to right).

Run takes a single thread and returns a generator object (iterable?).
The resulting thread will request a single event at each sync point.
The event is selected by virtue of being the first requested.
*/
