const API_URL = "https://recensa.ru/api/equipments/";

export async function fetchEquipments() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Ошибка запроса: ${res.status} ${res.statusText} — ${t}`);
  }
  const data = await res.json();
  return data;
}
