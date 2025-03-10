package com.example.city.repositories

import com.example.city.models.Category

class CategoryRepository {
    private val _categories = listOf(
        Category("Fast food places", "https://daliz.ru/wp-content/uploads/2024/07/21886522_751_0_2799_2048_1920x0_80_0_0_671cf693d7ce66788515c40e34d76a8c.jpg"),
        Category("Coffee shops", "https://cachizer3.2gis.com/reviews-photos/b4190923-a8db-48d8-8136-c97ab4123b6d.jpg?w=1920"),
        Category("Restaurants", "https://ae04.alicdn.com/kf/Scac1fa01fac747578b110eb1a066543dK.jpg"),
    )

    val categories get() = _categories
}