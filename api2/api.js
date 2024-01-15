let searchInput = document.querySelector(".search-input");
let suggestions = document.querySelector('.suggestions');

const api = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let allData = []

fetch(api)
    .then(data => data.json())
    .then(data => allData.push(...data))

    // console.log(allData)

    function findState(keyword, datas){
        return datas.filter(data =>{
            let regex = new RegExp(keyword, 'gi');
            return data.state.match(regex);
        })
    }


    function getData() {
      let searchData = findState(this.value, allData);
  
      const uniqueData = new Set(searchData.map(place => {
          const regex = new RegExp(this.value, 'gi');
          const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
  
          return `
              <li class="state">
                  <span class="name">${stateName}</span>
              </li>
          `;
      }));

      
  
      const lastData = [...uniqueData].join('');

      suggestions.innerHTML = lastData;
      let states = document.querySelectorAll('.state');
      
      states.forEach(state =>{
        state.addEventListener("click", function(){
          searchInput.value = state.textContent;
          const uniqueCity = new Set(searchData.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    
            return `
                <li class="state">
                    <span class="name">${cityName}</span>
                </li>
            `;
        }));
  
        
    
        const citys = [...uniqueCity].join('');
  
        suggestions.innerHTML = citys;
          
        })
      })

  }


  

    searchInput.addEventListener("change", getData);
    searchInput.addEventListener("keyup", getData);


