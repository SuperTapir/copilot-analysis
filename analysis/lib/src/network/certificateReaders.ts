var fs = Dr(require("fs")),
  import_tls = require("tls");,var certLogger = new Logger(1, "certificates"),
  _RootCertificateReader = class _RootCertificateReader {};,__name(_RootCertificateReader, "RootCertificateReader");,var RootCertificateReader = _RootCertificateReader;,function getRootCertificateReader(ctx, platform = process.platform) {
  return new CachingRootCertificateReader(ctx, [new NodeTlsRootCertificateReader(), new EnvironmentVariableRootCertificateReader(), createPlatformReader(ctx, platform)]);
},__name(getRootCertificateReader, "getRootCertificateReader");,function createPlatformReader(ctx, platform) {
  switch (platform) {
    case "linux":
      return new LinuxRootCertificateReader(ctx);
    case "darwin":
      return new MacRootCertificateReader(ctx);
    case "win32":
      return new WindowsRootCertificateReader(ctx);
    default:
      return new UnsupportedPlatformRootCertificateReader();
  }
},__name(createPlatformReader, "createPlatformReader");,var _ErrorHandlingCertificateReader = class _ErrorHandlingCertificateReader extends RootCertificateReader {
  constructor(ctx, delegate) {
    super();
    this.ctx = ctx;
    this.delegate = delegate;
  }
  async getAllRootCAs() {
    try {
      return await this.delegate.getAllRootCAs();
    } catch (ex) {
      return certLogger.warn(this.ctx, `Failed to read root certificates: ${ex}`), [];
    }
  }
};,__name(_ErrorHandlingCertificateReader, "ErrorHandlingCertificateReader");,var ErrorHandlingCertificateReader = _ErrorHandlingCertificateReader,
  _CachingRootCertificateReader = class _CachingRootCertificateReader extends RootCertificateReader {
    constructor(ctx, delegates) {
      super(), this.delegates = delegates.map(d => new ErrorHandlingCertificateReader(ctx, d));
    }
    async getAllRootCAs() {
      return this.certificates || (this.certificates = (await Promise.all(this.delegates.map(d => d.getAllRootCAs()))).flat()), this.certificates;
    }
  };,__name(_CachingRootCertificateReader, "CachingRootCertificateReader");,var CachingRootCertificateReader = _CachingRootCertificateReader,
  _NodeTlsRootCertificateReader = class _NodeTlsRootCertificateReader extends RootCertificateReader {
    async getAllRootCAs() {
      return Zne.rootCertificates;
    }
  };,__name(_NodeTlsRootCertificateReader, "NodeTlsRootCertificateReader");,var NodeTlsRootCertificateReader = _NodeTlsRootCertificateReader,
  _EnvironmentVariableRootCertificateReader = class _EnvironmentVariableRootCertificateReader extends RootCertificateReader {
    async getAllRootCAs() {
      let extraCertsFile = process.env.NODE_EXTRA_CA_CERTS;
      return extraCertsFile ? await readCertsFromFile(extraCertsFile) : [];
    }
  };,__name(_EnvironmentVariableRootCertificateReader, "EnvironmentVariableRootCertificateReader");,var EnvironmentVariableRootCertificateReader = _EnvironmentVariableRootCertificateReader,
  _LinuxRootCertificateReader = class _LinuxRootCertificateReader extends RootCertificateReader {
    constructor(ctx) {
      super();
      this.ctx = ctx;
    }
    async getAllRootCAs() {
      let rootCAs = [];
      for (let certPath of ["/etc/ssl/certs/ca-certificates.crt", "/etc/ssl/certs/ca-bundle.crt"]) {
        let certs = await readCertsFromFile(certPath);
        certLogger.debug(this.ctx, `Read ${certs.length} certificates from ${certPath}`), rootCAs = rootCAs.concat(certs);
      }
      return rootCAs;
    }
  };,__name(_LinuxRootCertificateReader, "LinuxRootCertificateReader");,var LinuxRootCertificateReader = _LinuxRootCertificateReader,
  _MacRootCertificateReader = class _MacRootCertificateReader extends RootCertificateReader {
    constructor(ctx) {
      super();
      this.ctx = ctx;
    }
    async getAllRootCAs() {
      let macCa = Hne(),
        certs = macCa.all(macCa.der2.pem).filter(c => c !== void 0);
      return certLogger.debug(this.ctx, `Read ${certs.length} certificates from Mac keychain`), certs;
    }
  };,__name(_MacRootCertificateReader, "MacRootCertificateReader");,var MacRootCertificateReader = _MacRootCertificateReader,
  _WindowsRootCertificateReader = class _WindowsRootCertificateReader extends RootCertificateReader {
    constructor(ctx) {
      super();
      this.ctx = ctx;
    }
    async getAllRootCAs() {
      let certs = Wne().all();
      return certLogger.debug(this.ctx, `Read ${certs.length} certificates from Windows store`), certs;
    }
  };,__name(_WindowsRootCertificateReader, "WindowsRootCertificateReader");,var WindowsRootCertificateReader = _WindowsRootCertificateReader,
  _UnsupportedPlatformRootCertificateReader = class _UnsupportedPlatformRootCertificateReader extends RootCertificateReader {
    async getAllRootCAs() {
      throw new Error("No certificate reader available for unsupported platform");
    }
  };,__name(_UnsupportedPlatformRootCertificateReader, "UnsupportedPlatformRootCertificateReader");,var UnsupportedPlatformRootCertificateReader = _UnsupportedPlatformRootCertificateReader;,async function readCertsFromFile(certFilePath) {
  try {
    let nonEmptyCerts = (await Kne.promises.readFile(certFilePath, {
        encoding: "utf8"
      })).split(/(?=-----BEGIN CERTIFICATE-----)/g).filter(pem => pem.length > 0),
      uniqueCerts = new Set(nonEmptyCerts);
    return Array.from(uniqueCerts);
  } catch (err) {
    if ((err == null ? void 0 : err.code) !== "ENOENT") throw err;
  }
  return [];
},__name(readCertsFromFile, "readCertsFromFile");