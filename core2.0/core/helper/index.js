const isProxy = (obj) => {
  return obj.tpof === "Proxy" ? true : false; 
}

const typeOf = (obj) => {
  const type = typeof obj;
  if (type === "object") {
    if (isProxy(obj)) {
      return "proxy";
    } else if (Array.isArray(obj)) {
      return "array";
    }
    return "object"
  }
  return type;
}

const isTypeOfProxyValue = (obj) => {
  if (obj.tppx === "ProxyValue") return true
  return false;
}

export {
  isProxy,
  typeOf,
  isTypeOfProxyValue
}