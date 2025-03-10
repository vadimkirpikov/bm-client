package com.example.city.repositories

import com.example.city.models.Place

class Repository {
    private val fastFoods = listOf(
        Place("Rostic's", "Бывший KFC", "ул. Ленина 15"),
        Place("Burger King", "Burger King - г***о!!!!!", "ул. Октябрьская 22"),
        Place("Вкусно и точка", "Бывший макдональдс", "ул. Гагарина 30"),
    )
    private val coffeeShops = listOf(
        Place("TASTY COFFEE", "Дорого п****ц б**** латте 0.29 за 300 рублей", "пр. Мира 12"),
        Place("СOFFELIKE", "Ну тип база по кофе для ижевчан", "ул. Карла Маркса 17"),
        Place("РОЛЬ", "Не шарю, не был", "пр. Победы 3"),
    )
    private val res = listOf(
        Place("Кинза", "Клепают такие большие пельмеши", "ул. Пушкина 5"),
        Place("Мама пицца", "Wellcum group надоели цены задирать", "ул. Чехова 9"),
        Place("Brooklyn Bowl", "И похавать и шары покатать. Устраивает", "пр. Ленина 8"),
    )

    fun getPlacesByCategory(key: String): List<Place> {
        return when (key) {
            "Fast food places" -> fastFoods
            "Coffee shops" -> coffeeShops
            "Restaurants" -> res
            else -> emptyList()
        }
    }

    fun getAllPlaces(): List<Place> {
        return fastFoods + coffeeShops + res
    }
}
