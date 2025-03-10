import androidx.lifecycle.ViewModel
import com.example.city.repositories.CategoryRepository
import com.example.city.repositories.Repository
import com.example.city.models.Category
import com.example.city.models.Place
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class MainViewModel : ViewModel() {
    private val categoryRepository = CategoryRepository()
    private val repository = Repository()

    private val _selectedCategory = MutableStateFlow<Category?>(null)
    val selectedCategory = _selectedCategory.asStateFlow()

    private val _selectedPlace = MutableStateFlow<Place?>(null)
    val selectedPlace = _selectedPlace.asStateFlow()

    fun getCategories() = categoryRepository.categories

    fun getPlacesByCategory() = _selectedCategory.value?.let { repository.getPlacesByCategory(it.name) } ?: emptyList()

    fun selectCategory(category: Category) {
        _selectedCategory.value = category
    }

    fun selectPlace(place: Place) {
        _selectedPlace.value = place
    }
}
