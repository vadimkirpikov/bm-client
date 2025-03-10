import React, { useState } from "react";

const CriteriaDescription = ({ formData }) => {
    const generateCriteriaDescription = (formData) => {
        const descriptions = [];

        // Проверка цен
        if (formData.priceFrom !== null && formData.priceTo !== null) {
            descriptions.push(`📌 Цена от ${formData.priceFrom} руб. до ${formData.priceTo} руб.`);
        } else if (formData.priceFrom !== null) {
            descriptions.push(`📌 Цена от ${formData.priceFrom} руб.`);
        } else if (formData.priceTo !== null) {
            descriptions.push(`📌 Цена до ${formData.priceTo} руб.`);
        }

        // Проверка рейтинга
        if (formData.ratingFrom !== null && formData.ratingTo !== null) {
            descriptions.push(`📌 Рейтинг от ${formData.ratingFrom} до ${formData.ratingTo}`);
        } else if (formData.ratingFrom !== null) {
            descriptions.push(`📌 Рейтинг от ${formData.ratingFrom}`);
        } else if (formData.ratingTo !== null) {
            descriptions.push(`📌 Рейтинг до ${formData.ratingTo}`);
        }

        // Проверка купона
        if (formData.couponPrcFrom !== null && formData.couponPrcTo !== null) {
            descriptions.push(`📌 Ставка от ${formData.couponPrcFrom}% до ${formData.couponPrcTo}%`);
        } else if (formData.couponPrcFrom !== null) {
            descriptions.push(`📌 Ставка от ${formData.couponPrcFrom}%`);
        } else if (formData.couponPrcTo !== null) {
            descriptions.push(`📌 Ставка до ${formData.couponPrcTo}%`);
        }

        // Проверка даты погашения
        if (formData.maturityDateFrom !== null && formData.maturityDateTo !== null) {
            descriptions.push(`📌 Дата погашения от ${formData.maturityDateFrom} до ${formData.maturityDateTo}`);
        } else if (formData.maturityDateFrom !== null) {
            descriptions.push(`📌 Дата погашения от ${formData.maturityDateFrom} и выше`);
        } else if (formData.maturityDateTo !== null) {
            descriptions.push(`📌 Дата погашения до ${formData.maturityDateTo} и ниже`);
        }

        // Проверка даты размещения
        if (formData.placementDateFrom !== null && formData.placementDateTo !== null) {
            descriptions.push(`📌 Дата размещения от ${formData.placementDateFrom} до ${formData.placementDateTo}`);
        } else if (formData.placementDateFrom !== null) {
            descriptions.push(`📌 Дата размещения от ${formData.placementDateFrom}`);
        } else if (formData.placementDateTo !== null) {
            descriptions.push(`📌 Дата размещения до ${formData.placementDateTo}`);
        }

        if (formData.aciValueFrom !== null && formData.aciValueTo !== null) {
            descriptions.push(`📌 НКД от ${formData.aciValueFrom} руб. до ${formData.aciValueTo} руб.`);
        } else if (formData.aciValueFrom !== null) {
            descriptions.push(`📌 НКД от ${formData.aciValueFrom} руб.`);
        } else if (formData.aciValueTo !== null) {
            descriptions.push(`📌 НКД до ${formData.aciValueTo} руб.`);
        }

        // if (formData.withoutAnyEvent) {
        //     descriptions.push("Без событий - галочка");
        // }

        // Булевый флаг для флоатеров
        if (formData.isFloater === 1) {
            descriptions.push(`📌 Плавающий купон`);
        }
        else if (formData.isFloater === 2) {
            descriptions.push("📌 Фиксированный купон")
        }

        // Другие критерии
        if (formData.nominal !== null) {
            descriptions.push(`📌 Номинал: ${formData.nominal}`);
        }

        // if (formData.currency) {
        //     descriptions.push(`📌 Валюта: ${formData.currency}`);
        // }


        if (formData.availability === 2) {
            descriptions.push(`📌 Требуется квал`);
        } else if (formData.availability === 1) {
            descriptions.push(`📌 Не требуется квал`)
        }

        if (formData.couponQuantityPerYear === 12) {
            descriptions.push(`📌 Ежемесячные выплаты`);
        } else if (formData.couponQuantityPerYear === 4) {
            descriptions.push(`📌 Квартальные выплаты`);
        } else if (formData.couponQuantityPerYear === 2) {
            descriptions.push(`📌 Полугодовые выплаты`);
        }

        if (formData.sector) {
            descriptions.push(`📌 Сектор: ${formData.sector}`);
        }

        if (formData.amortizationFlag === 2) {
            descriptions.push(`📌 С амортизацией`);
        } else if (formData.amortizationFlag === 1) {
            descriptions.push(`📌 Без амортизации`);
        }

        return descriptions;
    };

    return (
        <div>
            <h3>📒 Описание подборки:</h3>
            <div>{generateCriteriaDescription(formData).map((item, key) => <p key={key}>{item}</p>)}</div>
        </div>
    );
};
export default CriteriaDescription;
