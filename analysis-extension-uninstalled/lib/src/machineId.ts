var import_os = require("os");,var crypto = require("crypto"),
  invalidMacAddresses = new Set(["00:00:00:00:00:00", "ff:ff:ff:ff:ff:ff", "ac:de:48:00:11:22"]);,function validateMacAddress(candidate) {
  let tempCandidate = candidate.replace(/-/g, ":").toLowerCase();
  return !invalidMacAddresses.has(tempCandidate);
},__name(validateMacAddress, "validateMacAddress");,function getMac() {
  let ifaces = (0, zM.networkInterfaces)();
  for (let name in ifaces) {
    let networkInterface = ifaces[name];
    if (networkInterface) {
      for (let {
        mac: mac
      } of networkInterface) if (validateMacAddress(mac)) return mac;
    }
  }
  throw new Error("Unable to retrieve mac address (unexpected format)");
},__name(getMac, "getMac");,var machineId;,function getMacMachineId() {
  try {
    let macAddress = getMac();
    return crypto.createHash("sha256").update(macAddress, "utf8").digest("hex");
  } catch {
    return;
  }
},__name(getMacMachineId, "getMacMachineId");,function getMachineId() {
  return machineId || (machineId = getMacMachineId() || v4_default()), machineId;
},__name(getMachineId, "getMachineId");