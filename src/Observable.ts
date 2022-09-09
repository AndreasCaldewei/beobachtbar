export class Observable<T> {
  private subscribers: ((next: T) => void)[] = [];
  private running = true;
  get isRunning() {
    return this.running;
  }

  private completed = false;
  get isCompleted() {
    return this.completed;
  }

  private _value: T;
  get value() {
    return this._value;
  }

  set value(next) {
    this._value = next;
    if (this.triggerNext) {
      this.subscribers.forEach(fnc => fnc(this._value));
    }
  }

  private get triggerNext() {
    if (this.completed === true) {
      return false;
    }

    if (this.running === true) {
      return true;
    } else {
      return false;
    }
  }

  constructor(init: T) {
    this._value = init;
  }

  subscribe(callback: (next: T) => void, config?: { immediate: boolean }) {
    this.subscribers.push(callback);

    if (config?.immediate === true) {
      callback(this._value);
    }

    return () => {
      this.subscribers.splice(this.subscribers.indexOf(callback), 1);
    };
  }

  complete() {
    this.completed = true;
  }

  next(next: T) {
    this.value = next;
  }

  resume() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }
}
