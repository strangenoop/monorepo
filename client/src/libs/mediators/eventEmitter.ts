export class EventEmitter {
  private events: { [eventName: string]: ((payload: any) => void)[] };

  constructor() {
    this.events = {};
  }

  subscribe(eventName: string, fn: (payload: any) => void) {
    if (!(eventName in this.events)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    return () => {
      if (!(eventName in this.events)) {
        return;
      }
      this.events[eventName] = this.events[eventName].filter(
        eventFn => fn !== eventFn
      );
      if (this.events[eventName].length === 0) {
        delete this.events[eventName];
      }
    };
  }
  emit(eventName: string, payload: any) {
    if (eventName in this.events) {
      this.events[eventName].forEach(fn => fn(payload));
    }
  }
  listEvents() {
    return Object.keys(this.events);
  }
}
