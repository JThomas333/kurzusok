const alapUrl = "https://vvri.pythonanywhere.com/api/courses";

let KorT = ""; // "courses" or "students"

// Fetch and display courses or students based on selection
function fetchItems() {
    let url = alapUrl;
    if (KorT == "students") {
        url = "https://vvri.pythonanywhere.com/api/students";
    }

    fetch(url)
        .then(response => response.json())
        .then(items => {
            adatok(items);
        })
        .catch(error => {
            console.error("Hiba történt!", error);
        });
}

function adatok(items) {
    const container = document.getElementById("CardContainer");
    container.innerHTML = "";

    items.forEach(i => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <h3>${i.name}</h3>
        <button onclick="torles(${i.id})">Törlés</button>
        `;
        container.appendChild(card);
    });
}

function kurzus() {
    KorT = "courses";
    fetchItems();
}

function tanulo() {
    KorT = "students";
    fetchItems();

}

//Új kurzus vagy diák hozzáadása
function ujkurzus() {
    KorT = "courses";
    ujitas();
}

function ujtanulo() {
    KorT = "students";
    ujitas();
}

function ujitas() {
    const ujadat = document.getElementById("ujadatok");
    ujadat.style.display = "block";//Megjelenítjük az adat bekérést
}

function megse() {
    const ujadat = document.getElementById("ujadatok");
    ujadat.style.display = "none";//Bezárjuk az adat bekérést
}

function mentes() {
    const name = document.getElementById("ujnev").value;

    const adathalmaz = {
        name: name
    };

    let url = alapUrl;
    if (KorT == "students") {
        url = "https://vvri.pythonanywhere.com/api/students";
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(adathalmaz),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Új adat hozzáadva!", data);
        fetchItems();//Frissítjük a listát
        megse();
    })
    .catch(error => {
        console.error("Hiba történt!", error);
    });
}

function torles(id) {
    let url = alapUrl;
    if (KorT == "students") {
        url = "https://vvri.pythonanywhere.com/api/students";
    }

    fetch(`${url}/${id}`, {//kurzus/5
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Elem törölve:", data);
        fetchItems();//Frissítjük a listát
    })
    .catch(error => {
        console.error("Hiba történt!", error);
    });
}