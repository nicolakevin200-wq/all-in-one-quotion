
function addItem() {
    const tbody = document.getElementById("items");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" placeholder="Description"></td>
        <td><input type="number" class="qty" value="1" min="0"
            oninput="calculateTotal()"></td>
        <td><input type="number" class="price" value="0" min="0"
            oninput="calculateTotal()"></td>
        <td class="lineTotal">0.00</td>
        <td><button type="button" onclick="this.closest('tr').remove(); calculateTotal()">Remove</button></td>
    `;

    tbody.appendChild(row);
    calculateTotal();
}

function calculateTotal() {
    let subtotal = 0;

    document.querySelectorAll("#items tr").forEach(row => {
        const qty = Number(row.querySelector(".qty").value) || 0;
        const price = Number(row.querySelector(".price").value) || 0;

        const total = qty * price;

        row.querySelector(".lineTotal").textContent =
            total.toFixed(2);

        subtotal += total;
    });

    const vatRate = Number(document.getElementById("vat").value) || 0;
    const vatAmount = subtotal * vatRate / 100;
    const grandTotal = subtotal + vatAmount;

    document.getElementById("subtotal").textContent =
        subtotal.toFixed(2);

    document.getElementById("vatAmount").textContent =
        vatAmount.toFixed(2);

    document.getElementById("grandTotal").textContent =
        grandTotal.toFixed(2);
}

function saveQuote() {
    const quote = {
        company: document.getElementById("company").value,
        customer: document.getElementById("customer").value,
        quoteNumber: document.getElementById("quoteNumber").value,
        total: document.getElementById("grandTotal").textContent,
        date: document.getElementById("quoteDate").value
    };

    const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");

    quotes.push(quote);

    localStorage.setItem("quotes", JSON.stringify(quotes));

    alert("Quotation saved successfully!");
}

addItem();
