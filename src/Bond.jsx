import React, {useState} from 'react';

const Bond = ({bond}) => {
    const [r, setR] = useState();
    const currentDate = new Date();
    const formatDate = (date, em) => {
        date = date.toLocaleDateString("ru-RU");
        date = date.slice(0, 6) + date.slice(8, 10);
        let mas = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        for (let i = 0; i < 10; i++) {
            date = date.replaceAll(`${i}`, mas[i]);
        }
        date = date.replaceAll(".", em);
        return date;
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
        "C": "Опцион",
        "A": "Оферта",
        "O": "Оферта"
    }
    const values = {
        "rub": "руб.",
        "usd": "💲",
        "cny": "💴",
        "eur": "💶"
    }

    const mtDate = getDayDiff(date1, currentDate);
    return (
        <div>
            <p>
                🏷️ Тикер: ${bond.mainInfo.ticker},
            </p>
            <p>
                📜 Название: {bond.mainInfo.name}
            </p>
            {bond.mainInfo.forQualInvestorFlag ? (<p>⚠️ Для квалов</p>) : ""}
            {bond.callEvent ? <p>⚠️ {eventTypes[bond.callEvent.type]}: {formatDate(new Date(bond.callEvent.payDate), "❕")} </p>: ""}
            {bond.mainInfo.floatingCouponFlag ? (<p>
                ♻️ Флоатер: КС + {(bond.coupon.value_prc - 21).toFixed(2)}%
            </p>) : ""}
            <p>
                🗓️ До: {formatDate(date1, "🍀")} ({mtDate.dayDiff} {mtDate.dayText})
            </p>
            {/*<p>*/}
            {/*    🔸 Цена: {bond.price.price} {values[bond.mainInfo.nominal.currency]}*/}
            {/*</p>*/}
            <p>
                🔸 Ставка: {bond.coupon.value_prc}%
            </p>
            <p>
                🔸 НКД: {bond.mainInfo.aciValue.toFixed(2)} руб.
            </p>
            <p>
                🔸 Размер купона: {bond.coupon.value} {values[bond.mainInfo.nominal.currency]}
            </p>
            <p>
                🔸 Амортизация: {bond.mainInfo.amortizationFlag ? "✔️" : "❌"}
            </p>
            <p>
                🔸 Рейтинг: {bond.rating ? bond.rating
                .replaceAll("A", "🅰️")
                .replaceAll("B", "🅱️")
                .replaceAll("+", "➕")
                .replaceAll("-", "➖") : "➖"}
            </p>
            <p><br/></p>
        </div>
    )
}
export default Bond;