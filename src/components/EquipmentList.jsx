import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEquipments } from "../api";

export default function EquipmentList() {
  const [items, setItems] = useState([]);
  const [visibleAll, setVisibleAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchEquipments()
      .then((data) => {
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : data.results ?? [];
        setItems(arr);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Ошибка загрузки");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const toShow = visibleAll ? items : items.slice(0, 6);

  return (
    <section className="equip-section">
      <div className="container">
        <div className="equip-grid">
          {loading && <div className="info">Загрузка...</div>}
          {error && <div className="error">Ошибка: {error}</div>}
          {!loading && !error && toShow.length === 0 && (
            <div className="info">Нет товаров</div>
          )}

          {toShow.map((item) => {
            const id = item.id;
            const image = item.image_card || item.image || item.image_src || "";
            const alt = item.image_card_alt || item.name || "equipment";
            const name = item.name || "Без названия";
            return (
              <Link to={`/equipment/${id}`} key={id} className="card">
                <div className="card-img-wrap">
                  {image ? (
                    <img src={image} alt={alt} title={alt} />
                  ) : (
                    <div className="no-img">Нет фото</div>
                  )}
                </div>
                <h3 className="card-title">{name}</h3>
              </Link>
            );
          })}
        </div>

        {!loading && !error && items.length > 6 && (
          <div className="controls">
            <button className="btn" onClick={() => setVisibleAll((v) => !v)}>
              {visibleAll ? "Скрыть" : "Смотреть все"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
