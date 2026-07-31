(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.searchSecurity = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function getSafeRelativeUrl(value, origin) {
    if (typeof value !== "string" || !/^\/(?![\\/])/.test(value)) {
      return null;
    }

    try {
      const url = new URL(value, origin);
      if (url.origin !== origin) {
        return null;
      }
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return null;
    }
  }

  return Object.freeze({ getSafeRelativeUrl });
});
