const alapUrl = "https://vvri.pythonanywhere.com/api/courses";

let KorT = ""; // courses, students

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
        <h3 id="sznev${i.id}" contenteditable="false">${i.name}</h3>  
        <button onclick="szerkvan(${i.id})">Szerkesztés</button>  
        <button onclick="torles(${i.id})">Törlés</button>
        <button onclick="szerkment(${i.id})" style="display:none;" id="save${i.id}">Mentés</button>  
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
    ujadat.style.display = "block"; //Megjelenítjük az adat bekérést
}

function megse() {
    const ujadat = document.getElementById("ujadatok");
    ujadat.style.display = "none"; //Bezárjuk az adat bekérést
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
        fetchItems(); //Frissítjük a listát
        megse();
    })
    .catch(error => {név
        console.error("Hiba történt!", error);
    });
}

// Szerkesztés gomb aktiválása
function szerkvan(id) {
    const nevelem = document.getElementById(`sznev${id}`);
    nevelem.contentEditable = true;  
    document.getElementById(`save${id}`).style.display = "block";  
}

// Szerkesztett kurzus vagy diák mentése
function szerkment(id) {
    const name = document.getElementById(`sznev${id}`).innerText; 

    const adathalmaz = {
        name: name
    };

    let url = alapUrl;
    if (KorT == "students") {
        url = "https://vvri.pythonanywhere.com/api/students";
    }

    fetch(`${url}/${id}`, {  
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(adathalmaz),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Adat frissítve!", data);
        fetchItems(); //Frissítjük a listát
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

    fetch(`${url}/${id}`, { //kurzus/5
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Elem törölve:", data);
        fetchItems(); //Frissítjük a listát
    })
    .catch(error => {
        console.error("Hiba történt!", error);
    });
}
