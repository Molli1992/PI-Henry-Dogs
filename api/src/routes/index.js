const { json } = require('body-parser');
const { Router } = require('express');
const { Dog, Temperamento } = require("../db");
const axios = require("axios");
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
            return res.status(404).send("dog not found")
        }

        res.json(dog)
    }

    else {
        const dogs = await Dog.findAll();

        if (dogs.length !== 0) {
            return res.json(dogs);
        };

        res.status(404).send("dogs not found");
    }

});

router.get("/dogs/:id", async (req, res) => {

    const { id } = req.params;

    const dog = await Dog.findAll({
        where: { name: id }
    });

    if (dog) {
        return res.json(dog)
    };

    res.status(404).send("dog not found");
});


router.post("/dogs", async (req, res) => {

    const { name, altura_min, altura_max, peso_min, peso_max, AñosDeVida, temperamento } = req.body;

    if (!name || !altura_min || !altura_max || !peso_min || !peso_max || !AñosDeVida || !temperamento) {
        return res.status(404).send("Falta enviar datos obligatorios");
    }

    try {
        const allDogs = await axios.get("https://api.thedogapi.com/v1/breeds");
        const ultimoIDExterno = allDogs.data.length + 1;
        const allDogsInternos = await Dog.findAll()
        const ultimoIDInterno = allDogsInternos.length + 1;
        const dog = await Dog.create({
            ...req.body, id: ultimoIDExterno + ultimoIDInterno
        });
        console.log(dog);
        res.status(201).json(dog);
    } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");
    }

});

router.get("/temperaments", async (req, res) => {

    try {

        const temperamentos = await axios.get("https://api.thedogapi.com/v1/breeds");

        let everyTemperament = temperamentos.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));

        let eachTemperament = [...new Set(everyTemperament.flat())];

        eachTemperament.forEach(el => {
            if (el) {
                Temperamento.findOrCreate({
                    where: { name: el }
                });
            }
        });

        res.status(200).json(eachTemperament);

    } catch {
        res.status(404).send("temperamentos no encontrados");
    }

});


module.exports = router;
