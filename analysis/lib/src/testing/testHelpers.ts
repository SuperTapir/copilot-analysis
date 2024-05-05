var _TestUrlOpener = class _TestUrlOpener extends UrlOpener {
  constructor() {
    super(...arguments);
    this.openedUrls = [];
  }
  async open(target) {
    this.openedUrls.push(target);
  }
};,__name(_TestUrlOpener, "TestUrlOpener");,var TestUrlOpener = _TestUrlOpener;