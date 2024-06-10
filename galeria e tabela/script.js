document.addEventListener("DOMContentLoaded", function() {
  const thumbnails = document.querySelectorAll(".thumbnails img");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const closeButton = document.querySelector(".close");

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", function() {
      modal.style.display = "block";
      modalContent.src = this.src;
    });
  });

  closeButton.addEventListener("click", function() {
    modal.style.display = "none";
  });

  function navigate(direction) {
    const currentIndex = Array.from(thumbnails).findIndex(thumbnail => thumbnail.src === modalContent.src);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = thumbnails.length - 1;
    } else if (newIndex >= thumbnails.length) {
      newIndex = 0;
    }

    modalContent.src = thumbnails[newIndex].src;
  }

  prevButton.addEventListener("click", function() {
    navigate(-1);
  });

  nextButton.addEventListener("click", function() {
    navigate(1);
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const inputFiltro = document.getElementById("inputFiltro");
  const tabelaDados = document.getElementById("tabelaDados");
  const cabecalhos = tabelaDados.querySelectorAll("th");
  const linhas = tabelaDados.querySelectorAll("tbody tr");

  inputFiltro.addEventListener("input", function() {
    const filtro = inputFiltro.value.toUpperCase();
    linhas.forEach(linha => {
      const corresponde = Array.from(linha.querySelectorAll("td")).some(coluna => coluna.textContent.toUpperCase().includes(filtro));
      linha.style.display = corresponde ? "" : "none";
    });
  });

  cabecalhos.forEach(cabecalho => {
    cabecalho.addEventListener("click", function() {
      const indice = Array.from(cabecalhos).indexOf(cabecalho);
      const tipo = cabecalho.getAttribute("data-tipo");
      const ordem = tipo === "asc" ? "desc" : "asc";

      linhas.forEach(linha => {
        linha.remove();
      });

      const linhasArray = Array.from(linhas);

      if (tipo === "asc") {
        linhasArray.sort((a, b) => a.querySelectorAll("td")[indice].textContent.localeCompare(b.querySelectorAll("td")[indice].textContent));
      } else {
        linhasArray.sort((a, b) => b.querySelectorAll("td")[indice].textContent.localeCompare(a.querySelectorAll("td")[indice].textContent));
      }

      linhasArray.forEach(linha => {
        if (linha.style.display !== "none") {
          tabelaDados.querySelector("tbody").appendChild(linha);
        }
      });

      cabecalhos.forEach(cabecalho => {
        cabecalho.setAttribute("data-tipo", "");
      });

      cabecalho.setAttribute("data-tipo", ordem);
    });
  });
});
