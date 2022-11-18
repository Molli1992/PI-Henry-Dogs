const axios = require("axios");
const { Dog } = require("../db");

const populate = async function () {


    try {

        const obtengoPerros = await Dog.findAll();

        if (obtengoPerros.length === 0) {

            const perros = await axios.get("https://api.thedogapi.com/v1/breeds");

            const perrosMapeados = perros.data.map(perro => {

                return {
                    id: perro.id,
                    name: perro.name,
                    altura_min: perro.height.metric.split(" - ")[0] &&
                        perro.height.metric.split(" - ")[0],
                    altura_max: perro.height.metric.split(" - ")[1] !== undefined ?
                        perro.height.metric.split(" - ")[1] : "not found",
                    peso_min: perro.weight.metric.split(" - ")[0] &&
                        perro.weight.metric.split(" - ")[0],
                    peso_max: perro.weight.metric.split(" - ")[1] !== undefined ?
                        perro.weight.metric.split(" - ")[1] : "not found",
                    AñosDeVida: perro.life_span,
                    img: perro.image.url,
                    temperamento: perro.temperament
                }

            })

            try {
                const perrosGuardados = await Dog.bulkCreate(perrosMapeados);
                console.log(perrosGuardados);
            } catch (error) {
                console.log("guardando perros", error);
            }
        }

    } catch (error) {

        console.log("obteniendo perros", error)

    }

};

module.exports = {
    populate: populate
}