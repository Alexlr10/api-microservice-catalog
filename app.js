require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const baseUrl = process.env.BASE_URL || 'http://localhost:8080';

function buildProductListHTML(products) {
    let productListHTML = '<table>' +
        '<thead>' +
        '<tr>' +
        '<th>Product</th>' +
        '<th>Price</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';

    products.forEach(product => {
        productListHTML += '<tr>' +
            `<td>${product.product}</td>` +
            `<td>${product.price}</td>` +
            '</tr>';
    });

    productListHTML += '</tbody></table>';

    const pageTitle = products.length === 1 ? products[0].product : 'Product List';

    const html = '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        `<title>${pageTitle}</title>` +
        '</head>' +
        '<body>' +
        productListHTML +
        '</body>' +
        '</html>';

    return html;
}

app.get('/', (req, res) => {
    axios.get(`${baseUrl}/`)
        .then(response => {
            const html = buildProductListHTML(response.data);
            console.log(baseUrl)
            res.send(html);
        })
        .catch(error => {
            console.log(process.env.BASE_URL)
            console.log(baseUrl) 
            console.log(error)
            res.status(500).send('Error fetching products');
        });
});

app.get('/:uuid', (req, res) => {
    const uuid = req.params.uuid;

    axios.get(`${baseUrl}/${uuid}`)
        .then(response => {
            const html = buildProductListHTML([response.data]);
            res.send(html);
        })
        .catch(error => {
            res.status(500).send('Error fetching product');
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
