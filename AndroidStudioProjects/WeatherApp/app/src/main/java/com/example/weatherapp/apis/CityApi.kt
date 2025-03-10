package com.example.weatherapp.apis

import com.example.weatherapp.models.CityFromNet
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface CityApi {
    @GET("v1/city")
    suspend fun getCity(@Query("name") name: String, @Header("X-Api-Key") api: String = "x/ZguHpaci0rfNmPJ6iiag==63JovdnzuufsPpjx"): List<CityFromNet>
}