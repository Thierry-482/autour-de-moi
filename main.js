
document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");

  root.innerHTML = `
    <h1 style='font-family: sans-serif;'>Autour de Moi</h1>
    <p>Découvrez les talents, entraides et savoir-faire autour de vous — sans pub, sans pression, juste entre humains.</p>
    <div style='margin: 1em 0;'>
      <input id='area' placeholder='Votre quartier' style='padding: 0.5em; width: 90%;' /><br/><br/>
      <textarea id='offer' placeholder='Ce que vous proposez' style='padding: 0.5em; width: 90%; height: 60px;'></textarea><br/><br/>
      <textarea id='need' placeholder='Ce dont vous avez besoin' style='padding: 0.5em; width: 90%; height: 60px;'></textarea><br/><br/>
      <button id='add' style='padding: 0.5em 1em;'>Ajouter</button>
    </div>
    <div id='listings'></div>
  `;

  const listings = document.getElementById("listings");
  const addBtn = document.getElementById("add");

  const data = JSON.parse(localStorage.getItem("autour_data") || "[]");

  function renderList() {
    listings.innerHTML = data
      .map(
        (entry) => `
      <div style='border: 1px solid #ccc; margin: 0.5em 0; padding: 0.5em;'>
        <strong>${entry.area}</strong><br/>
        <em>Propose:</em> ${entry.offer || "-"}<br/>
        <em>Besoin:</em> ${entry.need || "-"}
      </div>`
      )
      .join("");
  }

  renderList();

  addBtn.onclick = () => {
    const area = document.getElementById("area").value.trim();
    const offer = document.getElementById("offer").value.trim();
    const need = document.getElementById("need").value.trim();
    if (!area || (!offer && !need)) return;

    data.push({ area, offer, need });
    localStorage.setItem("autour_data", JSON.stringify(data));
    renderList();
  };
});
