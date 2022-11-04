import "./HomeCard.css";
import React from 'react';

function HomeCard(props) {
    return (
        <article className="card">
            <ul>

                <li>
                    Img: {props.img}
                </li>

                <li>
                    Name: {props.name}
                </li>

                <li>
                    Temperamento: {props.temperamento}
                </li>

            </ul>
        </article>
    )
}

export default HomeCard;