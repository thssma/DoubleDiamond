(function(window, document){
  "use strict";

  const BAD_PROJECT_PHOTO_RE = /images\.unsplash\.com|photo-1599598425947-5b1a1cfacd57|Project%20Photo/i;

  function svgDataUrl(svg){
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  const PLACEHOLDERS = {
    imageUnavailable: svgDataUrl("<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%' height='100%' fill='#eef2f7'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#64748b' font-family='Arial' font-size='28'>Image unavailable</text></svg>"),
    projectPhoto: svgDataUrl("<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'><defs><linearGradient id='g' x1='0' x2='1'><stop stop-color='#dcfce7'/><stop offset='1' stop-color='#fef3c7'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><text x='50%' y='48%' dominant-baseline='middle' text-anchor='middle' fill='#14532d' font-family='Arial' font-size='42' font-weight='700'>Project Photo</text><text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' fill='#64748b' font-family='Arial' font-size='24'>Image unavailable</text></svg>")
  };

  function installImageFallback(img, placeholder){
    if(!img || img.dataset.ddImageFallback === "true") return;
    img.dataset.ddImageFallback = "true";
    img.onerror = function(){
      this.onerror = null;
      this.src = placeholder || PLACEHOLDERS.projectPhoto;
    };
  }

  function fixImageElement(img, placeholder){
    const fallback = placeholder || PLACEHOLDERS.projectPhoto;
    installImageFallback(img, fallback);
    const src = img.getAttribute("src") || "";
    if(BAD_PROJECT_PHOTO_RE.test(src)){
      img.src = fallback;
    }
  }

  function fixBackgroundElement(element, placeholder){
    const fallback = placeholder || PLACEHOLDERS.projectPhoto;
    const background = element.style && element.style.backgroundImage ? element.style.backgroundImage : "";
    const style = element.getAttribute && (element.getAttribute("style") || "");
    if(BAD_PROJECT_PHOTO_RE.test(background) || BAD_PROJECT_PHOTO_RE.test(style)){
      element.style.backgroundImage = `url("${fallback}")`;
      element.style.backgroundSize = "cover";
      element.style.backgroundPosition = "center";
    }
  }

  function fixProjectImages(root){
    const scope = root || document;
    scope.querySelectorAll("img").forEach(function(img){
      fixImageElement(img, PLACEHOLDERS.projectPhoto);
    });
    scope.querySelectorAll("[style*='background-image'], [style*='unsplash']").forEach(function(element){
      fixBackgroundElement(element, PLACEHOLDERS.projectPhoto);
    });
  }

  function installGenericImageFallbacks(root){
    const scope = root || document;
    scope.querySelectorAll("img").forEach(function(img){
      installImageFallback(img, PLACEHOLDERS.imageUnavailable);
    });
  }

  window.DDImages = {
    PLACEHOLDERS,
    BAD_PROJECT_PHOTO_RE,
    installImageFallback,
    fixImageElement,
    fixBackgroundElement,
    fixProjectImages,
    installGenericImageFallbacks
  };
})(window, document);
