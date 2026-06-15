(function(window){
  "use strict";

  const config = window.DDConfig || {};
  const SUPABASE_URL = config.SUPABASE_URL || "";
  const SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY || "";
  const SAFE_TABLE_NAME = /^[a-z][a-z0-9_]*$/;

  function backendRequiredTables(){
    return (window.DDDataContract && window.DDDataContract.BACKEND_REQUIRED_TABLES) || [];
  }

  function isBackendRequiredTable(table){
    return backendRequiredTables().includes(String(table || ""));
  }

  function backendPlaceholderResponse(table, action){
    const payload = {
      simulated: true,
      table,
      action,
      message: "Backend-only operation prepared. Route this through an Edge Function or backend API in production."
    };
    return {
      ok: true,
      status: 202,
      statusText: "Accepted",
      json: async function(){ return [payload]; },
      text: async function(){ return JSON.stringify(payload); }
    };
  }

  async function backendWriteResponse(table, action, payload){
    if(window.DDBackend && typeof window.DDBackend.requestBackendOperation === "function"){
      const response = await window.DDBackend.requestBackendOperation(table, action, payload);
      if(response) return response;
    }
    return backendPlaceholderResponse(table, action);
  }

  function isConfigured(){
    return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
  }

  function safeTable(table){
    const value = String(table || "");
    if(!SAFE_TABLE_NAME.test(value)) throw new Error("Invalid table name");
    return value;
  }

  function apiHeaders(extraHeaders){
    return {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(extraHeaders || {})
    };
  }

  async function apiGet(table){
    if(!isConfigured()) return [];
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${safeTable(table)}?select=*&order=created_at.desc`, {
      headers: apiHeaders()
    });
    if(!response.ok) return [];
    return await response.json();
  }

  async function apiInsert(table, data){
    if(!isConfigured()) throw new Error("API is not configured");
    const tableName = safeTable(table);
    if(isBackendRequiredTable(tableName)) return await backendWriteResponse(tableName, "insert", { data });
    return await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
      method: "POST",
      headers: apiHeaders({"Prefer": "return=representation"}),
      body: JSON.stringify(data)
    });
  }

  async function apiPatch(table, id, data){
    if(!isConfigured()) throw new Error("API is not configured");
    const tableName = safeTable(table);
    if(isBackendRequiredTable(tableName)) return await backendWriteResponse(tableName, "patch", { id, data });
    return await fetch(`${SUPABASE_URL}/rest/v1/${tableName}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: apiHeaders({"Prefer": "return=representation"}),
      body: JSON.stringify(data)
    });
  }

  async function apiDelete(table, id){
    if(!isConfigured()) throw new Error("API is not configured");
    const tableName = safeTable(table);
    if(isBackendRequiredTable(tableName)) return await backendWriteResponse(tableName, "delete", { id });
    return await fetch(`${SUPABASE_URL}/rest/v1/${tableName}?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: apiHeaders()
    });
  }

  window.DDApi = {
    isBackendRequiredTable,
    backendPlaceholderResponse,
    backendWriteResponse,
    isConfigured,
    safeTable,
    apiHeaders,
    apiGet,
    apiInsert,
    apiPatch,
    apiDelete
  };

  window.apiGet = apiGet;
  window.apiInsert = apiInsert;
  window.apiPatch = apiPatch;
  window.apiDelete = apiDelete;
})(window);
