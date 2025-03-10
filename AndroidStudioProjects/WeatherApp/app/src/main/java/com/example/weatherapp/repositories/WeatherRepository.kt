package com.example.weatherapp.repositories

import com.example.weatherapp.apis.WeatherApi
import com.example.weatherapp.models.WeatherResponse


class WeatherRepository(private val api: WeatherApi)  {
    suspend fun getWeather(latitude: Double, longitude: Double): WeatherResponse = api.getWeather(latitude, longitude)
}