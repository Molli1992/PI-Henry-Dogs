import React from 'react';
import "./Form.css";
import axios from "axios";
import { Link } from 'react-router-dom';



function validate(input) {

    let errors = {};

    if (!input.nombre) {
        errors.nombre = 'se requiere el nombre';
    } else if (!/\S+\S+\.\S+/.test(input.nombre)) {
        errors.nombre = 'nombre invalido';
    }

    if (!input.altura) {
        errors.altura = 'se requiere altura';
    } else if (!/\S+\S+\.\S+/.test(input.altura)) {
        errors.altura = 'altura incorrecta';
    }

    if (!input.pesoMin) {
        errors.pesoMin = 'se requiere peso min';
    } else if (!/\S+\S+\.\S+/.test(input.pesoMin)) {
        errors.pesoMin = 'peso min incorrecto';
    }

    if (!input.pesoMax) {
        errors.pesoMax = 'se requiere peso max';
    } else if (!/\S+\S+\.\S+/.test(input.pesoMax)) {
        errors.pesoMax = 'peso max incorrecto';
    }

    if (!input.AñosDeVida) {
        errors.AñosDeVida = 'se requieren los Años De Vida';
    } else if (!/\S+\S+\.\S+/.test(input.AñosDeVida)) {
        errors.AñosDeVida = 'Años de vida incorrectos';
    }

    if (!input.temperamento) {
        errors.temperamento = 'se requiere temperamento';
    } else if (!/\S+\S+\.\S+/.test(input.temperamento)) {
        errors.temperamento = 'temperamento incorrecto';
    }

    return errors;
};

export default function Form() {

    const [input, setInput] = React.useState({
        nombre: "",
        altura: "",
        pesoMin: "",
        pasoMax: "",
        AñosDeVida: "",
        temperamento: ""
    });

    const [errors, setErrors] = React.useState({});

    function handleInputChange(e) {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

    };

    function handleSubmit(e) {

        axios.post("http://localhost:3001/dogs", input)
            .then(res => console.log(res.data))
            .cath(err => console.log(err))

    };

    return (
        <form>

            <div>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={input.nombre} onChange={handleInputChange}
                    className={errors.nombre && 'danger'} />
                {errors.nombre && (<p className="danger">{errors.nombre}</p>)}
            </div>

            <div>
                <label>Altura:</label>
                <input type="text" name="altura" value={input.altura} onChange={handleInputChange}
                    className={errors.altura && 'danger'} />
                {errors.altura && (<p className="danger">{errors.altura}</p>)}
            </div>

            <div>
                <label>Peso Min:</label>
                <input type="text" name="pesoMin" value={input.pesoMin} onChange={handleInputChange}
                    className={errors.pesoMin && 'danger'} />
                {errors.pesoMin && (<p className="danger">{errors.pesoMin}</p>)}
            </div>

            <div>
                <label>Peso Max:</label>
                <input type="text" name="pesoMax" value={input.pesoMax} onChange={handleInputChange}
                    className={errors.pesoMax && 'danger'} />
                {errors.pesoMax && (<p className="danger">{errors.pesoMax}</p>)}
            </div>

            <div>
                <label>Años de vida:</label>
                <input type="text" name="AñosDeVida" value={input.AñosDeVida} onChange={handleInputChange}
                    className={errors.AñosDeVida && 'danger'} />
                {errors.AñosDeVida && (<p className="danger">{errors.AñosDeVida}</p>)}
            </div>

            <div>
                <label>Temperamento:</label>
                <input type="text" name="temperamento" value={input.temperamento} onChange={handleInputChange}
                    className={errors.temperamento && 'danger'} />
                {errors.temperamento && (<p className="danger">{errors.temperamento}</p>)}
            </div>

            <button onClick={handleSubmit}>Enviar</button>

            <div >
                <Link to="/home">
                    <button className='button-home'>Home</button>
                </Link>
            </div>

        </form>
    );

};