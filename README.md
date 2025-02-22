# 🎁 Greeting Card Form

Greeting Card Form adalah aplikasi React yang memungkinkan pengguna membuat dan mengunduh kartu ucapan dengan teks khusus serta gambar latar belakang yang dipilih.

## 🚀 Fitur
- **Unggah Gambar**: Pilih gambar untuk digunakan sebagai latar belakang kartu ucapan.
- **Personalisasi Teks**: Tambahkan teks `Dear`, `Message`, dan `From` sesuai keinginan.
- **Pratinjau Kartu**: Menampilkan kartu ucapan dalam format canvas.
- **Unduh sebagai PNG**: Simpan hasil kartu ucapan sebagai gambar PNG.

---

## 📦 **Instalasi & Menjalankan Aplikasi**

### **1. Clone Repository**
```sh
git clone https://github.com/ryanprtma/greeting-card-generator.git
cd greeting-card-generator
```

### **2. Instal Dependensi**
```sh
npm install
```
atau menggunakan Yarn:
```sh
yarn install
```

### **3. Jalankan Aplikasi**
```sh
npm start
```
atau:
```sh
yarn start
```
Aplikasi akan berjalan di **http://localhost:3000**.

---

## ✅ **Menjalankan Unit Test**
Gunakan perintah berikut untuk menjalankan pengujian unit:
```sh
npm test a
```
atau:
```sh
yarn test a
```

---

## 🔧 **Struktur Proyek**
```
greeting-card-generator/
│── src/
│   ├── components/
│   │   ├── GiftCardForm.js  # Komponen utama formulir kartu ucapan
│   ├── tests/
│   │   ├── GiftCardForm.test.js  # Unit test untuk GiftCardForm
│   ├── assets/
│   ├── App.js
│   ├── index.js
│── public/
│── package.json
│── README.md
```

---

## 🛠 **Teknologi yang Digunakan**
- **React.js** - Library UI utama.
- **react-dropzone** - Untuk menangani unggahan gambar.
- **Jest & React Testing Library** - Untuk unit testing.

---

## 📜 **Unit Test: GiftCardForm.test.js**
Berikut adalah contoh pengujian unit untuk komponen **GiftCardForm**:

```javascript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GiftCardForm from "../components/GiftCardForm";

test("renders Gift Card form fields", () => {
    render(<GiftCardForm />);

    expect(screen.getByLabelText(/Dear/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/From/i)).toBeInTheDocument();
    expect(screen.getByText(/File Upload/i)).toBeInTheDocument();
});

test("allows user to upload an image", async () => {
    render(<GiftCardForm />);
    
    const fileInput = screen.getByTestId("file-input");
    const file = new File(["hello"], "test-image.png", { type: "image/png" });

    await userEvent.upload(fileInput, file);

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
});
```

---