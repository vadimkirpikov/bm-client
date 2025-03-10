package com.example.weatherapp.ui.theme.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun CityListScreen(
    onCityClick: (String, String) -> Unit
) {
    val cities = listOf(
        Pair("Москва", "Moscow"),
        Pair("Санкт-Петербург", "Saint Petersburg"),
        Pair("Ижевск", "Izhevsk"),
        Pair("Самара", "Samara"),
        Pair("Хабаровск", "Khabarovsk")
    )

    Column(modifier = Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            modifier = Modifier.padding(vertical = 30.dp),
            text = "ПОГОДА РФ СЕГОДНЯ",
            style = MaterialTheme.typography.headlineLarge
        )
        LazyColumn(modifier = Modifier.padding(horizontal = 10.dp)) {
            items(cities) { city ->
                CityCard(city, onCityClick)
            }
        }
    }
}

@Composable
fun CityCard(city: Pair<String, String>, onCityClick: (String, String) -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable { onCityClick(city.second, city.first) },
        shape = MaterialTheme.shapes.medium,
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = city.first,
                style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold)
            )
            Spacer(modifier = Modifier.height(4.dp))
        }
    }
}
