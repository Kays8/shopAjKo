const cart = {};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const price = parseFloat(button.getAttribute('data-price'));
        if (!cart[productId]) {
            cart[productId] = { quantity: 1, price: price };
        } else {
            cart[productId].quantity++;
        }
        updateCartDisplay();
    });
});

// Function to delete a product from the cart
function deleteProduct(productId) {
    if (cart[productId]) {
        delete cart[productId];
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    let totalPrice = 0;
    for (const productId in cart) {
        const item = cart[productId];
        const itemTotalPrice = item.quantity * item.price;
        totalPrice += itemTotalPrice;
        const productElement = document.createElement('p');
        productElement.textContent = `Product ${productId}: ${item.quantity} x $${item.price} = $${itemTotalPrice}`;
       // Inside the updateCartDisplay function where the delete button is created
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.classList.add('delete-product'); // Add class to the delete button
deleteButton.addEventListener('click', () => deleteProduct(productId));
productElement.appendChild(deleteButton);
;
        
        cartElement.appendChild(productElement);
    }

    if (Object.keys(cart).length === 0) {
        cartElement.innerHTML = '<p>No items in cart.</p>';
    } else {
        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = "\n" `Total Price: $${totalPrice}`;
        cartElement.appendChild(totalPriceElement);
    }
}




const generatePDF = () => {
  const doc = new jsPDF();
  doc.text("Shopping Cart", 10, 10);

  let y = 20;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    doc.text(`Product ${productId}: ${item.quantity} x $${item.price} = $${itemTotalPrice}`, 10, y);
    y += 10;
  }

  const totalPriceElement = document.createElement('p');
  totalPriceElement.textContent = "\n" `Total Price: $${totalPrice}`;
  const totalPriceText = totalPriceElement.textContent;
  doc.text(totalPriceText, 10, y);

  doc.save("cart.pdf"); // Save as "cart.pdf"

  // Enable button after generation
  document.getElementById("generate-pdf").disabled = false;
};

document.getElementById("generate-pdf").addEventListener("click", generatePDF);
