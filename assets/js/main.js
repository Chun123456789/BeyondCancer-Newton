document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var here = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "") || "index";
  document.querySelectorAll(".nav-links a[data-page]").forEach(function (a) {
    var page = a.getAttribute("data-page").replace(/\.html$/, "");
    if (page === here) a.classList.add("active");
  });

  var lightbox = document.querySelector(".lightbox");
  var triggers = document.querySelectorAll(".lightbox-trigger");
  if (lightbox && triggers.length) {
    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector(".lightbox-caption");
    var lbCounter = lightbox.querySelector(".lightbox-counter");
    var lbPrev = lightbox.querySelector(".lightbox-prev");
    var lbNext = lightbox.querySelector(".lightbox-next");
    var lbClose = lightbox.querySelector(".lightbox-close");
    var images = [];
    var captions = [];
    var index = 0;

    function render() {
      lbImg.src = images[index];
      lbCaption.textContent = captions[index] || "";
      var multi = images.length > 1;
      lbCounter.textContent = multi ? (index + 1) + " / " + images.length : "";
      lbCounter.style.display = multi ? "block" : "none";
      lbPrev.style.display = multi ? "flex" : "none";
      lbNext.style.display = multi ? "flex" : "none";
    }

    function open(imgs, caps, startIndex) {
      images = imgs;
      captions = caps;
      index = startIndex || 0;
      render();
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var imgs = JSON.parse(trigger.getAttribute("data-images"));
        var caps = JSON.parse(trigger.getAttribute("data-captions") || "[]");
        var startIndex = parseInt(trigger.getAttribute("data-index") || "0", 10);
        open(imgs, caps, startIndex);
      });
    });

    lbPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      index = (index - 1 + images.length) % images.length;
      render();
    });
    lbNext.addEventListener("click", function (e) {
      e.stopPropagation();
      index = (index + 1) % images.length;
      render();
    });
    lbClose.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") lbPrev.click();
      if (e.key === "ArrowRight") lbNext.click();
    });
  }
});
