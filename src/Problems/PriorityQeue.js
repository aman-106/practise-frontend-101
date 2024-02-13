// complete the implementation
class PriorityQueue {
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare -
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare) {
    this.compare = compare;
    //   this.head =
    this.heap = [];
  }

  /**
   * return {number} amount of items
   */
  size() {
    return this.heap.length;
  }

  /**
   * returns the head element
   */
  peek() {
    return this.heap[0];
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
    this.heap.push(element);
    //
    this.heapifyDown();
  }
  parent(i) {
    return Math.floor(i / 2);
  }

  left(i) {
    return 2 * i + 1;
  }

  right(i) {
    return 2 * i + 2;
  }

  // max heao
  heapifyDown() {
    let i = this.heap.length - 1;
    let current = this.heap[this.heap.length - 1];
    let parent = this.heap[this.parent(this.heap.length - 1)];

    while (i > 0 && !this.compare(parent, current)) {
      current = parent;
      i = this.parent(i);
      parent = this.heap[i];
    }
  }

  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {}
}
