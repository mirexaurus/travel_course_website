window.addEventListener("DOMContentLoaded", () => {

    const btnSearch = document.getElementById('btnSearch');
    const btnReset = document.getElementById('btnReset');
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.getElementById('searchResults');
  
    btnSearch.addEventListener("click", searchRecommendation);
    btnReset.addEventListener('click', resetForm);
  
    function searchRecommendation() {
        const input = searchInput.value.trim().toLowerCase();
        resultDiv.innerHTML = '';
      
        fetch('travel_recommendation_api.json')
          .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
          })
          .then(data => {
            let found = false;
      
            // Show all beaches
            if (input === "beach" || input === "beaches") {
              resultDiv.innerHTML += `<h2>Beaches</h2>`;
              data.beaches.forEach(beach => {
                resultDiv.innerHTML += `
                  <h3>${beach.name}</h3>
                  <img src="${beach.imageUrl}" alt="${beach.name}" style="max-width: 300px;">
                  <p><strong>Location:</strong> ${beach.location}</p>
                  <p>${beach.description || 'No description available.'}</p>
                `;
              });
              found = true;
            }
      
            // Show all temples
            else if (input === "temple" || input === "temples") {
              resultDiv.innerHTML += `<h2>Temples</h2>`;
              data.temples.forEach(temple => {
                resultDiv.innerHTML += `
                  <h3>${temple.name}</h3>
                  <img src="${temple.imageUrl}" alt="${temple.name}" style="max-width: 300px;">
                  <p><strong>Location:</strong> ${temple.location}</p>
                  <p>${temple.description || 'No description available.'}</p>
                `;
              });
              found = true;
            }
      
            // Show all countries
            else if (input === "country" || input === "countries") {
              resultDiv.innerHTML += `<h2>Countries</h2>`;
              data.countries.forEach(country => {
                resultDiv.innerHTML += `<h3>${country.name}</h3>`;
                country.cities.forEach(city => {
                  resultDiv.innerHTML += `
                    <h4>${city.name}</h4>
                    <img src="${city.imageUrl}" alt="${city.name}" style="max-width: 300px;">
                    <p>${city.description || 'No description available.'}</p>
                  `;
                });
              });
              found = true;
            }
      
            // Search for exact country
            else {
              const country = data.countries.find(item => item.name.toLowerCase() === input);
              if (country) {
                resultDiv.innerHTML += `<h2>Country: ${country.name}</h2>`;
                country.cities.forEach(city => {
                  resultDiv.innerHTML += `
                    <h3>${city.name}</h3>
                    <img src="${city.imageUrl}" alt="${city.name}" style="max-width: 300px;">
                    <p>${city.description || 'No description available.'}</p>
                  `;
                });
                resultDiv.innerHTML += `<p><strong>ID:</strong> ${country.id}</p>`;
                found = true;
              }
      
              // Search for temple by name
              const temple = data.temples.find(item => item.name.toLowerCase() === input);
              if (temple) {
                resultDiv.innerHTML += `<h2>Temple: ${temple.name}</h2>`;
                resultDiv.innerHTML += `
                  <img src="${temple.imageUrl}" alt="${temple.name}" style="max-width: 300px;">
                  <p><strong>Location:</strong> ${temple.location}</p>
                  <p>${temple.description || 'No description available.'}</p>
                `;
                found = true;
              }
      
              // Search for beach by name
              const beach = data.beaches.find(item => item.name.toLowerCase() === input);
              if (beach) {
                resultDiv.innerHTML += `<h2>Beach: ${beach.name}</h2>`;
                resultDiv.innerHTML += `
                  <img src="${beach.imageUrl}" alt="${beach.name}" style="max-width: 300px;">
                  <p><strong>Location:</strong> ${beach.location}</p>
                  <p>${beach.description || 'No description available.'}</p>
                `;
                found = true;
              }
            }
      
            // Nothing found
            if (!found) {
              resultDiv.innerHTML = '<p>No matching results found.</p>';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
          });
      }
      
  
    function resetForm() {
      searchInput.value = '';
      resultDiv.innerHTML = '';
    }
  
  });
  