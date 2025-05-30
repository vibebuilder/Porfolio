const entryInput = document.getElementById("entry");
const entriesList = document.getElementById("entriesList");

function saveEntry() {
  const text = entryInput.value.trim();
  if (text === "") return;

  const entries = JSON.parse(localStorage.getItem("gratitudeEntries")) || [];
  entries.unshift({ text, date: new Date().toLocaleString() });

  localStorage.setItem("gratitudeEntries", JSON.stringify(entries));
  entryInput.value = "";
  displayEntries();
}

function displayEntries() {
  const entries = JSON.parse(localStorage.getItem("gratitudeEntries")) || [];
  entriesList.innerHTML = "";
  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} — ${entry.text}`;
    entriesList.appendChild(li);
  });
}

displayEntries();

// Floating emoji background
const emojiContainer = document.getElementById("emoji-bg");
const emojis = ["☕", "🍵", "🥤", "🥛", "🧃", "🧉", "🍶"];

function spawnEmoji() {
  const emoji = document.createElement("div");
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.position = "absolute";
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.top = "-2em";
  emoji.style.fontSize = (Math.random() * 1.5 + 1) + "em";
  emoji.style.animation = `fall ${Math.random() * 10 + 10}s linear infinite`;
  emojiContainer.appendChild(emoji);

  setTimeout(() => emoji.remove(), 10000);
}

setInterval(spawnEmoji, 300);

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fall {
    to {
      transform: translateY(110vh);
    }
  }
`;
document.head.appendChild(styleSheet);
