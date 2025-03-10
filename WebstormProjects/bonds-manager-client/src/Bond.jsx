import React, {useState} from 'react';

const Bond = ({bond}) => {
    const [r, setR] = useState();
    const currentDate = new Date();
    let date = new Date(bond.mainInfo.maturityDate)
    const delta = date - currentDate;
    const daysDifference = Math.floor(delta / (1000 * 3600 * 24));
    date = date.toLocaleDateString("ru-RU")
    let mas = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
    for (let i = 0; i<10; i++) {
        date = date.replaceAll(`${i}`, mas[i])
    }
    date = date.replaceAll(".", "🟢")
    let dayText = "дней"
    if ((daysDifference%10>=2 && daysDifference%10<=4 && daysDifference%100>21) || (daysDifference%100>=2 && daysDifference%100<=4)) {
        dayText = "дня"
    } else if ((daysDifference%10 === 1 && daysDifference%100>=21) || daysDifference%100 === 1) {
        dayText = "день"
    }
    return (
        <div>
            <p>
                🏷️ Тикер: ${bond.mainInfo.ticker},
            </p>
            <p>
                📜 Название: {bond.mainInfo.name}
            </p>
            {bond.mainInfo.forQualInvestorFlag ? (<p>⚠️ Для квалов</p>) : ""}
            {bond.mainInfo.floatingCouponFlag ? (<p>
                ♻️ Флоатер: КС + {(bond.coupon.value_prc - 21).toFixed(2)}%
            </p>) : ""}
            <p>
                🗓️ До: {date} ({daysDifference} {dayText})
            </p>
            <p>
                🔸 Цена: {bond.price.price} руб.
            </p>
            <p>
                🔸 Ставка: {bond.coupon.value_prc}%
            </p>
            <p>
                🔸 НКД: {bond.mainInfo.aciValue.toFixed(2)} руб.
            </p>
            <p>
                🔸 Размер купона: {bond.coupon.value} руб.
            </p>
            <p>
                🔸 Амортизация: {bond.mainInfo.amortizationFlag ? "✔️" : "❌"}
            </p>
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