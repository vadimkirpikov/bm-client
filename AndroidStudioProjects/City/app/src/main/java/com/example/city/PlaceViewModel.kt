package com.alexkorep.city

import androidx.lifecycle.ViewModel
import com.example.city.repositories.Repository
import com.example.city.models.Place

class PlaceViewModel : ViewModel() {
    private val repository = Repository()

    fun getPlacesByCategory(category: String): List<Place> {
        return repository.getPlacesByCategory(category)
    }

    fun getAllPlaces(): List<Place> {
        return repository.getAllPlaces()
    }
}