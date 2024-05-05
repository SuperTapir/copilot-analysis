var _Debouncer = class _Debouncer {
  async debounce(ms) {
    return this.state && (clearTimeout(this.state.timer), this.state.reject(), this.state = void 0), new Promise((resolve, reject) => {
      this.state = {
        timer: setTimeout(() => resolve(), ms),
        reject: reject
      };
    });
  }
};,__name(_Debouncer, "Debouncer");,var Debouncer = _Debouncer;