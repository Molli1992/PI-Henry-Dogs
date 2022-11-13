import { useEffect, useState } from 'react';
import "./Home.css";
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { getDogs } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import FilterRaza from './FilterRaza';
import FilterTemp from './FilterTemp';

export default function Home(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch]);



    const allDogs = useSelector((state) => state?.dogs);

    useEffect(() => {
        if (allDogs && allDogs.length) {
            setDatosFromApi(allDogs);
            setItems([...allDogs].splice(0, ITEMS_PER_PAGE));
        }
    }, [allDogs]);

    var nextHandler;
    var prevHandler;
    var handleSearchTemperamento;
    var handleSearchRaza;
    var results;

    const [datosFromApi, setDatosFromApi] = useState("");

    const [items, setItems] = useState("");

    const [currentPage, serCurrentPage] = useState(1);

    const [searchTemperamento, setSearchTemperamento] = useState("");

    const [searchRaza, setSearchRaza] = useState("");

    if (Array.isArray(allDogs) && allDogs.length) {

        console.log(allDogs);
        console.log(items);

        var ITEMS_PER_PAGE = 8;

        nextHandler = () => {

            const totalElementos = datosFromApi.length;

            const nextPage = currentPage + 1;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE))
            serCurrentPage(nextPage);

        };

        prevHandler = () => {

            const prevPage = currentPage - 1;

            if (prevPage < 1) return;

            const firstIndex = prevPage * ITEMS_PER_PAGE;

            setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE))
            serCurrentPage(prevPage);

        };

        handleSearchTemperamento = (e) => {
            setSearchTemperamento(e.target.value);
            console.log(e.target.value)
        };

        handleSearchRaza = (e) => {
            setSearchRaza(e.target.value);
            console.log(e.target.value)
        };

        results = [];

        if (!searchTemperamento && !searchRaza) {
            results = items;
        } else if (searchTemperamento) {
            results = items.filter((dato) => {
                return dato.temperamento.toLowerCase().includes(searchTemperamento.toLowerCase())
            })
        } else {
            results = items.filter((dato) => {
                return dato.name.toLowerCase().includes(searchRaza.toLowerCase())
            })
        }



    }

    return (

        <div>

            <div>Pagina: {currentPage}</div>

            <div>
                <button onClick={prevHandler}>Prev</button>
                <button onClick={nextHandler}>Next</button>
            </div>

            <div >
                <Link to="/form">
                    <button className='button-home'>Crea tu raza de perros</button>
                </Link>
            </div>

            <div className='home-page'>

                <div>
                    <label>Busca tu perro</label>
                    <input placeholder='busca por temperamento'
                        onChange={handleSearchTemperamento} />
                    <input placeholder='busca por raza' onChange={handleSearchRaza} />
                </div>

            </div>

            <FilterRaza />
            <FilterTemp />

            {

                results && results.map((dog) => {


                    return (

                        <Link to={"/home/" + dog.name}>
                            <HomeCard key={dog.name} img={dog.img} name={dog.name} temperamento={dog.temperamento} />
                        </Link>

                    )

                })

            }

        </div>
    );

};