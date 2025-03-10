package com.example.weatherapp.ui.theme.screens

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.weatherapp.models.CityFromNet
import com.example.weatherapp.models.WeatherResponse
import com.example.weatherapp.repositories.CityRepository
import com.example.weatherapp.repositories.WeatherRepository
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Locale


@RequiresApi(Build.VERSION_CODES.O)
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WeatherScreen(
    cityRepository: CityRepository,
    weatherRepository: WeatherRepository,
    cityName: String,
    cityRu: String,
    navigateBack: () -> Unit
) {
    var weatherData by remember { mutableStateOf<WeatherResponse?>(null) }
    var cityCoordinates by remember { mutableStateOf<CityFromNet?>(null) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(cityName) {
        isLoading = true
        val cityResponse = cityRepository.getCityByName(cityName)
        cityCoordinates = cityResponse.firstOrNull { it.name == cityName }

        cityCoordinates?.let {
            val weatherResponse = weatherRepository.getWeather(it.latitude, it.longitude)
            weatherData = weatherResponse
        }

        isLoading = false
    }

    Column(modifier = Modifier.fillMaxSize()) {
        TopAppBar(
            title = { Text(text = cityRu, style = MaterialTheme.typography.headlineSmall) },
            navigationIcon = {
                IconButton(onClick = navigateBack) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                }
            }
        )

        if (isLoading) {
            CircularProgressIndicator(modifier = Modifier.align(Alignment.CenterHorizontally))
        } else if (weatherData != null) {
            WeatherContent(weatherData = weatherData!!)
        } else {
            Text(
                text = "Ошибка загрузки данных",
                modifier = Modifier.align(Alignment.CenterHorizontally),
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.error
            )
        }
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun WeatherContent(weatherData: WeatherResponse) {
    val hourlyData = weatherData.hourly
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(8.dp)
    ) {
        items(hourlyData.time.zip(hourlyData.temperature2m)) { (time, temp) ->
            WeatherHourCard(time = time, temperature = temp)
        }
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun WeatherHourCard(time: String, temperature: Double) {
    val formattedTime = formatDateTime(time)

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        shape = MaterialTheme.shapes.medium,
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Filled.DateRange, contentDescription = "Time Icon", tint = MaterialTheme.colorScheme.primary)
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = formattedTime,
                    style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold)
                )
            }

            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(text = "\uD83C\uDF21\uFE0F")
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "%.1f°C".format(temperature),
                    style = MaterialTheme.typography.bodyLarge.copy(fontSize = 18.sp, fontWeight = FontWeight.Bold)
                )
            }
        }
    }
}

@RequiresApi(Build.VERSION_CODES.O)
fun formatDateTime(dateTime: String): String {
    return try {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm")
        val parsedDate = LocalDateTime.parse(dateTime, formatter)
        val outputFormatter = DateTimeFormatter.ofPattern("HH:mm", Locale.getDefault())
        parsedDate.format(outputFormatter)
    } catch (e: Exception) {
        "Неизвестное время"
    }
}

