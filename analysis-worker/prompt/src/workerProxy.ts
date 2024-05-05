function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`delay: ${delay}`), delay);
  });
},var import_path,
  import_worker_threads,
  workerFns,
  WorkerProxy,
  workerProxy,
  init_workerProxy = __esmMin(() => {
    "use strict";

    import_path = require("path"), import_worker_threads = require("worker_threads");
    init_neighboringFiles();
    __name(sleep, "sleep");
    workerFns = ["getNeighborSnippets", "sleep"], WorkerProxy = class {
      constructor() {
        this.nextHandlerId = 0;
        this.handlers = new Map();
        this.fns = new Map();
        this.getNeighborSnippets = getNeighborSnippets;
        this.sleep = sleep;
        !K.isMainThread && K.workerData?.port && (hn(), process.cwd = () => K.workerData.cwd, this.configureWorkerResponse(K.workerData.port));
      }
      static {
        __name(this, "WorkerProxy");
      }
      initWorker() {
        let {
          port1: port1,
          port2: port2
        } = new K.MessageChannel();
        this.port = port1, this.worker = new K.Worker((0, Ao.resolve)(__dirname, "..", "dist", "workerProxy.js"), {
          workerData: {
            port: port2,
            cwd: process.cwd()
          },
          transferList: [port2]
        }), this.port.on("message", m => this.handleMessage(m)), this.port.on("error", e => this.handleError(e));
      }
      startThreading() {
        if (this.worker) throw new Error("Worker thread already initialized.");
        this.proxyFunctions(), this.initWorker();
      }
      stopThreading() {
        this.worker && (this.worker.terminate(), this.worker.removeAllListeners(), this.worker = void 0, this.unproxyFunctions(), this.handlers.clear());
      }
      proxyFunctions() {
        for (let fn of workerFns) this.fns.set(fn, this[fn]), this.proxy(fn);
      }
      unproxyFunctions() {
        for (let fn of workerFns) {
          let originalFn = this.fns.get(fn);
          if (originalFn) this[fn] = originalFn;else throw new Error(`Unproxy function not found: ${fn}`);
        }
      }
      configureWorkerResponse(port) {
        this.port = port, this.port.on("message", async ({
          id: id,
          fn: fn,
          args: args
        }) => {
          let proxiedFunction = this[fn];
          if (!proxiedFunction) throw new Error(`Function not found: ${fn}`);
          try {
            let res = await proxiedFunction.apply(this, args);
            this.port.postMessage({
              id: id,
              res: res
            });
          } catch (err) {
            if (!(err instanceof Error)) throw err;
            typeof err.code == "string" ? this.port.postMessage({
              id: id,
              err: err,
              code: err.code
            }) : this.port.postMessage({
              id: id,
              err: err
            });
          }
        });
      }
      handleMessage({
        id: id,
        err: err,
        code: code,
        res: res
      }) {
        let handler = this.handlers.get(id);
        handler && (this.handlers.delete(id), err ? (err.code = code, handler.reject(err)) : handler.resolve(res));
      }
      handleError(maybeError) {
        console.log(maybeError);
        let err;
        if (maybeError instanceof Error) {
          err = maybeError, err.code === "MODULE_NOT_FOUND" && err.message?.endsWith("workerProxy.js'") && (err = new Error("Failed to load workerProxy.js"), err.code = "CopilotPromptLoadFailure");
          let ourStack = new Error().stack;
          err.stack && ourStack?.match(/^Error\n/) && (err.stack += ourStack.replace(/^Error/, ""));
        } else maybeError?.name === "ExitStatus" && typeof maybeError.status == "number" ? (err = new Error(`workerProxy.js exited with status ${maybeError.status}`), err.code = `CopilotPromptWorkerExit${maybeError.status}`) : err = new Error(`Non-error thrown: ${maybeError}`);
        for (let handler of this.handlers.values()) handler.reject(err);
        throw err;
      }
      proxy(fn) {
        this[fn] = function (...args) {
          let id = this.nextHandlerId++;
          return new Promise((resolve, reject) => {
            this.handlers.set(id, {
              resolve: resolve,
              reject: reject
            }), this.port?.postMessage({
              id: id,
              fn: fn,
              args: args
            });
          });
        };
      }
    }, workerProxy = new WorkerProxy();
  });