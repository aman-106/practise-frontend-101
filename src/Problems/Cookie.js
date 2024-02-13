function install() {
  const cookieMap = {};

  Object.defineProperty(document, "myCookie", {
    set(value) {
      const cookieDetails = value.replaceAll(/\s/g, "").split(";");
      const [cookieInfo, expirationInfo = ""] = cookieDetails;
      const [key, val] = cookieInfo.split("=");
      const [, timeout] = expirationInfo.split("=");
      const data = {
        val,
        expires: Number(timeout * 1000) + Date.now(),
      };
      cookieMap[key] = data;
    },
    get() {
      return Object.entries(cookieMap)
        .filter(([key, { expires }]) => {
          if (!expires) {
            return true;
          }

          if (Date.now() >= expires) {
            delete cookieMap[key];
            return false;
          }

          return true;
        })
        .map(([key, { val }]) => `${key}=${val}`)
        .join("; ");
    },
    configurable: true,
  });
}

// disable myCookie
function uninstall() {
  // your code here
  delete document.myCookie;
}
