import "./HomeCard.css";
import React from 'react';

function HomeCard(props) {
    return (
        <article key={props.name} className="card">

            <div className="card-header">
                <img src={props.img} />
            </div>

            <div className="card-info">
                <ul>

                    <li>
                        <span>
                            Name:
                        </span>
                        {props.name}
                    </li>

                    <li>
                        <span>
                            Temperamento:
                        </span>
                        {props.temperamento}
                    </li>

                </ul>
            </div>

        </article>
    )
}

export default HomeCard;