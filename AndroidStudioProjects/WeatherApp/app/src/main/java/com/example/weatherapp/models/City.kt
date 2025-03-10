package com.example.weatherapp.models

data class City (
    val name: String,
    val latitude: Double,
    val longitude: Double,
    val country: String,
    val population: Long,
    val region: String,
    val isCapital: Boolean
)