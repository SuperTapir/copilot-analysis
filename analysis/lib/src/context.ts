var _Context = class _Context {
  constructor() {
    this.instances = new Map();
  }
  get(ctor) {
    let value = this.tryGet(ctor);
    if (value) return value;
    throw new Error(`No instance of ${ctor.name} has been registered.`);
  }
  tryGet(ctor) {
    let value = this.instances.get(ctor);
    if (value) return value;
  }
  set(ctor, instance) {
    if (this.tryGet(ctor)) throw new Error(`An instance of ${ctor.name} has already been registered. Use forceSet() if you're sure it's a good idea.`);
    this.assertIsInstance(ctor, instance), this.instances.set(ctor, instance);
  }
  forceSet(ctor, instance) {
    this.assertIsInstance(ctor, instance), this.instances.set(ctor, instance);
  }
  assertIsInstance(ctor, instance) {
    if (!(instance instanceof ctor)) {
      let inst = JSON.stringify(instance);
      throw new Error(`The instance you're trying to register for ${ctor.name} is not an instance of it (${inst}).`);
    }
  }
};,__name(_Context, "Context");,var Context = _Context;