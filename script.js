document.addEventListener('DOMContentLoaded', function() {

    let currentCity ="الرياض";
    let cityToAPI = {  
        "القاهرة , مصر": { city: "Cairo", country: "Egypt" },
        "الرياض , السعودية": { city: "Riyadh", country: "Saudi Arabia" },
        "بغداد , العراق": { city: "Baghdad", country: "Iraq" },
        "دمشق , سوريا": { city: "Damascus", country: "Syria" },
        "الجزائر , الجزائر": { city: "Algiers", country: "Algeria"},
        "تونس , تونس": { city: "Tunis", country: "Tunisia"},
        "عمان , الاردن": { city: "Amman", country: "Jordan"},
        "القدس , فلسطين": { city: "Jerusalem", country: "Palestine"},
        "الكويت , الكويت": {city: "kuwait city", country: "Kuwait"},
        "المنامة , البحرين": { city: "Manama", country: "Bahrain"},
        "الدوحة , قطر": { city: "Doha", country: "Qatar"},
        "ابو ظبي , الامارات": { city: "Abu Dhabi", country: "UAE"},
        "مسقط , عمان": { city: "Muscat", country: "Oman"},
        "صنعاء , اليمن": { city: "Sana'a", country: "Yemen"},
        "طرابلس , ليبيا": { city: "Tripoli", country: "Libya"},
        "الرباط , المغرب": { city: "Rabat", country: "Morocco"},
        "نواكشوط , موريتانيا": { city: "Nouakchott", country: "Mauritania"},
        "الخرطوم , السودان": { city: "Khartoum", country: "Sudan"},
        "جيبوتي , جيبوتي": { city: "Djibouti", country: "Djibouti"},
        "مقد يشو , الصومال": { city: "Mogadishu", country: "Somalia"},
        "موروني , جزر القمر": { city: "Moroni", country: "Comoros"},
        "بيروت , لبنان": { city: "Beirut", country: "Lebanon"},
    };
    
    // Get elements
    let citySelect = document.getElementById('cities');
    let cityTitle = document.querySelector('h1');
    let dateElement = document.getElementById('date');
    
    // Format date in Arabic
    function formatArabicDate(date) {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar-sa', options);
    }
    
    function updatePrayerTimes(times) {
        let prayerTimes = {
            "الفجر": times.Fajr,
            "الشروق": times.Sunrise,
            "الظهر": times.Dhuhr,
            "العصر": times.Asr,
            "المغرب": times.Maghrib,
            "العشاء": times.Isha
        };
        
        let prayerElements = document.querySelectorAll('#prayer-name');
        for (let i = 0; i < prayerElements.length; i++) {
            let prayerName = prayerElements[i].textContent;
            if (prayerTimes[prayerName]) {
                prayerElements[i].nextElementSibling.textContent = prayerTimes[prayerName];
            }
        }
    }
    
    // Fetch prayer times from API using async/await
    async function fetchPrayerTimes(cityName) {
            let cityInfo = cityToAPI[cityName];
            if (!cityInfo) return;
            
            let today = new Date();
            dateElement.textContent = formatArabicDate(today);
            
            let day = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            
            let response = await fetch(
                `https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=${cityInfo.city}&country=${cityInfo.country}&method=5`
            );
            
            let data = await response.json();
            
            updatePrayerTimes(data.data.timings);
           
       
    }

    // Handle city selection change
    function handleCityChange() {
        currentCity = this.value;
        cityTitle.textContent = currentCity;
        fetchPrayerTimes(currentCity);
    }
    
    citySelect.addEventListener('change', handleCityChange);
    
    // Initialize with default city
    fetchPrayerTimes(currentCity);
});