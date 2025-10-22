import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEquipments } from "../api";

export default function EquipmentDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchEquipments()
      .then((data) => {
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : data.results ?? [];
        const found = arr.find((x) => String(x.id) === String(id));
        if (!found) {
          setError("Товар не найден");
        } else {
          setItem(found);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Ошибка загрузки");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="info">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!item) return <div className="info">Товар не найден</div>;

  const image = item.image_card || item.image || item.image_src || "";
  const name = item.name || "Без названия";
  const price = item.price || item.cost || null;
  const desc = item.description || item.full_description || "";

  return (
    <div className="detail container">
      <Link to="/" className="back-link">← Назад к списку</Link>
      <div className="detail-inner">
        <div className="detail-left">
          {image ? <img src={image} alt={item.image_card_alt || name} /> : <div className="no-img">Нет фото</div>}
        </div>
        <div className="detail-right">
          <h2>{name}</h2>
          {price && <p className="price">Цена: {price}</p>}
          <div className="description" dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
      </div>
    </div>
  );
}
