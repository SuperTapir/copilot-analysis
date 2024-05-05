async function* asyncIterableMap(source, selector) {
  for await (let item of source) yield selector(item);
},__name(asyncIterableMap, "asyncIterableMap");,async function* asyncIterableFilter(source, predicate) {
  for await (let item of source) (await predicate(item)) && (yield item);
},__name(asyncIterableFilter, "asyncIterableFilter");