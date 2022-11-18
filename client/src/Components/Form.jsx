import React from 'react';
import "./Form.css";
import axios from "axios";
import { Link } from 'react-router-dom';



function validate(input) {

    let errors = {};

    if (!input.name) {
        errors.name = 'se requiere el nombre';
    } else if (typeof input.name !== "string") {
        errors.name = 'nombre debe ser texto';
    } else if (input.name.length < 4) {
        errors.name = "debe contener al menos 4 letras"
    }

    if (!input.altura_min) {
        errors.altura_min = 'se requiere peso min';
    } else if (isNaN(input.altura_min)) {
        errors.altura_min = 'peso min incorrecto';
    } else if (input.altura_min < 1) {
        errors.altura_min = 'debe ser mayor a 0'
    }

    if (!input.altura_max) {
        errors.altura_max = 'se requiere peso max';
    } else if (isNaN(input.altura_max)) {
        errors.altura_max = 'peso max incorrecto';
    } else if (input.altura_max >= 100) {
        errors.altura_max = 'debe ser menor a 100'
    } else if (input.altura_max <= 1) {
        errors.altura_max = 'debe ser mayor a 1'
    }



    if (!input.peso_min) {
        errors.peso_min = 'se requiere peso min';
    } else if (isNaN(input.peso_min)) {
        errors.peso_min = 'peso min incorrecto';
    } else if (input.peso_min < 1) {
        errors.peso_min = 'debe ser mayor a 0'
    }

    if (!input.peso_max) {
        errors.peso_max = 'se requiere peso max';
    } else if (isNaN(input.peso_max)) {
        errors.peso_max = 'peso max incorrecto';
    } else if (input.peso_max >= 100) {
        errors.peso_max = 'debe ser menor a 100'
    } else if (input.peso_max <= 1) {
        errors.peso_max = 'debe ser mayor a 1'
    }

    if (!input.AñosDeVida) {
        errors.AñosDeVida = 'se requieren los Años De Vida';
    } else if (!isNaN(input.AñosDeVida)) {
        errors.AñosDeVida = 'Años de Vida debe ser num - num';
    } else if (isNaN(input.AñosDeVida[0])) {
        errors.AñosDeVida = 'Años de Vida debe ser num - num';
    }

    if (!input.temperamento) {
        errors.temperamento = 'se requiere temperamento';
    } else if (typeof input.temperamento !== "string") {
        errors.temperamento = 'temperamento debe ser texto';
    } else if (input.temperamento.length < 4) {
        errors.temperamento = "debe contener al menos 4 letras"
    }

    return errors;
};

export default function Form() {

    const [input, setInput] = React.useState({
        name: "",
        altura_min: "",
        altura_max: "",
        peso_min: "",
        peso_max: "",
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
                <input type="text" name="name" value={input.name} onChange={handleInputChange}
                    className={errors.name && 'danger'} />
                {errors.name && (<p className="danger">{errors.name}</p>)}
            </div>

            <div>
                <label>Altura min:</label>
                <input type="text" name="altura_min" value={input.altura_min} onChange={handleInputChange}
                    className={errors.altura_min && 'danger'} />
                {errors.altura_min && (<p className="danger">{errors.altura_min}</p>)}
            </div>

            <div>
                <label>Altura max:</label>
                <input type="text" name="altura_max" value={input.altura_max} onChange={handleInputChange}
                    className={errors.altura_max && 'danger'} />
                {errors.altura_max && (<p className="danger">{errors.altura_max}</p>)}
            </div>

            <div>
                <label>Peso Min:</label>
                <input type="text" name="peso_min" value={input.peso_min} onChange={handleInputChange}
                    className={errors.peso_min && 'danger'} />
                {errors.peso_min && (<p className="danger">{errors.peso_min}</p>)}
            </div>

            <div>
                <label>Peso Max:</label>
                <input type="text" name="peso_max" value={input.peso_max} onChange={handleInputChange}
                    className={errors.peso_max && 'danger'} />
                {errors.peso_max && (<p className="danger">{errors.peso_max}</p>)}
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