
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const bookCards = document.querySelectorAll(".book-card");

function updateBooks() {
    const searchValue = searchInput.value.toLowerCase(); // قيمة البحث
    const selectedCategory = categorySelect.value;      // القسم المختار

    bookCards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        const category = card.getAttribute("data-category");

        const matchSearch = title.includes(searchValue);
        const matchCategory = selectedCategory === "" || category === selectedCategory;

        if (matchSearch && matchCategory) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", updateBooks);
categorySelect.addEventListener("change", updateBooks);