(function(window){
  "use strict";

  const config = window.DDConfig || {};
  const SUPABASE_URL = config.SUPABASE_URL || "";
  const SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY || "";
  const SAFE_TABLE_NAME = /^[a-z][a-z0-9_]*$/;

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
    return await fetch(`${SUPABASE_URL}/rest/v1/${safeTable(table)}`, {
      method: "POST",
      headers: apiHeaders({"Prefer": "return=representation"}),
      body: JSON.stringify(data)
    });
  }

  async function apiPatch(table, id, data){
    if(!isConfigured()) throw new Error("API is not configured");
    return await fetch(`${SUPABASE_URL}/rest/v1/${safeTable(table)}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: apiHeaders({"Prefer": "return=representation"}),
      body: JSON.stringify(data)
    });
  }

  async function apiDelete(table, id){
    if(!isConfigured()) throw new Error("API is not configured");
    return await fetch(`${SUPABASE_URL}/rest/v1/${safeTable(table)}?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: apiHeaders()
    });
  }

  window.DDApi = {
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
