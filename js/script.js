// Toggle class active untuk hamburger menu
const navabarNav = document.querySelector(".navbar-nav");

// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navabarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

//Klik di luar sidebar untuk menghilangkan nav
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navabarNav.contains(e.target)) {
    navabarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});
/* ============================
   MODAL BOX — SAFE VERSION
   ============================ */

// Ambil elemen modal
const itemDetailModal = document.querySelector(".item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");
const closeIcon = document.querySelector(".close-icon");

// Jika modal ADA di halaman
if (itemDetailModal) {
  // Jika tombol detail produk ada
  if (itemDetailButtons.length) {
    itemDetailButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        itemDetailModal.style.display = "flex";
      });
    });
  }

  // Tombol close
  if (closeIcon) {
    closeIcon.addEventListener("click", function (e) {
      e.preventDefault();
      itemDetailModal.style.display = "none";
    });
  }

  // Klik di luar modal → tutup
  window.addEventListener("click", function (e) {
    if (e.target === itemDetailModal) {
      itemDetailModal.style.display = "none";
    }
  });
}

// Jika modal TIDAK ADA (karena dihapus/dikomentari)
else {
  // Supaya tombol tidak error di console
  if (itemDetailButtons.length) {
    itemDetailButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        // Modal tidak ada → diam saja agar tidak error
        // console.info("Modal tidak tersedia (dikomentari).");
      });
    });
  }
}
