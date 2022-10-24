const axios = require("axios");
const { Temperamento } = require("../db");

const populate1 = async function () {


    try {

        const obtengoTemperamento = await Temperamento.findAll();

        //console.log(obtengoTemperamento);

        if (obtengoTemperamento.length === 0) {

            const temperamentos = await axios.get("https://api.thedogapi.com/v1/breeds");

            const temperamentosMapeados = temperamentos.data.map(temperamento => {

                return {
                    id: temperamento.id,
                    nombre: temperamento.temperament,
                }

            })

            try {
                const temperamentosGuardados = await Temperamento.bulkCreate(temperamentosMapeados);
                console.log(temperamentosMapeados);
            } catch (error) {
                console.log("guardando temperamentos", error);
            }
        }

    } catch (error) {

        console.log("obteniendo temperamentos", error)

    }

};

module.exports = {
    populate1: populate1
}