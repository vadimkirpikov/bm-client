package com.example.city.screens

import MainViewModel
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.clickable
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.city.models.Place

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlacesScreen(navController: NavController, viewModel: MainViewModel) {
    val places = viewModel.getPlacesByCategory()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(viewModel.selectedCategory.value?.name ?: "") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Назад") // Use a stable icon
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            contentPadding = paddingValues,
            modifier = Modifier.padding(16.dp)
        ) {
            items(places) { place ->
                PlaceItem(place) {
                    viewModel.selectPlace(place)
                    navController.navigate("details")
                }
            }
        }
    }
}

@Composable
fun PlaceItem(place: Place, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable { onClick() }
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(place.name, style = MaterialTheme.typography.titleMedium)
            Text(place.description, style = MaterialTheme.typography.bodyMedium)
        }
    }
}
