(function(window, document){
  "use strict";

  function registerServiceWorker(){
    if(!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("./service-worker.js").catch(function(){});
  }

  function bindMobileNavClose(){
    document.addEventListener("click", function(event){
      const target = event.target;
      const button = target && target.closest ? target.closest(".menu-btn") : null;
      if(button && document.body.classList.contains("nav-open")){
        document.body.classList.remove("nav-open");
      }
    });
  }

  function initShell(){
    registerServiceWorker();
    bindMobileNavClose();
  }

  window.DDShell = {
    initShell,
    registerServiceWorker,
    bindMobileNavClose
  };

  initShell();
})(window, document);
