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
        <div className='form-container'>

            <form>

                <h2>Crea tu perro</h2>

                <div>
                    <label>Nombre:</label>
                    <div className="input-container">
                        <input type="text" name="name" value={input.name}
                            onChange={handleInputChange} />
                        {errors.name && (<p className="danger">{errors.name}</p>)}
                    </div>
                </div>

                <div>
                    <label>Altura min:</label>
                    <div className='input-container'>
                        <input type="text" name="altura_min" value={input.altura_min}
                            onChange={handleInputChange} />
                        {errors.altura_min && (<p className="danger">{errors.altura_min}</p>)}
                    </div>
                </div>

                <div>
                    <label>Altura max:</label>
                    <div className='input-container'>
                        <input type="text" name="altura_max" value={input.altura_max}
                            onChange={handleInputChange} />
                        {errors.altura_max && (<p className="danger">{errors.altura_max}</p>)}
                    </div>
                </div>

                <div>
                    <label>Peso Min:</label>
                    <div className='input-container'>
                        <input type="text" name="peso_min" value={input.peso_min}
                            onChange={handleInputChange} />
                        {errors.peso_min && (<p className="danger">{errors.peso_min}</p>)}
                    </div>
                </div>

                <div>
                    <label>Peso Max:</label>
                    <div className='input-container'>
                        <input type="text" name="peso_max" value={input.peso_max}
                            onChange={handleInputChange} />
                        {errors.peso_max && (<p className="danger">{errors.peso_max}</p>)}
                    </div>
                </div>

                <div>
                    <label>Años de vida:</label>
                    <div className='input-container'>
                        <input type="text" name="AñosDeVida" value={input.AñosDeVida}
                            onChange={handleInputChange} />
                        {errors.AñosDeVida && (<p className="danger">{errors.AñosDeVida}</p>)}
                    </div>
                </div>

                <div>
                    <label>Temperamento:</label>
                    <div className='input-container'>
                        <input type="text" name="temperamento" value={input.temperamento}
                            onChange={handleInputChange} />
                        {errors.temperamento && (<p className="danger">{errors.temperamento}</p>)}
                    </div>
                </div>

                <div className='form-actions'>
                    <button onClick={handleSubmit} className='button-form'>Enviar</button>
                    <Link to="/home">
                        <button className='button-form'>Home</button>
                    </Link>
                </div>

            </form>

        </div>

    );

};