(function(window){
  "use strict";

  const nativeAlert = window.alert.bind(window);
  const transforms = [];
  const beforeAlert = [];
  let installed = false;

  function normalizeMessage(message){
    return transforms.reduce(function(current, transform){
      return transform(current);
    }, String(message || ""));
  }

  function registerTransform(transform){
    if(typeof transform === "function") transforms.push(transform);
  }

  function registerBeforeAlert(handler){
    if(typeof handler === "function") beforeAlert.push(handler);
  }

  function install(){
    if(installed) return;
    window.alert = function(message){
      let text = String(message || "");
      for(const handler of beforeAlert){
        try{
          const result = handler(text);
          if(result === false) return;
          if(typeof result === "string") text = result;
        }catch(error){
          console.warn("Alert handler skipped", error);
        }
      }
      nativeAlert(normalizeMessage(text));
    };
    installed = true;
  }

  window.DDAlerts = {
    install,
    registerTransform,
    registerBeforeAlert,
    normalizeMessage
  };

  install();
})(window);
