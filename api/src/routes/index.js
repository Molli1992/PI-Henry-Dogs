const { Router } = require('express');
const { Dog, Temperamento } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {

    const name = req.query.name;

    if (name) {

        const dog = await Dog.findAll({
            where: { name: name }
        });

        if (dog.length === 0) {
            return res.status(404).send("Dog not found")
        }

        res.json(dog)
    }

    else {

        const dogs = await Dog.findAll();

        if (dogs.length !== 0) {
            return res.json(dogs);
        };

        res.status(404).send("Los perros no existen");
    }

});

router.get("/dogs/:id", async (req, res) => {

    const { id } = req.params;

    const dog = await Dog.findByPk(id, {
        include: Temperamento
    });

    if (dog) {
        return res.json(dog)
    };

    res.status(404).send("dog not found");
});


router.post("/dogs", async (req, res) => {

    const { id, nombre, altura, peso, AñosDeVida } = req.body;

    if (!nombre || !altura || !peso || !AñosDeVida) {
        return res.status(404).send("Falta enviar datos obligatorios");
    }

    try {
        const dog = await Dog.create(req.body)
        res.status(201).json(dog);
    } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");
    }

});

router.get("/temperaments", async (req, res) => {

    const temperamentos = await Temperamento.findAll();

    if (temperamentos.length !== 0) {
        return res.json(temperamentos);
    };

    res.status(404).send("Temperamentos no encontrados");

});


module.exports = router;
