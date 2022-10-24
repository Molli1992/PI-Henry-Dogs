const axios = require("axios");
const { Dog } = require("../db");

const populate = async function () {


    try {

        const obtengoDogs = await Dog.findAll();

        //console.log(obtengoDogs);

        if (obtengoDogs.length === 0) {

            const dogs = await axios.get("https://api.thedogapi.com/v1/breeds");

            const dogsMapeados = dogs.data.map(dog => {

                return {
                    id: dog.id,
                    nombre: dog.name,
                    altura: dog.height.imperial,
                    peso: dog.weight.imperial,
                    AñosDeVida: dog.life_span
                }

            })

            try {
                const dogsGuardados = await Dog.bulkCreate(dogsMapeados);
                console.log(dogsMapeados);
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