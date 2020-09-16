export class EventEmitter {
  private listeners: {[key: string]: any} = {};

  addEventListener(type: string, callback: (params: any) => void) {
    this.listeners[type] = callback;
  }

  removeEventListener(type: string) {
    if(this.listeners[type]) {
      delete this.listeners[type];
    }
  }

  protected dispatch(event: string, args: {[key: string]: any } = {}) {
    if(this.listeners[event]) {
      this.listeners[event](args);
    }
    if(this.listeners['event']) {
      args.event = event;
      this.listeners['event'](args);
    }
  }
}
