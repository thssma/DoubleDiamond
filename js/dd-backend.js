(function(window){
  "use strict";

  const config = window.DDConfig || {};
  const endpoints = config.BACKEND_ENDPOINTS || {};

  function endpointFor(table, action){
    return endpoints[`${table}.${action}`] || endpoints[table] || endpoints.default || "";
  }

  function isConfigured(table, action){
    return Boolean(endpointFor(table, action));
  }

  async function requestBackendOperation(table, action, payload){
    const endpoint = endpointFor(table, action);
    if(!endpoint) return null;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        table,
        action,
        payload: payload || {},
        source: "doublediamond-frontend"
      })
    });

    return response;
  }

  window.DDBackend = {
    endpointFor,
    isConfigured,
    requestBackendOperation
  };
})(window);
