function adjustContainer() {
    const containerWidthInput = document.getElementById('width-input').value;
    const containerHeightInput = document.getElementById('height-input').value;
    const boxWidthInput = document.getElementById('box-width-input').value;
    const boxHeightInput = document.getElementById('box-height-input').value;
    const salePriceFontInput = document.getElementById('sale-price-font-input').value;
    const nameFontInput = document.getElementById('name-font-input').value;
    const mrpFontInput = document.getElementById('mrp-font-input').value;
    const container = document.getElementById('product-container');
    const products = document.querySelectorAll('.product');

    if (containerWidthInput) {
        container.style.width = `${containerWidthInput}px`;
    }

    if (containerHeightInput) {
        container.style.height = `${containerHeightInput}px`;
    }

    products.forEach(product => {
        if (boxWidthInput) {
            product.style.width = `${boxWidthInput}px`;
        }

        if (boxHeightInput) {
            product.style.height = `${boxHeightInput}px`;
        }

        const salePriceElement = product.querySelector('.sale-price');
        const nameElement = product.querySelector('.name');
        const mrpElement = product.querySelector('.mrp');

        if (salePriceFontInput) {
            salePriceElement.style.fontSize = `${salePriceFontInput}px`;
        }

        if (nameFontInput) {
            nameElement.style.fontSize = `${nameFontInput}px`;
        }

        if (mrpFontInput) {
            mrpElement.style.fontSize = `${mrpFontInput}px`;
        }
    });
}

document.getElementById('file-upload').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        displayProducts(json);
    };
    reader.readAsArrayBuffer(file);
}

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const salePriceElement = document.createElement('div');
        salePriceElement.classList.add('sale-price');
        salePriceElement.innerText = `₹ ${product.sale_price} Only`;
        productElement.appendChild(salePriceElement);

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.innerText = product.name;
        productElement.appendChild(nameElement);

        const mrpElement = document.createElement('div');
        mrpElement.classList.add('mrp');
        mrpElement.innerText = `Mrp ${product.mrp} Rs`;
        productElement.appendChild(mrpElement);

        container.appendChild(productElement);
    });
}
