var tls = Dr(require("tls"));,var _RootCertificateConfigurator = class _RootCertificateConfigurator {
  constructor(ctx) {
    this._certificateReader = ctx.get(RootCertificateReader);
  }
  async enhanceProxySettings(proxySettings) {
    let certs = await this.getCertificates();
    return {
      ...proxySettings,
      ca: certs
    };
  }
  async getCertificates() {
    let certificates = await this._certificateReader.getAllRootCAs();
    if (certificates.length !== 0) return certificates;
  }
  async applyToRequestOptions(requestOptions) {
    let certs = await this._certificateReader.getAllRootCAs(),
      options = {
        _vscodeAdditionalCaCerts: certs
      };
    requestOptions.secureContext = _pe.createSecureContext(options), requestOptions.ca = certs, requestOptions.cert = certs, certs.map(cert => {
      requestOptions.secureContext.context.addCACert(cert);
    });
  }
};,__name(_RootCertificateConfigurator, "RootCertificateConfigurator");,var RootCertificateConfigurator = _RootCertificateConfigurator;