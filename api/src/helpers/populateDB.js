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
                    altura: perro.height.metric,
                    peso: perro.weight.metric,
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