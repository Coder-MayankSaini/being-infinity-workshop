const PROFILES = {
  male: {
    name: "John",
    src: "src/john.png",
    alt: "Male profile portrait of John",
  },
  female: {
    name: "Jane",
    src: "src/jane.png",
    alt: "Female profile portrait of Jane",
  },
};

const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const switchButtons = document.querySelectorAll(".switch-btn");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeGender = "male";

// Preload images so switching between Male and Female is immediate.
Object.values(PROFILES).forEach(({ src }) => {
  const img = new Image();
  img.src = src;
});

function setGender(gender) {
  const profile = PROFILES[gender];
  if (!profile || gender === activeGender) {
    return;
  }

  activeGender = gender;

  profileImage.src = profile.src;
  profileImage.alt = profile.alt;
  profileName.textContent = profile.name;

  if (!reducedMotionQuery.matches) {
    profileImage.classList.remove("is-switching");
    // Force reflow so re-adding the class restarts the reveal animation.
    void profileImage.offsetWidth;
    profileImage.classList.add("is-switching");
  }

  switchButtons.forEach((button) => {
    const isSelected = button.dataset.gender === gender;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

switchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setGender(button.dataset.gender);
  });
});

profileImage.addEventListener("animationend", () => {
  profileImage.classList.remove("is-switching");
});
