class BrowserHistory {
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    this.store = [];
    if (url) {
      this.store.push(url);
    }
    this.counter = 0;
  }
  /**
   * @param { string } url
   */
  visit(url) {
    this.store = this.store.slice(0, this.counter + 1);
    this.store.push(url);
    this.counter++;
  }

  /**
   * @return {string} current url
   */
  get current() {
    return this.store[this.counter];
  }

  // go to previous entry
  goBack() {
    if (this.counter != 0) {
      this.counter--;
    }
  }

  // go to next visited url
  forward() {
    if (this.counter != this.store.length - 1) {
      this.counter++;
    }
  }
}
