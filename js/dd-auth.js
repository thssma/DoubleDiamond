(function(window){
  "use strict";

  const SESSION_KEY = "dd_auth_session_v1";
  const DEFAULT_OWNER_PIN = "owner123";
  const DEFAULT_EMPLOYEE_PIN = "field123";

  function readJson(key, fallback){
    try{
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    }catch(e){
      return fallback;
    }
  }

  function getSession(){
    return readJson(SESSION_KEY, null);
  }

  function setSession(session){
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    if(session && session.role) localStorage.setItem("dd_role", session.role);
  }

  function clearSession(){
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("dd_role");
  }

  function getRole(defaultRole){
    const session = getSession() || {};
    return localStorage.getItem("dd_role") || session.role || defaultRole || "client";
  }

  function setRoleSession(role, name, email){
    setSession({
      role,
      name: name || role,
      email: email || "",
      logged_at: new Date().toISOString()
    });
  }

  function validateStaffPin(role, pin){
    if(role === "owner") return pin === DEFAULT_OWNER_PIN;
    if(role === "employee") return pin === DEFAULT_EMPLOYEE_PIN;
    return false;
  }

  window.DDAuth = {
    SESSION_KEY,
    DEFAULT_OWNER_PIN,
    DEFAULT_EMPLOYEE_PIN,
    getSession,
    setSession,
    clearSession,
    getRole,
    setRoleSession,
    validateStaffPin
  };
})(window);
