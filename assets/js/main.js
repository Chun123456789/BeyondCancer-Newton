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
});
