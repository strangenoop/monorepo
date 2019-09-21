import { polyClone } from "utils/polyClone";

export class SharableState<S> {
  private state: S;
  private subscribers: ((state: S) => void)[] = [];

  constructor(state: S) {
    this.state = state;
  }

  subscribe(fn: (state: S) => void) {
    this.subscribers.push(fn);
    fn(this.state);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== fn);
    };
  }
  private notify() {
    this.subscribers.forEach(fn => fn(this.state));
  }
  set(state: S) {
    this.state = state;
    this.notify();
  }
  update(updater: (state: S) => S) {
    this.state = updater(this.view());
    this.notify();
  }
  view() {
    return polyClone(this.state);
  }
}
