const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let categories = [{
        id: 1,
        name: 'Elektronik',
        price: 1000
    },
    {
        id: 2,
        name: 'Perabotan',
        price: 500
    }
];

let products = [{
        id: 1,
        name: 'Laptop',
        category: 'Elektronik'
    },
    {
        id: 2,
        name: 'Meja',
        category: 'Perabotan'
    }
];

// GET semua kategori
app.get('/api/category', (req, res) => {
    res.json(categories);
});

// GET kategori berdasarkan ID
app.get('/api/category/:id', (req, res) => {
    const categoriesId = parseInt(req.params.id);
    const category = categories.find(p => p.id === categoriesId); // Renamed the variable
    if (category) {
        res.json(categories);
    } else {
        res.status(404).json({
            message: 'Kategori not found'
        });
    }
});

// POST category baru
app.post('/api/category', (req, res) => {
    const newCategory = req.body;
    newCategory.id = categories.length ? categories[categories.length - 1].id + 1 : 1;
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// PUT update category
app.put('/api/category/:id', (req, res) => {
    const categoriesId = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(p => p.id === categoriesId);
    if (categoryIndex !== -1) {
        categories[categoryIndex] = {
            id: categoriesId,
            ...req.body
        };
        res.json(categories[categoryIndex]);
    } else {
        res.status(404).json({
            message: 'Category not found'
        });
    }
});

// DELETE category
app.delete('/api/category/:id', (req, res) => {
    const categoriesId = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(p => p.id === categoriesId);

    if (categoryIndex !== -1) {
        categories = categories.filter(p => p.id !== categoriesId);
        res.status(200).json({
            message: 'Category deleted successfully'
        });
    } else {
        res.status(404).json({
            message: 'Category not found'
        });
    }
});

// SEARCT products query params
app.get('/api/products', (req, res) => {
    const searchQuery = req.query.name;

    if (searchQuery) {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredProducts.length > 0) {
            res.json(filteredProducts);
        } else {
            res.status(404).json({
                message: 'No products found'
            });
        }
    } else {
        res.status(400).json({
            message: 'Please provide a product name to search'
        });
    }
});

// GET products parameter dan query params
app.get('/api/products/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const searchQuery = req.query.name;

    // Filter products berdasarkan category
    const filteredByCategory = products.filter(product =>
        product.category.toLowerCase() === category
    );

    // Jika search query ada, maka lanjut pemanggilan products berdasarkan search query
    if (searchQuery) {
        const filteredProducts = filteredByCategory.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredProducts.length > 0) {
            res.json(filteredProducts);
        } else {
            res.status(404).json({
                message: 'No products found'
            });
        }
    } else {
        // jika tidak ada search query maka memanggil semua product berdasarkan category
        if (filteredByCategory.length > 0) {
            res.json(filteredByCategory);
        } else {
            res.status(404).json({
                message: 'No products found in this category'
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running at <http://localhost>:${port}`);
});