/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 * Tulis seluruh kode JavaScript kamu di sini.
 */

// TODO [Basic] Buat variabel array untuk menyimpan semua data transaksi, contoh: let transactions = []
// TODO [Basic] Buat fungsi untuk menghasilkan ID unik secara otomatis, contoh: gunakan +new Date()
let transactions = [];
let editingId = null; // Menyimpan ID transaksi yang sedang diedit

function generateId() {
    return +new Date();
}

/**
 * ========================================================
 * Kriteria 1: Memanipulasi DOM untuk Form dan Daftar Transaksi
 * ========================================================
 */
// TODO [Basic] Ambil elemen kontainer incomeList dan expenseList dari DOM
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');

/**
 * TODO [Basic]:
 * Buat fungsi untuk menampilkan (render) semua transaksi ke layar:
 *  - Kosongkan kontainer terlebih dahulu sebelum mengisi ulang
 *  - Gunakan perulangan, buat setiap elemen kartu dengan document.createElement()
 *  - Pastikan setiap elemen memiliki atribut data-testid yang sesuai (lihat panduan di rubrik)
 *  - Masukkan kartu ke kontainer yang tepat: income → incomeList, expense → expenseList
 */
function renderTransactions(dataToRender = transactions) {
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';

    dataToRender.forEach(transaction => {
        const isIncome = transaction.type === 'income';

        // 1. Container Utama (Kartu)
        const card = document.createElement('div');
        card.classList.add('tracker-transaction-item');
        card.setAttribute('data-testid', 'transactionItem');

        // 2. Icon Tipe (+ / -)
        const icon = document.createElement('div');
        icon.classList.add('tracker-transaction-item__icon');
        icon.classList.add(isIncome ? 'tracker-transaction-item__icon--income' : 'tracker-transaction-item__icon--expense');
        icon.textContent = isIncome ? '+' : '-';
        card.appendChild(icon);

        // 3. Container Detail Kiri (Judul & Tanggal)
        const detail = document.createElement('div');
        detail.classList.add('tracker-transaction-item__detail');

        const title = document.createElement('h3');
        title.classList.add('tracker-transaction-item__title');
        title.setAttribute('data-testid', 'transactionItemTitle');
        title.textContent = transaction.title;

        const date = document.createElement('p');
        date.classList.add('tracker-transaction-item__date');
        date.setAttribute('data-testid', 'transactionItemDate');
        date.textContent = transaction.date;

        // Atribut wajib pengujian bot Dicoding (disembunyikan dari tampilan visual)
        const typeHidden = document.createElement('p');
        typeHidden.setAttribute('data-testid', 'transactionItemType');
        typeHidden.style.display = 'none';
        typeHidden.textContent = isIncome ? 'Pemasukan' : 'Pengeluaran';

        detail.appendChild(title);
        detail.appendChild(date);
        detail.appendChild(typeHidden);
        card.appendChild(detail);

        // 4. Container Kanan (Nominal & Tombol Aksi)
        const right = document.createElement('div');
        right.classList.add('tracker-transaction-item__right');

        const amount = document.createElement('p');
        amount.classList.add('tracker-transaction-item__amount');
        amount.classList.add(isIncome ? 'tracker-transaction-item__amount--income' : 'tracker-transaction-item__amount--expense');
        amount.setAttribute('data-testid', 'transactionItemAmount');
        amount.textContent = `Rp ${Number(transaction.amount).toLocaleString('id-ID')}`;

        const actions = document.createElement('div');
        actions.classList.add('tracker-transaction-item__actions');

        const ubahTypeButton = document.createElement('button');
        ubahTypeButton.classList.add('tracker-transaction-item__btn');
        ubahTypeButton.setAttribute('data-testid', 'transactionItemEditTypeButton');
        ubahTypeButton.textContent = 'Ubah Tipe';
        ubahTypeButton.addEventListener('click', () => {
            if (typeof toggleTransactionType === 'function') toggleTransactionType(transaction.id);
        });

        const editButton = document.createElement('button');
        editButton.classList.add('tracker-transaction-item__btn');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            if (typeof editTransaction === 'function') editTransaction(transaction.id);
        });

        const hapusButton = document.createElement('button');
        hapusButton.classList.add('tracker-transaction-item__btn');
        hapusButton.setAttribute('data-testid', 'transactionItemDeleteButton');
        hapusButton.textContent = 'Hapus';
        hapusButton.addEventListener('click', () => {
            if (typeof deleteTransaction === 'function') deleteTransaction(transaction.id);
        });

        actions.appendChild(ubahTypeButton);
        actions.appendChild(editButton);
        actions.appendChild(hapusButton);

        right.appendChild(amount);
        right.appendChild(actions);
        card.appendChild(right);

        // 5. Masukkan ke Elemen HTML Sesuai Kategori
        if (isIncome) {
            incomeList.appendChild(card);
        } else {
            expenseList.appendChild(card);
        }
    });
}

