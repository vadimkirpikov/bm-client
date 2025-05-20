import React, {useState} from 'react';

const Bond = ({bond}) => {
    const [r, setR] = useState();
    const currentDate = new Date();
    const formatDate = (date, em) => {
        // Получаем компоненты даты вручную
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear().toString().slice(-2); // последние две цифры

        let formatted = `${day}.${month}.${year}`;

        // Заменяем цифры на emoji
        let mas = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        for (let i = 0; i < 10; i++) {
            formatted = formatted.replaceAll(`${i}`, mas[i]);
        }

        // Заменяем точки на переданный символ
        formatted = formatted.replaceAll(".", em);

        return formatted;
    };

    const getDayDiff = (date, currentDate) => {
        const delta = date - currentDate;
        const daysDifference = Math.floor(delta / (1000 * 3600 * 24));
        let dayText = "дней"
        if ((daysDifference%10>=2 && daysDifference%10<=4 && daysDifference%100>21) || (daysDifference%100>=2 && daysDifference%100<=4)) {
            dayText = "дня"
        } else if ((daysDifference%10 === 1 && daysDifference%100>=21) || daysDifference%100 === 1) {
            dayText = "день"
        }
        return {dayDiff: daysDifference, dayText: dayText};
    }
    let date1 = new Date(bond.mainInfo.maturityDate)
    const delta = date1 - currentDate;
    const daysDifference = Math.floor(delta / (1000 * 3600 * 24));
    const eventTypes = {
        "C": "Колл-опцион",
        "A": "Оферта(PUT)",
        "O": "Оферта(CALL)"
    }

    const mtDate = getDayDiff(date1, currentDate);
    return (
        <div>
            <p>
                📜 ${bond.mainInfo.ticker} {bond.mainInfo.name}
            </p>
            {bond.mainInfo.forQualInvestorFlag ? (<p>⚠️ Для квалов</p>) : ""}
            {bond.mainInfo.floatingCouponFlag ? (<p>
                ♻️ Флоатер: КС + {(bond.coupon.value_prc - 21).toFixed(2)}%
            </p>) : ""}
            {bond.callEvent ? <p>🤬 {eventTypes[bond.callEvent.type]}: {formatDate(new Date(bond.callEvent.payDate), "❕")} </p>: ""}
            <p>
                🗓️ Погашение: {formatDate(date1, "💸")} ({mtDate.dayDiff} {mtDate.dayText})
            </p>
            {/*<p>*/}
            {/*    🔸 Цена: {bond.price.price} руб.*/}
            {/*</p>*/}
            <p>
                🔸 Ставка: {bond.coupon.value_prc}%
            </p>
            {/*            <p>
                🔸 НКД: {bond.mainInfo.aciValue.toFixed(2)} руб.
            </p>*/}
            <p> 🔸 След. купон: {formatDate(new Date(bond.coupon.eventDate), "💸")} </p>
            <p>
                🔸 Размер купона: {bond.coupon.value} руб.
            </p>
            <p>
                🔸 Амортизация: {bond.mainInfo.amortizationFlag ? "✔️" : "❌"}
            </p>
            {bond.mainInfo.amortizationFlag && <p>
                🔹 Ближайшая амортизация: {formatDate(new Date(bond.startMtyDate.eventDate), "💸")}
                <p> 🔹 Доля: {bond.startMtyDate.value} %</p>

            </p>}
            <p>
                🔸 Рейтинг: {bond.rating
                .replaceAll("A", "🅰️")
                .replaceAll("B", "🅱️")
                .replaceAll("+", "➕")
                .replaceAll("-", "➖")}
            </p>
            <p><br/></p>
        </div>
    )
}
export default Bond;