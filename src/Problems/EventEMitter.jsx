// 16. create an Event Emitter

// interface Subject {
//      name
//.      listners : Map<channel,listners>
//         removeListeners
//         addListenres
//          on
//          close
// }

// interface Listners { handleOn , handleCLose }

class ReleaseCommand {
  constructor(observer, event, listener) {
    this.observer = observer;
    this.event = event;
    this.listener = listener;
  }

  relase() {
    this.observer.unsubscribe(this.event, this.listener);
  }
}

class Observer {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const listener = new Listener(callback);
    this.listeners.get(event).push(listener);

    // return {
    //   release: () => {
    //     const listeners = this.listeners.get(event);
    //     const index = listeners.indexOf(listener);
    //     if (index !== -1) {
    //       listeners.splice(index, 1);
    //     }
    //   },
    // };

    return new ReleaseCommand(this, event, listener);
  }

  notify(event, ...args) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      for (const listener of listeners) {
        listener.handleOn(...args);
      }
    }
  }
}

class Listener {
  constructor(callback) {
    this.callback = callback;
  }

  handleOn(...args) {
    this.callback(...args);
  }
}

const observer = new Observer();

// Subscribe to events
const subscription = observer.subscribe("eventName", (data) => {
  console.log(`Received data: ${data}`);
});

// Notify subscribers
observer.notify("eventName", "Hello, Observer!");

// Unsubscribe
subscription.release();
