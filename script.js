// ===== PENGATURAN — ubah di sini =====
// Nomor WhatsApp admin (format internasional, tanpa + dan tanpa spasi).
// CONTOH saja — ganti dengan nomor admin asli sebelum dibagikan.
const WA_ADMIN = "6281234567890";

// Jadwal tour: hari (0=Minggu ... 6=Sabtu) dan jam yang tersedia.
const JADWAL = {
  2: ["09.00", "13.00"], // Selasa
  4: ["09.00", "13.00"], // Kamis
  6: ["09.00"],          // Sabtu
};
const NAMA_HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
// =====================================

const form = document.getElementById("tourForm");
const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");
const errEl = document.getElementById("formError");

// Tanggal paling cepat: besok
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateEl.min = toISO(tomorrow);

function toISO(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

dateEl.addEventListener("change", () => {
  timeEl.innerHTML = "";
  hideError();
  if (!dateEl.value) return resetTime("Pilih tanggal dulu");
  const day = parseDate(dateEl.value).getDay();
  const slots = JADWAL[day];
  if (!slots) {
    resetTime("Tidak ada tour di hari ini");
    showError(`Tour tidak tersedia hari ${NAMA_HARI[day]}. Silakan pilih Selasa, Kamis, atau Sabtu.`);
    return;
  }
  timeEl.disabled = false;
  timeEl.append(new Option("Pilih jam…", ""));
  slots.forEach((s) => timeEl.append(new Option(`${s} WIB`, s)));
});

function resetTime(label) {
  timeEl.innerHTML = "";
  timeEl.append(new Option(label, ""));
  timeEl.disabled = true;
}

function showError(msg) {
  errEl.textContent = msg;
  errEl.hidden = false;
}
function hideError() {
  errEl.hidden = true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  hideError();
  const data = Object.fromEntries(new FormData(form));

  if (!data.parent || !data.phone || !data.child || !data.level || !data.date || !data.time) {
    showError("Mohon lengkapi semua kolom, kecuali pertanyaan yang opsional.");
    return;
  }
  if (!/^(\+?62|0)8\d{7,12}$/.test(data.phone.replace(/[\s-]/g, ""))) {
    showError("Nomor WhatsApp sepertinya belum benar. Contoh: 081234567890.");
    return;
  }

  const tgl = parseDate(data.date);
  const tglText = `${NAMA_HARI[tgl.getDay()]}, ${tgl.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`;

  const pesan = [
    "Halo Admin Sekolah Persada, saya ingin booking school tour.",
    "",
    `Nama orang tua: ${data.parent}`,
    `No. WhatsApp: ${data.phone}`,
    `Nama anak: ${data.child}`,
    `Jenjang: ${data.level}`,
    `Jadwal: ${tglText}, pukul ${data.time} WIB`,
    data.note ? `Pertanyaan: ${data.note}` : null,
  ].filter((l) => l !== null).join("\n");

  window.open(`https://wa.me/${WA_ADMIN}?text=${encodeURIComponent(pesan)}`, "_blank");
});
