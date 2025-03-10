package com.example.weatherapp.repositories

import com.example.weatherapp.apis.CityApi
import com.example.weatherapp.models.CityFromNet

class CityRepository(private val cityApi: CityApi) {
    suspend fun getCityByName (name: String): List<CityFromNet> = cityApi.getCity(name)
}