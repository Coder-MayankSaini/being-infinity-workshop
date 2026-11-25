const button = document.getElementById("action-btn");
const statusText = document.getElementById("status");

let clickCount = 0;

button.addEventListener("click", () => {
  clickCount += 1;
  button.textContent = `Click me (${clickCount})`;
  statusText.textContent = `Button clicked ${clickCount} ${clickCount === 1 ? "time" : "times"}.`;
});
