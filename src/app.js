document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Cokelat Meses", img: "Cokelat Meses.jpg", price: 5000 },
      { id: 2, name: "Cokelat Kacang", img: "Cokelat Kacang.jpg", price: 5000 },
      { id: 3, name: "Cokelat Oreo", img: "Cokelat Oreo.jpg", price: 5000 },
      { id: 4, name: "Green Tea Kacang", img: "Green Tea Kacang.jpg", price: 5000 },
      { id: 5, name: "Tiramisu Cokelat", img: "Tiramisu Cokelat.jpg", price: 5000 },
      { id: 6, name: "Tiramisu Oreo", img: "Tiramisu Oreo.jpg", price: 5000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang brbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(newItem) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telurusi 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== newItem.id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }

  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const ojbData = Object.fromEntries(data);
  const message = formatMessage(ojbData);
  window.open("http://wa.me/6289678570933?text=" + encodeURIComponent(message));
});

// Format pesan Whatsapp
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No.HP: ${obj.phone}
  Data Pesanan
   ${JSON.parse(obj.items).map(
     (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
   )}
  TOTAL: ${rupiah(obj.total)}
  Terima kasih.`;
};

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
