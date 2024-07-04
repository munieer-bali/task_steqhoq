const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Task, sequelize } = require('./models/task');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint GET /tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'ini terjadi kesalahan' });
    }
});

// Endpoint GET /tasks/:id
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task ini eror' });
        }
    } catch (error) {
        res.status(500).json({ error: 'ini terjadi kesalahan' });
    }
});

// Endpoint POST /tasks
app.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'ini terjadi kesalahan' });
    }
});

// Endpoint PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task ini eror' });
        }
    } catch (error) {
        res.status(500).json({ error: 'ini terjadi kesalaha' });
    }
});

// Endpoint DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Task ini error' });
        }
    } catch (error) {
        res.status(500).json({ error: 'ini terjadi kesalahan' });
    }
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('database tidak conect:', error);
});