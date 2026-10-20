# School Tour — Sekolah Persada

Halaman booking school tour Sekolah Persada (Jatibening, Bekasi). Calon orang tua mengisi formulir, lalu diarahkan ke WhatsApp admin dengan pesan yang sudah terisi otomatis.

Dibuat sebagai tugas akhir kursus Claude: kode di GitHub, online lewat Cloudflare Pages.

## Isi repo

| File | Fungsi |
|---|---|
| `index.html` | Isi halaman |
| `style.css` | Tampilan (warna & font brand Persada) |
| `script.js` | Formulir, jadwal tour, dan link WhatsApp |

Website statis, tanpa proses *build*.

## Yang masih berupa contoh (ganti sebelum dibagikan)

- [ ] Nomor WhatsApp admin: `WA_ADMIN` di `script.js`
- [ ] Jadwal tour: `JADWAL` di `script.js` (saat ini Selasa & Kamis 09.00/13.00, Sabtu 09.00)
- [ ] Foto kegiatan murid di bagian atas `index.html`
- [ ] Testimoni orang tua di `index.html`

## Online-kan di Cloudflare Pages

1. Login ke dash.cloudflare.com, buka **Workers & Pages**, lalu **Create**, lalu tab **Pages**, lalu **Connect to Git**.
2. Pilih akun GitHub dan repo `school_tour`.
3. Framework preset: **None**. Build command: kosongkan. Build output directory: `/`.
4. Klik **Save and Deploy**. Link `*.pages.dev` akan muncul dalam 1–2 menit.

Setiap perubahan yang disimpan ke GitHub akan otomatis ter-update di link tersebut.
