(function(window){
  "use strict";

  const SESSION_KEY = "dd_auth_session_v1";
  const ROLE_KEY = "dd_role";
  const config = window.DDConfig || {};
  const demoPins = config.DEMO_PINS || {};
  const DEFAULT_OWNER_PIN = demoPins.owner || "owner123";
  const DEFAULT_EMPLOYEE_PIN = demoPins.employee || "field123";
  const storage = window.DDStorage;

  function readJson(key, fallback){
    if(storage) return storage.getJson(key, fallback);
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
    if(storage) storage.setJson(SESSION_KEY, session);
    else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    if(session && session.role){
      if(storage) storage.set(ROLE_KEY, session.role);
      else localStorage.setItem(ROLE_KEY, session.role);
    }
  }

  function clearSession(){
    if(storage){
      storage.remove(SESSION_KEY);
      storage.remove(ROLE_KEY);
      return;
    }
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  function getRole(defaultRole){
    const session = getSession() || {};
    const storedRole = storage ? storage.get(ROLE_KEY, null) : localStorage.getItem(ROLE_KEY);
    return storedRole || session.role || defaultRole || "client";
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
    ROLE_KEY,
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
