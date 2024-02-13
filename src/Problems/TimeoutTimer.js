class CallbackTimer {
  constructor(cb, timer, id, args = {}) {
    this.cb = cb;
    this.timer = timer;
    this.id = id;
    this.args = args;
  }
}

class FakeTimer {
  constructor() {
    this.timers = [];
    this.orginials = {
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      Date: window.Date,
    };
    this.id = 1;
    this.currentTime = 0;
  }

  getId() {
    this.id++;
    return this.id;
  }

  install = () => {
    this.run = true;
    window.setTimeout = this.setTimeout;
    window.clearTimeout = this.clearTimeout;
    window.Date.now = this.setDate;
    this.tick();
  };

  uninstall = () => {
    this.run = false;
    const { setTimeout, clearTimeout, Date } = this.orginials;
    window.setTimeout = setTimeout;
    window.clearTimeout = clearTimeout;
    window.Date.now = Date.now;
  };

  setTimeout = (cb, timer) => {
    const id = this.getId();
    const nde = new CallbackTimer(cb, timer, id);

    this.timers.push(nde);
    this.timers.sort((a, b) => a.timer - b.timer);
    this.tick();
    return id;
  };

  clearTimeout = (id) => {
    const idx = this.timers.findIndex((item) => item.id == id);
    if (idx >= 0) {
      //   this.timers[idx] = null;
      this.timers.splice(idx, 1);
    }
  };

  setDate = () => {
    return this.timers[0].timer;
  };

  tick = () => {
    while (this.run && this.timers.length) {
      const next = this.timers.shift();
      const { cb, timer } = next;
      this.currentTime = timer;
      cb();
    }
  };
}

const fakeTimer = new FakeTimer();
fakeTimer.install();

const logs = [];
const log = (arg) => {
  logs.push([Date.now(), arg]);
};

setTimeout(() => log("A"), 100);
// log 'A' at 100

const b = setTimeout(() => log("B"), 110);
clearTimeout(b);
// b is set but cleared

setTimeout(() => log("C"), 200);

console.log("logs", logs);
// ().toEqual([
//   [100, "A"],
//   [200, "C"],
// ]);

fakeTimer.uninstall();
