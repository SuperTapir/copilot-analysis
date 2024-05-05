var accessTimes = new LRUCacheMap();,function sortByAccessTimes(docs) {
  return [...docs].sort((a, b) => {
    var _a, _b;
    let aAccessTime = (_a = accessTimes.get(a.uri.toString())) != null ? _a : 0;
    return ((_b = accessTimes.get(b.uri.toString())) != null ? _b : 0) - aAccessTime;
  });
},__name(sortByAccessTimes, "sortByAccessTimes");