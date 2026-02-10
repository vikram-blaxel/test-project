const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let items = [
    { id: 1, name: 'apples' },
    { id: 2, name: 'oranges' }
];

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid item name' });
    }

    const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
