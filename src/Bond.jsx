import React, { useState } from 'react';

const Bond = ({ bond }) => {
    const [r, setR] = useState();
    const currentDate = new Date();

    const formatDate = (date, em) => {
        if (!(date instanceof Date) || isNaN(date)) return '❗ Неверная дата';

        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear().toString().slice(-2);

        let formatted = `${day}.${month}.${year}`;

        const mas = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        for (let i = 0; i < 10; i++) {
            formatted = formatted.replaceAll(`${i}`, mas[i]);
        }

        return formatted.replaceAll(".", em);
    };

    const getDayDiff = (date, currentDate) => {
        if (!(date instanceof Date) || isNaN(date)) return { dayDiff: '❗', dayText: 'ошибка' };

        const delta = date - currentDate;
        const daysDifference = Math.floor(delta / (1000 * 3600 * 24));
        let dayText = "дней";
        if ((daysDifference % 10 >= 2 && daysDifference % 10 <= 4 && daysDifference % 100 > 21) || (daysDifference % 100 >= 2 && daysDifference % 100 <= 4)) {
            dayText = "дня";
        } else if ((daysDifference % 10 === 1 && daysDifference % 100 >= 21) || daysDifference % 100 === 1) {
            dayText = "день";
        }
        return { dayDiff: daysDifference, dayText };
    };

    const maturityDate = new Date(bond?.mainInfo?.maturityDate);
    const mtDate = getDayDiff(maturityDate, currentDate);

    const eventTypes = {
        "C": "Колл-опцион",
        "A": "Оферта(PUT)",
        "O": "Оферта(CALL)"
    };

    return (
        <div>
            <p>📜 ${bond?.mainInfo?.ticker || '❗'} {bond?.mainInfo?.name || '❗'}</p>

            {bond?.mainInfo?.forQualInvestorFlag && <p>⚠️ Для квалов</p>}

            {bond?.mainInfo?.floatingCouponFlag && (
                <p>
                    ♻️ Флоатер: КС + {((bond?.coupon?.value_prc) - 20).toFixed(2)}%
                </p>
            )}

            {bond?.callEvent &&
                <p>❗ {eventTypes[bond.callEvent?.type] || "❗ Неизв. тип"}: {formatDate(new Date(bond.callEvent?.payDate), "❕")} </p>
            }

            <p>🗓️ Погашение: {formatDate(maturityDate, "💸")} ({mtDate.dayDiff} {mtDate.dayText})</p>

            <p>🔸 Ставка: {bond?.coupon?.value_prc ?? '❗'}%</p>

            <p>🔸 След. купон: {formatDate(new Date(bond?.coupon?.eventDate), "💸")}</p>

            <p>🔸 Размер купона: {bond?.coupon?.value ?? '❗'} руб.</p>

            <p>🔸 Амортизация: {bond?.mainInfo?.amortizationFlag ? "✔️" : "❌"}</p>

            {bond?.mainInfo?.amortizationFlag && bond?.startMtyDate && (
                <>
                    <p>🔹 Ближайшая амортизация: {formatDate(new Date(bond.startMtyDate?.eventDate), "💸")}</p>
                    <p>🔹 Доля: {bond.startMtyDate?.value ?? '❗'}%</p>
                </>
            )}

            <p>
                🔸 Рейтинг: {(bond?.rating ?? "❗")
                .replaceAll("A", "🅰️")
                .replaceAll("B", "🅱️")
                .replaceAll("+", "➕")
                .replaceAll("-", "➖")}
            </p>
            <p>
                🔸 Плечо: {(bond?.marginAble) ? "✅" : "❌"}
            </p>

            <p><br /></p>
        </div>
    );
};

export default Bond;
