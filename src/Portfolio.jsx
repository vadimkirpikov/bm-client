import React from "react";

const Portfolio = ({data}) => {
    return (
        <div>
            <p>☕ Актуализирую свой портфель</p>
            <p>💰 Общая сумма: {data.totalSum.toLocaleString()} ₽</p>
            <p>📈 Акции: {data.sharesSum.toLocaleString()} ₽</p>
            <p>📄 Облигации: {data.bondsSum.toLocaleString()} ₽</p>
            <p>📊 Фонды: {data.etfSum.toLocaleString()} ₽</p>
            <p>Подробнее 👇</p>
            <p>📊 Фонды:</p>
            {data.etfs.map((etf, i) => (
                <p key={`etf-${i}`}>📌 {etf.name} ({etf.ticker}) — {etf.count} шт</p>
            ))}
            <p><br/></p>
            <p>🧾 Облигации:</p>
            {data.bonds.map((bond, i) => (
                <p key={`bond-${i}`}>{bond.name} ({bond.ticker}) — {bond.count} шт</p>
            ))}
            <p><br/></p>
            <p>📈 Акции:</p>
            {data.shares.map((share, i) => (
                <p key={`share-${i}`}>{share.name} ({share.ticker}) — {share.count} шт</p>
            ))}
            <p><br/>Спасибо, буду рад любой вашей поддержке. Всем удачи на рынке🚀</p>
            <p>
                <br/>#пульс #пульс_оцени #прояви_себя_в_пульсе #облигации #новичкам #хочу_в_дайджест #новичок
            </p>
        </div>
    );
};

export default Portfolio;
