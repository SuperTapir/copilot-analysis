var LineWithValueAndCost,
  init_lineWithValueAndCost = __esmMin(() => {
    "use strict";

    init_tokenization();
    LineWithValueAndCost = class _LineWithValueAndCost {
      constructor(text, _value, _cost = getTokenizer().tokenLength(text + `
`), validate = "strict") {
        this.text = text;
        this._value = _value;
        this._cost = _cost;
        if (text.includes(`
`) && validate !== "none") throw new Error("LineWithValueAndCost: text contains newline");
        if (_value < 0 && validate !== "none") throw new Error("LineWithValueAndCost: value is negative");
        if (_cost < 0 && validate !== "none") throw new Error("LineWithValueAndCost: cost is negative");
        if (validate == "strict" && _value > 1) throw new Error("Value should normally be between 0 and 1 -- set validation to `loose` to ignore this error");
      }
      static {
        __name(this, "LineWithValueAndCost");
      }
      get value() {
        return this._value;
      }
      get cost() {
        return this._cost;
      }
      adjustValue(multiplier) {
        return this._value *= multiplier, this;
      }
      recost(coster = x => getTokenizer().tokenLength(x + `
`)) {
        return this._cost = coster(this.text), this;
      }
      copy() {
        return new _LineWithValueAndCost(this.text, this.value, this.cost, "none");
      }
    };
  });