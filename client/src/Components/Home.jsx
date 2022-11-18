import { useEffect, useState } from 'react';
import "./Home.css";
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { getDogs, getTemperaments } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function Home(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getDogs());
        dispatch(getTemperaments())

    }, [dispatch]);



    const allDogs = useSelector((state) => state?.dogs);
    const temperaments = useSelector((state) => state?.temperaments);

    useEffect(() => {
        if (allDogs && allDogs.length) {
            setItems([...allDogs].splice(0, ITEMS_PER_PAGE));
        }
    }, [allDogs]);

    var nextHandler;
    var prevHandler;
    var handleSearchNombre;
    var handleFilterRaza;
    var handleFilterTemp;
    var handleSortAsc;
    var handleSortDes;
    var handleDelete;
    var handleSortWeigth;

    const [items, setItems] = useState("");

    const [currentPage, setCurrentPage] = useState(0);

    if (Array.isArray(allDogs) && allDogs.length) {

        console.log(allDogs);
        console.log(items);

        var ITEMS_PER_PAGE = 8;

        nextHandler = () => {

            const totalElementos = allDogs.length;

            const nextPage = currentPage + 1;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...allDogs].splice(firstIndex, ITEMS_PER_PAGE))
            setCurrentPage(nextPage);

        };

        prevHandler = () => {

            const prevPage = currentPage - 1;

            if (prevPage < 0) return;

            const firstIndex = prevPage * ITEMS_PER_PAGE;

            setItems([...allDogs].splice(firstIndex, ITEMS_PER_PAGE))
            setCurrentPage(prevPage);

        };

        handleSearchNombre = (e) => {
            setItems([...allDogs].filter((dato) => {
                return dato.name.toLowerCase().includes(e.target.value.toLowerCase())
            }))
        };

        handleFilterRaza = (e) => {
            setItems([...allDogs].filter((dato) => {
                return dato.name.toLowerCase().includes(e.target.value.toLowerCase())
            }))
        };

        handleFilterTemp = (e) => {
            setItems([...allDogs].filter((dato) => {
                return dato?.temperamento?.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        };


        handleSortDes = (e) => {

            allDogs.sort((a, b) => {

                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });

            const totalElementos = allDogs.length;

            const nextPage = currentPage;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...allDogs].splice(firstIndex, ITEMS_PER_PAGE))
        };




        handleSortAsc = (e) => {

            allDogs.sort((a, b) => {

                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            });

            const totalElementos = allDogs.length;

            const nextPage = currentPage;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...allDogs].splice(firstIndex, ITEMS_PER_PAGE))
        };


        handleSortWeigth = (e) => {

            allDogs.sort((a, b) => {

                if (a.peso_min.toLowerCase() > b.peso_min.toLowerCase()) {
                    return 1;
                }
                if (b.peso_min.toLowerCase() > a.peso_min.toLowerCase()) {
                    return -1;
                }
                return 0;

            });

            const totalElementos = allDogs.length;

            const nextPage = currentPage;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...allDogs].splice(firstIndex, ITEMS_PER_PAGE))
        };

        handleDelete = (e) => {
            window.location.reload(true);
        };

    };




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
                    <input placeholder='busca por nombre' name='search'
                        onChange={handleSearchNombre} />
                </div>

            </div>

            <select onClick={handleFilterRaza}>

                <option>Razas</option>

                {allDogs && allDogs.map((raza) => {
                    return (
                        <option key={raza.name}>
                            {raza.name}
                        </option>
                    );
                })}

            </select>

            <select onClick={handleFilterTemp}>

                <option>Temperaments</option>

                {temperaments && temperaments.map((temp) => {
                    return (
                        <option key={temp}>
                            {temp}
                        </option>
                    );
                })}

            </select>

            <button onClick={handleSortAsc}>Ascendente</button>
            <button onClick={handleSortDes}>Descendente</button>
            <button onClick={handleSortWeigth}>Order by Weigth</button>

            <button onClick={handleDelete}>Refresh</button>

            {

                items && items.map((dog) => {


                    return (

                        <Link to={"/home/" + dog.name}>
                            <HomeCard key={dog.name} img={dog.img} name={dog.name}
                                temperamento={dog.temperamento} />
                        </Link>

                    )

                })

            }

        </div>
    );

};