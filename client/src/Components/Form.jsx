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

    if (!input.peso) {
        errors.peso = 'se requiere peso';
    } else if (!/\S+\S+\.\S+/.test(input.peso)) {
        errors.peso = 'peso incorrecto';
    }

    if (!input.AñosDeVida) {
        errors.AñosDeVida = 'se requieren los Años De Vida';
    } else if (!/\S+\S+\.\S+/.test(input.AñosDeVida)) {
        errors.AñosDeVida = 'Años de vida incorrectos';
    }

    return errors;
};

export default function Form() {

    const [input, setInput] = React.useState({
        nombre: "",
        altura: "",
        peso: "",
        AñosDeVida: ""
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
                <label>Peso:</label>
                <input type="text" name="peso" value={input.peso} onChange={handleInputChange}
                    className={errors.peso && 'danger'} />
                {errors.peso && (<p className="danger">{errors.peso}</p>)}
            </div>

            <div>
                <label>Años de vida:</label>
                <input type="text" name="AñosDeVida" value={input.AñosDeVida} onChange={handleInputChange}
                    className={errors.AñosDeVida && 'danger'} />
                {errors.AñosDeVida && (<p className="danger">{errors.AñosDeVida}</p>)}
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