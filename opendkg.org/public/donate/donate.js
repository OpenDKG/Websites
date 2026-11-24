const address = document.querySelector("#eth-address");
const button = document.querySelector("#copy-address");
const status = document.querySelector("#copy-status");

button.hidden = false;
button.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(address.value);
    status.textContent = "Address copied.";
  } catch {
    address.focus();
    address.select();
    status.textContent = "Address selected. Copy it with your keyboard or device menu.";
  }
});
