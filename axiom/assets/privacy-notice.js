(function () {
  var key = "opendkg_privacy_notice_v1";
  var notice = document.getElementById("privacy-notice");
  if (!notice) return;

  try {
    if (window.localStorage && window.localStorage.getItem(key) === "1") {
      notice.hidden = true;
      return;
    }
  } catch (err) {
    // Storage access blocked; keep notice visible until dismissed.
  }

  var btn = document.getElementById("privacy-notice-dismiss");
  if (!btn) return;
  btn.addEventListener("click", function () {
    notice.hidden = true;
    try {
      if (window.localStorage) {
        window.localStorage.setItem(key, "1");
      }
    } catch (err) {
      // Ignore storage write failures cleanly.
    }
  });
})();
