package com.example.weatherapp.apis

import com.example.weatherapp.models.WeatherResponse
import retrofit2.http.GET
import retrofit2.http.Query


interface WeatherApi {
    @GET("v1/forecast")
    suspend fun getWeather(
        @Query("latitude") latitude: Double,
        @Query("longitude") longitude: Double,
        @Query("hourly") hourly: String = "temperature_2m",
        @Query("forecast_days") forecastDays: Int = 1,
        @Query("timezone") timeZone: String = "auto"
    ): WeatherResponse
}
