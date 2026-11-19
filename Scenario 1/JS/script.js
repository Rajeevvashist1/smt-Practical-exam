const cartItems = [
  { name: "Notebook", price: 120, qty: 1 },
  { name: "Pen Pack", price: 60, qty: 1 },
  { name: "Water Bottle", price: 350, qty: 1 }
];

const itemsContainer = document.getElementById("cart-items");
const emptyMessage = document.getElementById("empty-message");
const cartContent = document.getElementById("cart-content");

function formatRupees(amount) {
  return `Rs. ${amount.toFixed(2)}`;
}

function renderCart() {
  itemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContent.hidden = true;
    emptyMessage.hidden = false;
    return;
  }

  cartContent.hidden = false;
  emptyMessage.hidden = true;

  cartItems.forEach((item, index) => {
    const row = document.createElement("tr");
    const rowTotal = item.price * item.qty;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${formatRupees(item.price)}</td>
      <td>
        <div class="quantity">
          <button class="qty-btn" type="button" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" type="button" aria-label="Increase quantity">+</button>
        </div>
      </td>
      <td>${formatRupees(rowTotal)}</td>
      <td><button class="remove-btn" type="button">Remove</button></td>
    `;

    const buttons = row.querySelectorAll(".qty-btn");
    buttons[0].addEventListener("click", () => changeQuantity(index, -1));
    buttons[1].addEventListener("click", () => changeQuantity(index, 1));
    row.querySelector(".remove-btn").addEventListener("click", () => removeItem(index));
    itemsContainer.appendChild(row);
  });

  updateSummary();
}

function changeQuantity(index, change) {
  const newQuantity = cartItems[index].qty + change;
  if (newQuantity < 1) return;
  cartItems[index].qty = newQuantity;
  renderCart();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  renderCart();
}

function updateSummary() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal >= 1000 ? subtotal * 0.10 : 0;
  const payable = subtotal - discount;

  document.getElementById("subtotal").textContent = formatRupees(subtotal);
  document.getElementById("discount").textContent = formatRupees(discount);
  document.getElementById("payable").textContent = formatRupees(payable);
}

renderCart();
