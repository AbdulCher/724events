import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trier les événements une fois
  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Cette fonction sera appelée toutes les 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timer); // Nettoie le timer à chaque rendu
  }, [index, byDateDesc.length]); // Relance le timer à chaque changement d'index

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event) => (
        <div
          key={event.id} // clé stable ici
          className={`SlideCard ${
            index === byDateDesc.indexOf(event) ? "SlideCard--display" : "SlideCard--hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((evt) => (
                <input
                  key={`radio-${evt.id}`} // clé stable pour le radio
                  type="radio"
                  name={`radio-button-${event.id}`}
                  checked={byDateDesc.indexOf(event) === byDateDesc.indexOf(evt)}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

