import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = [...(data?.focus || [])].sort((a, b) =>
     new Date(b.date) < new Date(a.date) ? -1 : 1
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);

  if (byDateDesc.length === 0) return <p>Chargement...</p>;

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, i) => (
        <div
          key={`slide-${event.id}`} // ✅ clé unique et stable
          className={`SlideCard ${
            index === i ? "SlideCard--display" : "SlideCard--hide"
          }`}
        >
          <img src={event.cover} alt={event.title || "event"} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* ✅ Radio en dehors de chaque slide */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, i) => (
            <input
              key={`radio-${event.id}`} // ✅ unique par event
              type="radio"
              name="slider-pagination"
              checked={index === i}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