// TODO [Basic] Tambahkan event listener 'submit' pada form, panggil e.preventDefault() di dalamnya
const transactionForm = document.getElementById('transactionForm');
transactionForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // TODO [Basic] Di dalam handler submit, ambil nilai input lalu tambahkan sebagai objek transaksi baru ke array
    const title = document.getElementById('transactionFormTitleInput').value.trim();
    const amountInput = document.getElementById('transactionFormAmountInput').value;
    const amount = parseFloat(amountInput);
    const date = document.getElementById('transactionFormDateInput').value;
    const type = document.getElementById('transactionFormTypeSelect').value;

    /**
     * TODO [Skilled]:
     * Tambahkan validasi input sebelum menyimpan data:
     *  - Tampilkan alert() dan hentikan proses jika judul kosong
     *  - Tampilkan alert() dan hentikan proses jika nominal kurang dari 1
     */
    if (!title) {
        alert('Judul harus diisi');
        return;
    }

    if (isNaN(amount) || amount < 1) {
        alert('Nominal harus lebih besar dari 0');
        return;
    }

    if (editingId !== null) {
        // Mode Edit Transaksi
        const index = transactions.findIndex(t => t.id === editingId);
        if (index !== -1) {
            transactions[index] = {
                id: editingId,
                title: title,
                amount: amount,
                date: date,
                type: type
            };
        }
        editingId = null;
        const submitBtn = transactionForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Simpan';
    } else {
        // Mode Tambah Transaksi
        const newTransaction = {
            id: generateId(),
            title: title,
            amount: amount,
            date: date,
            type: type
        };
        transactions.push(newTransaction);
    }

    e.target.reset();
    document.dispatchEvent(transactionUpdatedEvent);
});

/**
 * TODO [Advanced]:
 * Setiap kali data transaksi berubah, perbarui Panel Dasbor:
 *  - Hitung total pemasukan, total pengeluaran, dan saldo (pemasukan - pengeluaran)
 *  - Tampilkan hasilnya ke elemen yang sesuai di HTML
 */
const balanceAmount = document.querySelector('.tracker-summary__balance-amount');
const incomeAmount = document.querySelector('.tracker-summary__stat-amount--income');
const expenseAmount = document.querySelector('.tracker-summary__stat-amount--expense');

function updateDashboard() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);
    const balance = totalIncome - totalExpense;

    balanceAmount.textContent = `Rp ${balance.toLocaleString('id-ID')}`;
    incomeAmount.textContent = `Rp ${totalIncome.toLocaleString('id-ID')}`;
    expenseAmount.textContent = `Rp ${totalExpense.toLocaleString('id-ID')}`;
}

/**
 * ========================================================
 * Kriteria 2: Mengelola Penyimpanan Data (Web Storage API)
 * ========================================================
 */
const STORAGE_KEY = 'EXPENSE_TRACKER_DATA';

function saveTransactionsToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function loadTransactionsFromStorage() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        transactions = JSON.parse(storedData);
    }
}

/**
 * TODO [Basic]:
 * Data transaksi disimpan ke localStorage menggunakan JSON.stringify(), dan dimuat kembali saat halaman dibuka menggunakan JSON.parse().
 *  - Tombol "Hapus" berfungsi: transaksi yang dihapus langsung hilang dari layar dan dari localStorage.
 */
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    document.dispatchEvent(transactionUpdatedEvent);
}

/**
 * TODO [Skilled]:
 * Tombol "Edit" berfungsi: saat ditekan, formulir (#transactionForm) secara otomatis terisi dengan data transaksi yang dipilih.
 *  - Pengguna dapat mengubah data lalu menyimpan perubahan.
 *  - Formulir kembali ke mode "Tambah" setelah pembaruan selesai.
 */
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
        document.getElementById('transactionFormTitleInput').value = transaction.title;
        document.getElementById('transactionFormAmountInput').value = transaction.amount;
        document.getElementById('transactionFormDateInput').value = transaction.date;
        document.getElementById('transactionFormTypeSelect').value = transaction.type;

        editingId = transaction.id;
        const submitBtn = transactionForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Perbarui';
    }
}

/**
 * TODO [Advanced]:
 * Gunakan Custom Event sebagai penghubung antara perubahan data dan pembaruan tampilan:
 *  - Kirim sinyal dengan document.dispatchEvent(new Event('transaction:updated')) setiap kali data berubah
 *  - Pasang satu listener untuk event tersebut yang memanggil fungsi render dan update dasbor
 */
const transactionUpdatedEvent = new Event('transaction:updated');
document.addEventListener('transaction:updated', () => {
    saveTransactionsToStorage();
    renderTransactions();
    updateDashboard();
});

/**
 * ========================================================
 * Kriteria 3: Fitur Interaktif (Pindah Kategori dan Pencarian)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Tambahkan tombol "Ubah Tipe" pada setiap kartu transaksi:
 *  - Saat diklik, ubah tipe transaksi: 'income' → 'expense' atau 'expense' → 'income'
 *  - Simpan perubahan ke localStorage dan perbarui tampilan
 */
function toggleTransactionType(id) {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
        transaction.type = transaction.type === 'income' ? 'expense' : 'income';
        document.dispatchEvent(transactionUpdatedEvent);
    }
}

/**
 * TODO [Skilled]:
 * Tambahkan event listener 'input' pada kolom pencarian:
 *  - Filter array transaksi berdasarkan kecocokan kata kunci dengan judul transaksi
 *  - Tampilkan hanya transaksi yang judulnya mengandung kata kunci tersebut
 */
const searchInput = document.getElementById('searchTransactionFormTitleInput');
const searchForm = document.getElementById('searchTransactionForm');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        const filtered = transactions.filter(t => t.title.toLowerCase().includes(keyword));
        renderTransactions(filtered);
    });
}

/**
 * TODO [Advanced]:
 * Pastikan fitur pencarian berjalan dengan baik di semua kondisi:
 *  - Saat kolom pencarian dikosongkan, tampilkan kembali seluruh daftar transaksi
 */
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const filtered = transactions.filter(t => t.title.toLowerCase().includes(keyword));
        renderTransactions(filtered);
    });
}

// Inisialisasi awal saat halaman dibuka
loadTransactionsFromStorage();
document.dispatchEvent(transactionUpdatedEvent);