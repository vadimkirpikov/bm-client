import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController
import androidx.navigation.compose.composable
import com.example.city.screens.CategoryScreen
import com.example.city.screens.PlaceDetailsScreen
import com.example.city.screens.PlacesScreen

@Composable
fun App(viewModel: MainViewModel) {
    val navController = rememberNavController()

    NavHost(navController, startDestination = "categories") {
        composable("categories") { CategoryScreen(navController, viewModel) }
        composable("places") { PlacesScreen(navController, viewModel) }
        composable("details") { PlaceDetailsScreen(navController, viewModel) }
    }
}
