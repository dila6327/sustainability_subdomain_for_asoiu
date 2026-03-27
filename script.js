// ===============================
// GLOBAL APP INITIALIZER
// ===============================

document.addEventListener("DOMContentLoaded", () => {
   

    // ✅ render cards on load
    initNavbar();
    initDropdowns();
    initSDGGrid();
    initHeroSlider();
    initNewsSlider();
    initFAQ();
    initActivitiesNews();
    initAlumniPage(); 
    initSustainabilityNews();
    initAllNewsPage();
    initArticlePage();
    initRecognizedCredits();
initApp();
    // ✅ attach filter button events
   
});


// ===============================
// NAVBAR (Mobile Toggle)
// ===============================

function initNavbar() {
    const menuToggle = document.getElementById("menuToggle");
    const navbarRows = document.querySelector(".navbar-rows");

    if (!menuToggle || !navbarRows) return;

    menuToggle.addEventListener("click", () => {
        const isHidden = navbarRows.classList.contains("mobile-hidden");
        navbarRows.classList.toggle("mobile-hidden");

        const icon = menuToggle.querySelector("i");

        if (isHidden) {
            icon.className = "fas fa-times";
            navbarRows.style.display = "block";
        } else {
            icon.className = "fas fa-bars";
            navbarRows.style.display = "none";
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navbarRows.classList.remove("mobile-hidden");
            navbarRows.style.display = "block";
            menuToggle.querySelector("i").className = "fas fa-bars";
        }
    });
}


// ===============================
// DROPDOWNS
// ===============================

function initDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");
    if (!dropdowns.length) return;

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector(".dropdown-trigger");
        const menu = dropdown.querySelector(".dropdown-menu");

        if (!btn || !menu) return;

        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const isOpen = menu.classList.contains("show");

            // Close all other dropdowns
            document.querySelectorAll(".dropdown").forEach(d => {
                const m = d.querySelector(".dropdown-menu");
                const b = d.querySelector(".dropdown-trigger");
                if (m && b) {
                    m.classList.remove("show");
                    b.classList.remove("show");
                }
            });

            // Toggle current dropdown
            if (!isOpen) {
                menu.classList.add("show");
                btn.classList.add("show");
            } else {
                menu.classList.remove("show");
                btn.classList.remove("show");
            }
        });

        menu.addEventListener("click", e => e.stopPropagation());
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown").forEach(d => {
            const m = d.querySelector(".dropdown-menu");
            const b = d.querySelector(".dropdown-trigger");
            if (m && b) {
                m.classList.remove("show");
                b.classList.remove("show");
            }
        });
    });
}


// ===============================
// SDG GRID
// ===============================

function initSDGGrid() {
    const sdgGrid = document.getElementById("sdgGrid");
    if (!sdgGrid) return;

    const sdgColors = {
        1:'#E5243B',2:'#DDA63A',3:'#4C9F38',4:'#C5192D',5:'#FF3A21',
        6:'#26BDE2',7:'#FCC30B',8:'#A21942',9:'#FD6925',10:'#DD1367',
        11:'#FD9D24',12:'#BF8B2E',13:'#3F7E44',14:'#0A97D9',15:'#56C02B',
        16:'#00689D',17:'#19486A'
    };

    const sdgTitles = {
        1:'No Poverty',2:'Zero Hunger',3:'Good Health and Well-Being',
        4:'Quality Education',5:'Gender Equality',
        6:'Clean Water and Sanitation',
        7:'Affordable and Clean Energy',
        8:'Decent Work and Economic Growth',
        9:'Industry, Innovation and Infrastructure',
        10:'Reduced Inequalities',
        11:'Sustainable Cities and Communities',
        12:'Responsible Consumption and Production',
        13:'Climate Action',
        14:'Life Below Water',
        15:'Life on Land',
        16:'Peace, Justice and Strong Institutions',
        17:'Partnerships for the Goals'
    };

    for (let i = 1; i <= 17; i++) {
        const item = document.createElement("a");
        item.href = `/sdgs/sdg${i}.html`;   
        item.className = "sdg-item";
        item.innerHTML = `
            <div class="sdg-badge" style="background:${sdgColors[i]}">${i}</div>
            <div class="sdg-title">${sdgTitles[i]}</div>
        `;
        sdgGrid.appendChild(item);
    }
}


// ===============================
// HERO SLIDER
// ===============================

function initHeroSlider() {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (!slides.length) return;

    let current = 0;

    function update(n) {
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        slides[n].classList.add("active");
        if (dots[n]) dots[n].classList.add("active");
    }

    function next() {
        current = (current + 1) % slides.length;
        update(current);
    }

    function prev() {
        current = (current - 1 + slides.length) % slides.length;
        update(current);
    }

    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            current = i;
            update(current);
        });
    });

    setInterval(next, 5000);
}


// ===============================
// HOMEPAGE NEWS CAROUSEL
// ===============================

function initNewsSlider() {
    const cards = document.querySelectorAll(".news-card");
    const carousel = document.getElementById("newsCarousel");
    const prevBtn = document.getElementById("newsNavPrev");
    const nextBtn = document.getElementById("newsNavNext");

    if (!cards.length || !carousel) return;

    let current = 0;
    const perView = 3;
    const max = Math.max(cards.length - perView, 0);

    function update() {
        const cardWidth = cards[0].offsetWidth + 24;
        carousel.style.transform = `translateX(${-current * cardWidth}px)`;

        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === max;
    }

    if (prevBtn) prevBtn.addEventListener("click", () => {
        if (current > 0) current--;
        update();
    });

    if (nextBtn) nextBtn.addEventListener("click", () => {
        if (current < max) current++;
        update();
    });

    update();
}


// ===============================
// FAQ
// ===============================

function initFAQ() {
    const questions = document.querySelectorAll(".faq-question");
    if (!questions.length) return;

    questions.forEach(q => {
        q.addEventListener("click", () => {
            const answer = q.nextElementSibling;
            const icon = q.querySelector(".faq-icon");

            answer.classList.toggle("show");
            if (icon) icon.classList.toggle("active");
        });
    });
}


// ===============================
// ACTIVITIES PAGE NEWS + FILTER + MODAL
// ===============================

function initActivitiesNews() {

    const grid = document.getElementById("newsGrid");
    if (!grid) return;

    const API_URL = "https://jsonplaceholder.typicode.com/p";

    const fallbackData = [
        { id:1,title:'ASOIU students have put forward an initiative to convert vegetable oils into biofuel',link:'https://asoiu.edu.az/single_news/3386',img:"https://asoiu.edu.az/upload/news/3680299e108a138ad072f99154c3b69b.JPG",content:`<p>To support "Sustainable Development Goals Month," students at the Azerbaijan State Oil and Industry University (ASOIU) have launched a circular economy initiative to collect used vegetable oil from the university cafeteria and hand it over to Bioropean LLC for conversion into eco-friendly biodiesel.</p>`, sdgs:[7,12,13]},
        { id:2,title:'ASOIU student successfully represented our country at an international exchange event',link:'https://asoiu.edu.az/single_news/3261',img:"https://asoiu.edu.az/upload/news/4ddfe8398da356b3307ec49a3582cda6.jpeg",content:`<p>Murad Qaramollayev, a third-year Mechatronics and Robotics Engineering student from the SABAH groups at Azerbaijan State Oil and Industry University (ASOIU), successfully represented the country through a scientific research presentation and poster session at the "Nature Conservation in the City" international exchange event held in Hannover, Germany.</p>`, sdgs:[11,15,4,9,17]},
        { id:3,title:'ASOIU startups presented at COP29',link:'https://asoiu.edu.az/single_news/2806',img:"https://asoiu.edu.az/upload/news/42f2f6c7383a53d901588bb1a6063b91.jpg",content:`<p>At the COP29 panel session titled "The Role of Innovative Environments in Universities and Green Technologies," the Azerbaijan State Oil and Industry University (ASOIU) showcased its commitment to climate action by presenting cutting-edge student startups, including a featured project on "Green Hydrogen and Its Storage Potential in Carbon Nanotubes."</p>`, sdgs:[7,9,13,17,4]},
        { id:4,title:'ASOIU students participate in excursion as part of COP29',link:'https://asoiu.edu.az/single_news/2761',img:"https://asoiu.edu.az/upload/news/09de9167bf2e8a0a76c8b4e49615bfb6.jpeg",content:`<p>The recent excursion to the Qaradagh Solar Power Plant provided ASOIU students with a firsthand look at Azerbaijan's rapidly expanding renewable energy infrastructure. By walking through one of the region's most significant solar projects, students bridged the gap between classroom theory and the industrial realities of large-scale power generation.</p>`, sdgs:[7,13,4]},
        { id:5,title:'ASOIU "Yukselish" Mentees Commemorate COP29 with Tree-Planting Initiative',link:'https://asoiu.edu.az/single_news/2638',img:"https://asoiu.edu.az/upload/news/4b9be989eecd5d62922e04fbabfaa970.jpeg",content:`<p>On June 11, the campus of the Azerbaijan State Oil and Industry University (ASOIU) grew a bit greener as students from the "Yukselish" competition mentorship program participated in a symbolic tree-planting ceremony. This event marks a practical contribution by the university's future leaders to the global climate agenda.</p>`, sdgs:[15,13,4]},
        { id:6,title:'ASOIU students represented the university at the "Food Safety Volunteers" initiative group conference',link:'https://asoiu.edu.az/single_news/2528',img:"https://asoiu.edu.az/upload/news/9a77a484246c4f8b5b2a860b5d04887e.jpg",content:`<p>ASOIU Food Engineering students and faculty recently participated in an AFSA "Food Safety Volunteers" conference, marking the culmination of a recruitment drive across six universities that saw nearly 100 successful applicants join the initiative group from a pool of over 700 candidates.</p>`, sdgs:[2,12,3]},
        { id:7,title:'ASOIUs Student Youth Organization members visited the Bilgah Elderly and Disabled House',link:'https://asoiu.edu.az/single_news/709',img:"https://asoiu.edu.az/upload/news//photos/shares/5bfdf8530d865.jpg",content:`<p>Students from Azerbaijan State Oil and Industry University and UFAZ, acting as "Green World Ambassadors," visited the Eco Park Innovation Center to learn about its transformation from an oil-contaminated site into a sustainable green space as part of the Green University initiative and support for COP29.</p>`, sdgs:[4,11,13,15]},
        { id:8,title:'ASOIU and UFAZ "Green World Ambassadors" visit "Eco Park" Innovation Center',link:'https://asoiu.edu.az/single_news/2645',img:"https://asoiu.edu.az/upload/news/3d038733c70ab7c49d1c71e8225f9237.jpeg",content:`<p>As part of the “Green University” project and in support of COP29 and the “Green World Solidarity Year,” ASOIU and UFAZ students visited the Eco Park Innovation Center, where they learned about its transformation from an oil-contaminated area into a green space with diverse and rare plants.</p>`, sdgs:[4,9,8]},
        { id:9,title:'Special privileges for socially vulnerable students and individuals with disabilities at ASOIU',link:'https://asoiu.edu.az/single_news/2512',img:"https://asoiu.edu.az/upload/news/7ac89b84853668459f580ab74d64336e.jpeg",content:`<p>At Azerbaijan State Oil and Industry University, special privileges for socially vulnerable students and individuals with disabilities reflect a strong commitment to inclusivity, equal opportunity, and accessible education, ensuring that every individual can fully participate in academic and professional life regardless of their circumstances.</p>`, sdgs:[4,10]},
        { id:10,title:'ASOIU Students Visit the Vegetable Research Institute',link:'https://asoiu.edu.az/single_news/3442',img:"https://asoiu.edu.az/upload/news/2cbd9f522440b6b589d77a8c44ce6322.jpeg",content:`<p>The academic visit organized by Azerbaijan State Oil and Industry University to the Vegetable Research Institute provided students with valuable practical insights into modern biotechnological, chemical, and agricultural research methods, ultimately enhancing their scientific knowledge and encouraging active engagement in future research activities.</p>`, sdgs:[2,4,9,3,12]},
    ];

    let newsData = [];
    let activeFilter = "all";

    async function getData() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("API failed");

            const data = await res.json();

            const mapped = data.slice(0, 12).map((item, index) => ({
                id: item.id,
                title: item.title,
                link: "#",
                img: "https://via.placeholder.com/400x300?text=ASOIU",
                content: `<p>${item.body}</p>`,
                sdgs: [(index % 16) + 1]
            }));

            localStorage.setItem("activitiesData", JSON.stringify(mapped));
            return mapped;

        } catch (err) {
            console.log("Using fallback activity data");
            localStorage.setItem("activitiesData", JSON.stringify(fallbackData));
            return fallbackData;
        }
    }

    function renderNews() {
        grid.innerHTML = "";

        newsData.forEach(item => {

            if (activeFilter !== "all" &&
                !item.sdgs.includes(parseInt(activeFilter))) return;

            const card = document.createElement("div");
            card.className = "news-card";

            card.innerHTML = `
                <div class="news-image">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="news-content">
                    <h3 class="news-title">${item.title}</h3>
                    <a href="#" class="read-more">Read More →</a>
                </div>
            `;

            card.querySelector(".read-more").addEventListener("click", (e) => {
                e.preventDefault();
                openModal(item);
            });

            grid.appendChild(card);
        });
    }

    const modal = document.getElementById("activityModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalLink = document.getElementById("modalLink");

    function openModal(item) {
        if (!modal) return;

        modalTitle.textContent = item.title;
        modalDescription.innerHTML = item.content || "<p>No content available.</p>";
        modalLink.href = item.link;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeModal();
        });
    }

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            activeFilter = btn.getAttribute("data-filter");
            renderNews();
        });
    });

    getData().then(data => {
        newsData = data;
        renderNews();
    });
}


// ===============================
// ALUMNI PAGE
// ===============================

function initAlumniPage() {

    const grid = document.getElementById("alumniGrid");
    if (!grid) return;

    const API_URL = "https://jsonplaceholder.typicode.com/us";

    const fallbackData = [
        { id: "ayaz-mutallibov", name: "Ayaz", surname: "Mutallibov", category: "domestic", position: "Former President of Azerbaijan", img: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Ayaz_Mutalibov_1992.jpg" },
        { id: "nariman-isayev", name: "Nariman", surname: "Isayev", category: "domestic", position: "Minister of Construction Materials Industry", img: "https://upload.wikimedia.org/wikipedia/az/b/b9/N%C9%99riman_%C4%B0sayev.jpg" },
        { id: "nasrulla-nasrullayev", name: "Nasrulla", surname: "Nasrullayev", category: "domestic", position: "Minister of Light Industry", img: "https://upload.wikimedia.org/wikipedia/az/thumb/d/d1/N%C9%99srulla_N%C9%99srullayev.jpg/250px-N%C9%99srulla_N%C9%99srullayev.jpg" },
        { id: "farid-musabayev", name: "Farid", surname: "Musabayev", category: "domestic", position: "Minister of Construction Materials Industry", img: "https://upload.wikimedia.org/wikipedia/az/thumb/8/8f/Farid_Musabayev.jpg/250px-Farid_Musabayev.jpg" }
    ];

    let alumniData = [];
    let activeFilter = "domestic";

    async function getData() {

        const stored = localStorage.getItem("alumniData");
        if (stored) return JSON.parse(stored);

        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("API failed");

            const data = await res.json();

            const mapped = data.slice(0, 8).map((user, index) => ({
                id: user.username.toLowerCase(),
                name: user.name.split(" ")[0],
                surname: user.name.split(" ")[1] || "",
                category: index % 2 === 0 ? "domestic" : "international",
                position: user.company.name,
                img: "https://via.placeholder.com/400x300?text=ASOIU+Alumni"
            }));

            localStorage.setItem("alumniData", JSON.stringify(mapped));
            return mapped;

        } catch (err) {
            console.warn("Using fallback alumni data");
            localStorage.setItem("alumniData", JSON.stringify(fallbackData));
            return fallbackData;
        }
    }

    function render() {

        grid.innerHTML = "";

        const filtered = alumniData.filter(a => a.category === activeFilter);

        if (!filtered.length) {
            grid.innerHTML = "<p>No alumni found.</p>";
            return;
        }

        filtered.forEach(a => {

            const card = document.createElement("a");
            card.href = `biography.html?id=${a.id}`;
            card.className = "news-card";

            card.innerHTML = `
                <img src="${a.img}" class="news-image">
                <div class="news-content">
                    <div class="news-title">${a.name} ${a.surname}</div>
                    <p class="news-pos">${a.position}</p>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            activeFilter = btn.id.includes("international")
                ? "international"
                : "domestic";

            render();
        });
    });

    getData().then(data => {
        alumniData = data;
        render();
    });
}


// ===============================
// SUSTAINABILITY NEWS
// ===============================

function initSustainabilityNews() {
    const container = document.getElementById("newsCardsContainer");
    const prevBtn = document.getElementById("newsNavPrev");
    const nextBtn = document.getElementById("newsNavNext");

    if (!container) return;

    const API_URL = "https://jsonplaceholder.typicode.com/posts";

    const fallbackData = [
        { id:1, title:"ASOIU Launches New Renewable Energy Lab", link:`article.html?id=1`, img:"https://asoiu.edu.az/upload/news/2791.jpg", content:"Cutting-edge facility dedicated to solar and wind energy research opens its...", category:"RESEARCH", date:"12-15-2025" },
        { id:2, title:"Sustainability Summit 2025", link:`article.html?id=2`, img:"https://asoiu.edu.az/upload/news/2791.jpg", content:"Global leaders gather to discuss climate action and sustainable development...", category:"EVENTS", date:"12-10-2025" },
        { id:3, title:"Student Green Initiative Winner", link:`article.html?id=3`, img:"https://asoiu.edu.az/upload/news/2639.jpg", content:"ASOIU students win international award for innovative campus sustainability...", category:"ACHIEVEMENT", date:"12-05-2025" },
        { id:4, title:"Partnership with Leading Energy Companies", link:`article.html?id=4`, img:"https://asoiu.edu.az/upload/news/2638.jpg", content:"ASOIU partners with global leaders to advance sustainable energy solutions", category:"PARTNERSHIP", date:"11-28-2025" },
    ];

    let newsData = [];

    async function getData() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("API failed");
            const data = await res.json();
            return data.slice(0,4).map((item,index)=>({
                id:item.id,
                title:item.title,
                link:item.id ? `article.html?id=${item.id}` : "#",
                img:item.image,
                content:item.body.length > 60 
                    ? item.body.substring(0, 60) + "..." 
                    : item.body,
                category:["RESEARCH","EVENTS","ACHIEVEMENT","PARTNERSHIP"][index],
                date: "2025-12-"+(15-index)
            }));
        } catch(err) {
            console.warn("Using fallback data");
            return fallbackData;
        }
    }

    function renderNews(news) {
        container.innerHTML = "";
        news.forEach(item=>{
            const card = document.createElement("div");
            card.className = "news-card";
            card.innerHTML = `
                <div class="news-image">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="news-header">
                    <span class="news-category">${item.category}</span>
                    <span class="news-date">${item.date}</span>
                </div>
                <div class="news-content">
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-description">${item.content}</p>
                    <a href="${item.link}" class="news-read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            container.appendChild(card);
        });

        initCarousel();
    }

    function initCarousel() {
        if (!container) return;

        const cards = container.querySelectorAll(".news-card");
        let current = 0;
        const perView = 3;
        const gap = 24;
        let autoSlideInterval;

        function update() {
            const cardWidth = cards[0].offsetWidth + gap;
            container.style.transition = "transform 0.5s ease";
            container.style.transform = `translateX(${-current * cardWidth}px)`;
        }

        function next() {
            current++;
            if(current > cards.length - perView) current = 0;
            update();
        }

        function prev() {
            current--;
            if(current < 0) current = cards.length - perView;
            update();
        }

        if(nextBtn) nextBtn.addEventListener("click", () => { next(); resetAutoSlide(); });
        if(prevBtn) prevBtn.addEventListener("click", () => { prev(); resetAutoSlide(); });

        function startAutoSlide() {
            autoSlideInterval = setInterval(next, 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
        window.addEventListener("resize", update);
        update();
    }

    getData().then(data=>{
        newsData = data;
        renderNews(newsData);
    });
}


// ===============================
// ALL NEWS PAGE
// ===============================

async function initAllNewsPage() {
    const gridContainer = document.getElementById("newsArchiveGrid");
    if (!gridContainer) return;

    const API_URL = "https://jsonplaceholder.typicode.com/posts";

    const manualData = [
        { 
            id: 1, 
            title: "ASOIU student successfully represented our ...", 
            date: "17.01.2026", 
            img: "https://asoiu.edu.az/upload/news/2791.jpg", 
            excerpt: "A third-year Mechatronics and Robotics Engineering student of the SABAH groups at ASOIU..." 
        },
        { 
            id: 2, 
            title: "ADNSU tələbələri WaterTech Bootcamp 2025 də iştirak etdi", 
            date: "17.01.2026", 
            img: "https://asoiu.edu.az/upload/news/2639.jpg", 
            excerpt: "Students of the Petroleum, Oil and Mining Faculty of the SABAH groups at ASOIU..." 
        },
        { 
            id: 3, 
            title: "ASOIU's \"HealWith\" startup presented at Innovation Expo", 
            date: "17.01.2026", 
            img: "https://asoiu.edu.az/upload/news/2638.jpg", 
            excerpt: "ASOIU's innovative startup 'HealWith' was presented at the Innovation Expo..." 
        }
    ];

    let newsData = [];
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        newsData = data.slice(0, 9).map(post => ({
            id: post.id,
            title: post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title,
            date: "17.01.2026",
            img: "https://via.placeholder.com/400x250?text=ASOIU+News",
            excerpt: post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body
        }));
    } catch (err) {
        console.warn("Fetch failed, using manual fallback data:", err);
        newsData = manualData;
    }

    gridContainer.innerHTML = "";
    newsData.forEach(item => {
        const card = document.createElement("div");
        card.className = "archive-card";
        card.innerHTML = `
            <a href="article.html?id=${item.id}" style="text-decoration: none; color: inherit;">
                <div class="archive-card-image">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="archive-card-content">
                    <span class="archive-date">${item.date}</span>
                    <h3 class="archive-title">${item.title}</h3>
                    <p class="archive-text">${item.excerpt}</p>
                    <span class="read-more-link" style="color: #ffc107; font-weight: bold;">Read More →</span>
                </div>
            </a>
        `;
        gridContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", initAllNewsPage);


// ===============================
// ARTICLE PAGE
// ===============================

async function initArticlePage() {
    const titleEl = document.getElementById('art-title');
    if (!titleEl) return; 

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return;

    const API_URL = "https://jsonplaceholder.typicode.com/posts";

    const fallbackNews = [
        { id: 1, title: "ASOIU Launches New Renewable Energy Lab", date: "17.01.2026", img: "https://via.placeholder.com/800x400?text=News", body: "Details about the renewable energy lab project at ASOIU..." },
        { id: 2, title: "ADNSU tələbələri WaterTech Bootcamp 2025də iştirak etdi", date: "16.01.2026", img: "https://via.placeholder.com/800x400?text=News", body: "Students participated in WaterTech Bootcamp 2025, learning innovative solutions..." },
        { id: 3, title: "ASOIU's \"HealWith\" startup presented at Innovation Expo", date: "15.01.2026", img: "https://via.placeholder.com/800x400?text=News", body: "ASOIU students showcased their startup 'HealWith' at the Innovation Expo..." }
    ];

    let apiData = [];
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network error");
        apiData = await response.json();
    } catch (err) {
        console.warn("API failed, using fallback data:", err);
    }

    const post = apiData.find(item => item.id == id) || fallbackNews[0];

    document.getElementById('art-title').innerText = post.title;
    document.getElementById('art-date').innerText = post.date || "17.01.2026";
    document.getElementById('art-image').src = post.img || "https://via.placeholder.com/800x400?text=ASOIU+News";
    document.getElementById('art-content').innerHTML = `<p>${post.body}</p>`;
    document.title = `${post.title} - ASOIU`;

    const sidebarList = document.getElementById("sidebar-list");
    if (sidebarList) {
        sidebarList.innerHTML = "";
        const latestNews = apiData.slice(0, 5);
        latestNews.forEach(item => {
            const link = document.createElement("a");
            link.href = `article.html?id=${item.id}`;
            link.className = "sidebar-item";
            link.innerHTML = `
                <img src="${item.img || 'https://via.placeholder.com/100x70'}" alt="${item.title}">
                <div class="sidebar-item-info">
                    <h4>${item.title}</h4>
                    <span>${item.date || "17.01.2026"}</span>
                </div>
            `;
            sidebarList.appendChild(link);
        });
    }
}




// ===============================
// APP INIT
// ===============================
function initApp() {
    initSidebar();
    initRouting();
}

// ===============================
// SIDEBAR TOGGLE
// ===============================
function initSidebar() {
    document.addEventListener("click", (e) => {
        const item = e.target.closest(".has-submenu");
        if (!item) return;

        e.stopPropagation();

        const arrow = item.querySelector(".arrow");
        const submenu = item.nextElementSibling;

        if (submenu) {
            submenu.style.display =
                submenu.style.display === "block" ? "none" : "block";

            if (arrow) arrow.classList.toggle("rotate");
        }
    });
}

// ===============================
// ROUTING
// ===============================


// ===============================
// LOAD CONTENT
// ===============================
async function loadContent(fileName, pushState = true) {
    const displayArea = document.getElementById("content-display");

    try {
        displayArea.innerHTML = `<p class="text">Loading...</p>`;

        const res = await fetch(fileName);
        if (!res.ok) throw new Error();

        const html = await res.text();
        displayArea.innerHTML = html;

        if (pushState) {
            history.pushState({ file: fileName }, "", `#${fileName.replace(".html", "")}`);
        }

        initDynamicContent(fileName);

        window.scrollTo({ top: 0 });
    } catch {
        displayArea.innerHTML = `
            <h1 class="title">Error</h1>
            <p class="text">Content not found</p>
        `;
    }
}

// ===============================
// DYNAMIC INIT
// ===============================
function initDynamicContent(fileName) {
    if (fileName === "courses_on_sustainability.html") {
        initCoursesPage();
    }
        if (fileName === "recognized_credits.html") {
        initRecognizedCreditsPage();
    }
}

// ===============================
// COURSES PAGE
// ===============================
function initCoursesPage() {
    renderCards(specialities);

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            const type = btn.dataset.type;

            if (type === "all") {
                renderCards(specialities);
            } else {
                renderCards(
                    specialities.filter(item => item.type === type)
                );
            }
        });
    });
}

// ===============================
// DATA
// ===============================
const specialities = [
    {name:"Chemical Engineering", sdgs:[12,7,13,6], sdgsupport:"ASOIU's Chemical Engineering specialty supports sustainability by teaching students to optimize resource efficiency through Material and Energy Balances. This supports SDG 12 by minimizing industrial waste, SDG 7 and SDG 13 by applying Thermodynamics to sustainable energy systems , and SDG 6 and SDG 3 by implementing advanced Separations and Chemical Process Safety.", pdfUrl:"https://asoiu.edu.az/upload/CHEMICAL%20ENGINEERING%20PROGRAM%20CURRICULUM.pdf",type:"asoiu-bachelor"},
    {name:"Computer Engineering", sdgs:[13,12,9], sdgsupport:"ASOIU's Computer Engineering specialty supports sustainability by teaching students to design energy-efficient hardware and optimize software systems to reduce carbon footprints. This supports SDG 12 (Responsible Consumption and Production) and SDG 13 (Climate Action) by minimizing the energy and material usage of IT infrastructure through courses like Computer Architecture and HOSEP (Health, Occupational Safety, and Environmental Protection). Additionally, it advances SDG 9 (Industry, Innovation, and Infrastructure) by promoting technological breakthroughs in fields such as Artificial Intelligence, Internet of Things, and Cloud Technologies",  pdfUrl:"https://asoiu.edu.az/information_technologies_and_control/upload/syllabus/050620_ENG.pdf",type:"asoiu-bachelor"},
    {name:"Food Engineering", sdgs:[2,12,3,9], sdgsupport:"ASOIU's Food Engineering specialty supports sustainability by teaching students to optimize food production processes and ensure high standards of safety and nutrition. This supports SDG 12 (Responsible Consumption and Production) by minimizing food waste through advanced cooling and storage technologies, and SDG 2 (Zero Hunger) and SDG 3 (Good Health and Well-being) by focusing on food microbiology, biochemistry, and safety. Additionally, it advances SDG 9 (Industry, Innovation, and Infrastructure) by training students in technological design and project management within the food industry.", pdfUrl:"https://asoiu.edu.az/chemical_technology_faculty/upload/syllabus/050635-ENG.pdf", type:"asoiu-bachelor"},
    {name:"Logistics and Transport Technology Engineering", sdgs:[11,13,12,9], sdgsupport:"ASOIU's Logistics and Transport Technologies Engineering specialty supports sustainability by teaching students to design efficient supply chains and implement eco-friendly transportation solutions. This supports SDG 11 (Sustainable Cities and Communities) and SDG 13 (Climate Action) by reducing the environmental impact of transit through courses like Transport Ecology and Traffic Safety. Furthermore, it advances SDG 9 (Industry, Innovation, and Infrastructure) and SDG 12 (Responsible Consumption and Production) by optimizing resource allocation and logistics processes in subjects such as Transport Logistics and Basics of Management in Logistics Systems.", pdfUrl:"file:///C:/Users/Admin/OneDrive/Desktop/050621_ENG.pdf", type:"asoiu-bachelor"},
    {name:"Mechanical Engineering", sdgs:[13,12,9,7], sdgsupport:"ASOIU's Mechanical Engineering specialty supports sustainability by teaching students to develop efficient machinery and optimize manufacturing processes to reduce resource consumption. This supports SDG 12 (Responsible Consumption and Production) and SDG 9 (Industry, Innovation, and Infrastructure) through core training in Machine Design and Manufacturing Technologies. Additionally, it advances SDG 7 (Affordable and Clean Energy) and SDG 13 (Climate Action) by focusing on energy-efficient systems in courses such as Thermodynamics and HSE (Health, Safety, and Environment)", pdfUrl:"https://asoiu.edu.az/oil_mechanical_engineering/upload/syllabus/050628_ENG.pdf", type:"asoiu-bachelor"},
    {name:"Mechatronics and Robotics Engineering", sdgs:[11,12,9,7], sdgsupport:"ASOIU's Mechatronics and Robotics Engineering specialty supports sustainability by teaching students to design intelligent autonomous systems and energy-efficient automated processes. This supports SDG 9 (Industry, Innovation, and Infrastructure) by fostering advanced technological innovation and SDG 12 (Responsible Consumption and Production) by optimizing resource use through precision robotics. Additionally, it advances SDG 7 (Affordable and Clean Energy) and SDG 11 (Sustainable Cities and Communities) by developing smart systems that improve energy management and urban automation", pdfUrl:"https://asoiu.edu.az/information_technologies_and_control/upload/pdf/Mexatronika%20v%C9%99%20robototexnika%20m%C3%BCh%C9%99ndisliyi.pdf", type:"asoiu-bachelor"},
    {name:"Engineering Physics", sdgs:[13,12,7], sdgsupport:"ASOIU's Engineering Physics specialty supports sustainability by teaching students to apply fundamental physical principles to the development of advanced materials and energy systems. This supports SDG 7 (Affordable and Clean Energy) and SDG 13 (Climate Action) through coursework in Thermodynamics and the study of functional and nanomaterials for energy applications. Additionally, the program advances SDG 9 (Industry, Innovation, and Infrastructure) and SDG 12 (Responsible Consumption and Production) by focusing on the technology of non-metallic materials and implementing Health, Safety, and Environment (HSE) standards in industrial research", pdfUrl:"https://asoiu.edu.az/power_engineering/upload/syllabus/050630_ENG.pdf", type:"asoiu-bachelor"},
    {name:"Oil and Gas Engineering", sdgs:[13,12,9,7], sdgsupport:"ASOIU's Oil and Gas Engineering specialty supports sustainability by teaching students to implement efficient extraction techniques and manage environmental risks in the energy sector. This supports SDG 7 (Affordable and Clean Energy) and SDG 13 (Climate Action) by focusing on the transition to more sustainable resource management and lowering the carbon footprint of energy production. Additionally, it advances SDG 12 (Responsible Consumption and Production) and SDG 9 (Industry, Innovation, and Infrastructure) through core training in Quality, Health, Safety, and Environment (QHSE) and advanced project management.", pdfUrl:"https://asoiu.edu.az/oil_and_gas_production/upload/syllabus/050631_ENG.pdf", type:"asoiu-bachelor"},
    {name:"Electrical and Electronics Engineering", sdgs:[7,13,9,12], sdgsupport:"ASOIU's Electrical and Electronics Engineering specialty supports sustainability by teaching students to design efficient power systems and develop advanced electronic technologies. This supports SDG 7 (Affordable and Clean Energy) and SDG 13 (Climate Action) by optimizing energy conversion and distribution through courses like Electrical Machines, Power Electronics, and High Voltage Engineering. Additionally, it advances SDG 9 (Industry, Innovation, and Infrastructure) and SDG 12 (Responsible Consumption and Production) by integrating Health, Safety, and Environment (HSE) standards and quality control into the development of sustainable industrial automation and microelectronics.", pdfUrl:"https://asoiu.edu.az/power_engineering/upload/syllabus/050607_ENG_4.pdf", type:"asoiu-bachelor"},
 {name:"Energy Engineering", sdgs:[7,13,9,12], sdgsupport:"ASOIU's Energy Engineering specialty supports sustainability by teaching students to optimize power generation and implement efficient energy distribution systems. This supports SDG 7 (Affordable and Clean Energy) and SDG 13 (Climate Action) through core coursework in Thermodynamics, Heat Engineering, and Electrical Machines that focus on reducing energy loss. Additionally, it advances SDG 9 (Industry, Innovation, and Infrastructure) and SDG 12 (Responsible Consumption and Production) by integrating Industrial Safety and Labor Protection (HSE) standards into the management of large-scale energy projects.", pdfUrl:"https://asoiu.edu.az/information_technologies_and_control/upload/syllabus/050608_ENG_1-2.pdf", type:"asoiu-bachelor"},
{name:"Geology and Geophysics Engineering", sdgs:[7,12,13,15], sdgsupport:"ASOIU's Geological and Geophysical Engineering specialty supports sustainability by teaching students to responsibly manage Earth's natural resources and assess environmental risks. This supports SDG 12 (Responsible Consumption and Production) and SDG 15 (Life on Land) through coursework in Hydrogeology, Geochemistry, and Mineralogy that focuses on the protection of soil and water systems. Additionally, it advances SDG 7 (Affordable and Clean Energy) and SDG 13 (Climate Action) by applying Seismic and Electrical exploration techniques to the discovery of sustainable energy resources and the monitoring of geodynamic hazards.", pdfUrl:"https://asoiu.edu.az/upload/GEOLOGICAL%20AND%20GEOPHYSICAL%20ENGINEERING%20CURRICULUM%20PROGRAM.pdf", type:"asoiu-bachelor"},
{name:"Life and Safety Engineering", sdgs:[3,8,11,12], sdgsupport:"ASOIU's Life Safety Engineering specialty supports sustainability by teaching students to protect human life, property, and the environment through rigorous safety management and risk assessment. This supports SDG 3 (Good Health and Well-being) and SDG 8 (Decent Work and Economic Growth) by utilizing training in Occupational Health and Safety, Ergonomics, and Engineering Psychology to ensure safe working conditions. Additionally, it advances SDG 11 (Sustainable Cities and Communities) and SDG 12 (Responsible Consumption and Production) by focusing on Fire Safety, Emergency Management, and the technical security bases required for resilient industrial and urban infrastructure.", pdfUrl:"https://asoiu.edu.az/oil_and_gas_production/upload/syllabus/050614_ENG.pdf", type:"asoiu-bachelor"},
{name:"Information Technology", sdgs:[9,11,12,13], sdgsupport:"ASOIU's Information Technology specialty supports sustainability by teaching students to develop high-performance computing solutions and secure, data-driven architectures. This supports SDG 9 (Industry, Innovation, and Infrastructure) and SDG 11 (Sustainable Cities and Communities) through coursework in Cyber-physical Systems, Neural Networks, and Cloud Computing that enables smart urban infrastructure. Additionally, it advances SDG 12 (Responsible Consumption and Production) and SDG 13 (Climate Action) by integrating HOSEP (Health, Occupational Safety, and Environmental Protection) and Project Management to ensure the sustainable lifecycle and energy efficiency of digital technologies.", pdfUrl:"https://asoiu.edu.az/information_technologies_and_control/upload/syllabus/050616_ENG.pdf", type:"asoiu-bachelor"},
 {name:"Information Security", sdgs:[9,16,12,13], sdgsupport:"ASOIU's Information Security Engineering specialty supports sustainability by teaching students to build resilient digital infrastructures and protect critical data systems from cyber threats. This supports SDG 9 (Industry, Innovation, and Infrastructure) and SDG 16 (Peace, Justice, and Strong Institutions) through coursework in Network Security, Cryptography, and Cyber-physical Systems that ensure the stability of modern society. Additionally, it advances SDG 12 (Responsible Consumption and Production) and SDG 13 (Climate Action) by incorporating HOSEP (Health, Occupational Safety, and Environmental Protection) and Project Management to optimize the energy efficiency and sustainable management of secure information systems.",pdfUrl:"https://asoiu.edu.az/information_technologies_and_control/upload/syllabus/050615_ENG_2020.pdf", type:"asoiu-bachelor"},
 {name:"Civil Engineering", sdgs:[11,9,12,13], sdgsupport:"ASOIU's Civil Engineering specialty supports sustainability by teaching students to design resilient infrastructure and implement environmentally conscious construction practices. This supports SDG 11 (Sustainable Cities and Communities) and SDG 9 (Industry, Innovation, and Infrastructure) through core coursework in Building Structures, Reinforced Concrete Structures, and Construction Technology. Additionally, the program advances SDG 12 (Responsible Consumption and Production) and SDG 13 (Climate Action) by focusing on resource efficiency and environmental safety in courses such as Water Supply and Wastewater Systems, Hydrology, and Health, Labor Safety, and Environmental Protection (HSE).",pdfUrl:"http://asoiu.edu.az/oil_and_gas_production/upload/syllabus/050617-ENG.pdf", type:"asoiu-bachelor"},
 {name:"Process Automation engineering", sdgs:[9,12,7,13], sdgsupport:"ASOIU's Process Automation Engineering specialty supports sustainability by teaching students to design and implement intelligent control systems that maximize industrial efficiency and minimize waste. This supports SDG 9 (Industry, Innovation, and Infrastructure) and SDG 12 (Responsible Consumption and Production) through core coursework in Automated Control Systems, Microprocessor Systems, and Metrology. Additionally, it advances SDG 7 (Affordable and Clean Energy) and SDG 13 (Climate Action) by applying Modeling and Simulation to optimize energy consumption in complex industrial processes, while integrating Health, Safety, and Environment (HSE) and Project Management to ensure sustainable operational lifecycles.",pdfUrl:"https://asoiu.edu.az/information_technologies_and_control/upload/syllabus/050634_ENG.pdf", type:"asoiu-bachelor"},
{name:"Industrial Engineering", sdgs:[9,12,8,13], sdgsupport:"ASOIU's Industrial Engineering specialty supports sustainability by teaching students to design, improve, and install integrated systems of people, materials, and energy to maximize productivity and reduce waste. This supports SDG 9 (Industry, Innovation, and Infrastructure) and SDG 12 (Responsible Consumption and Production) through core coursework in Operations Research, Supply Chain Management, and Quality Control. Additionally, it advances SDG 8 (Decent Work and Economic Growth) and SDG 13 (Climate Action) by focusing on Ergonomics, Occupational Health and Safety, and the thermodynamic optimization of industrial processes to ensure both human well-being and environmental efficiency.",pdfUrl:"https://asoiu.edu.az/oil_mechanical_engineering/upload/pdf/S%C9%99naye%20m%C3%BCh%C9%99ndisliyi%20050638-2020.pdf", type:"asoiu-bachelor"},
 {name:"Geology", sdgs:[15,12,13,9], sdgsupport:"ASOIU's Geology specialty supports sustainability by providing a fundamental understanding of Earth’s structure and processes to manage natural resources and mitigate environmental hazards. This supports SDG 15 (Life on Land) and SDG 12 (Responsible Consumption and Production) through the study of Mineralogy, Petrology, and Sedimentology, which are crucial for the sustainable extraction of raw materials. Additionally, it advances SDG 13 (Climate Action) and SDG 6 (Clean Water and Sanitation) by focusing on Historical Geology and Geomorphology to understand environmental changes and protect groundwater resources. The curriculum's emphasis on General and Structural Geology also contributes to SDG 9 (Industry, Innovation, and Infrastructure) by enabling the safe and resilient development of geological projects.",pdfUrl:"https://asoiu.edu.az/geological_exploration/upload/pdf/050506%20-%20Geologiya..pdf", type:"asoiu-bachelor"},
{name:"Computer Science", sdgs:[4,9,16], sdgsupport:"ASOIU's Computer Science specialty supports sustainability by teaching students to design efficient algorithms and robust software architectures that optimize digital infrastructure. This supports SDG 9 (Industry, Innovation, and Infrastructure) and SDG 4 (Quality Education) through core coursework in Algorithms and Data Structures, Operating Systems, and Software Engineering. Additionally, the program advances SDG 12 (Responsible Consumption and Production) and SDG 16 (Peace, Justice, and Strong Institutions) by integrating training in Information Security, Cloud Computing, and Project Management to ensure the secure and sustainable lifecycle of information systems.",pdfUrl:"https://asoiu.edu.az/information_technologies_and_control/upload/syllabus/050509_ENG.pdf", type:"asoiu-bachelor"},
  {name:"Instrumentation Engineering", sdgs:[7,9,12,13], sdgsupport:"ASOIU's Instrumentation Engineering specialty supports sustainability by teaching students to develop high-precision monitoring systems and intelligent diagnostic tools. This supports SDG 9 (Industry, Innovation, and Infrastructure) and SDG 12 (Responsible Consumption and Production) through core coursework in Microprocessor Systems, Information-Measuring Systems, and Metrology. Additionally, the program advances SDG 13 (Climate Action) and SDG 7 (Affordable and Clean Energy) by focusing on Environmental Monitoring Systems and Devices, and the application of Machine Learning and Deep Learning to optimize resource efficiency, while integrating HSE (Health, Safety, and Environment) and Project Management to ensure sustainable industrial operations.",pdfUrl:"https://asoiu.edu.az/information_technologies_and_control/upload/syllabus/050604_ENG.pdf", type:"asoiu-bachelor"},
  {name:"Ecological Engineering", sdgs:[13,15,6,12,9], sdgsupport:"ASOIU's Ecological Engineering specialty supports sustainability by teaching students to develop technical solutions for environmental protection and resource management. This directly supports SDG 13 (Climate Action) and SDG 15 (Life on Land) through coursework in Ecology, Environmental Monitoring, and the Utilisation and Processing of Industrial Waste. Additionally, the program advances SDG 6 (Clean Water and Sanitation) and SDG 12 (Responsible Consumption and Production) by focusing on Water Resources Protection and the implementation of SƏTƏMM (Health, Safety, and Environmental Protection) standards. The curriculum also contributes to SDG 9 (Industry, Innovation, and Infrastructure) by training students in Environmental Impact Assessment and the design of sustainable engineering systems.",pdfUrl:"https://asoiu.edu.az/chemical_technology_faculty/upload/syllabus/050606_ENG.pdf", type:"asoiu-bachelor"},
 {name:"Oil and Gas Field Development", sdgs:[7,12,13], sdgsupport:"ASOIU's Field Development specialty supports sustainability by teaching efficient resource extraction, environmental management, and low-carbon operational practices in energy production.",pdfUrl:"", type:"asoiu-master"},
 {name:"Offshore Oil, Gas and Gas-Condensate Field Development", sdgs:[14,13,12], sdgsupport:"ASOIU's Offshore Field Development specialty supports sustainability by training students in environmentally conscious offshore energy production, preventing marine ecosystem damage, reducing environmental footprint, and supporting low-carbon offshore operations.",pdfUrl:"", type:"asoiu-master"},
 {name:"Nanotechnology in Oil and Gas Extraction", sdgs:[9,12,13], sdgsupport:"ASOIU's Nanotechnology specialty supports sustainability by applying innovative, energy-efficient materials and processes that reduce chemical waste in oil and gas extraction.",pdfUrl:"", type:"asoiu-master"},
 {name:"Mining and Resource Development", sdgs:[13,12,9,15], sdgsupport:"ASOIU's Resource Development specialty supports sustainability by training students in responsible extraction methods that minimize environmental impact and promote efficient resource use.",pdfUrl:"", type:"asoiu-master"},
 {name:"Materials Science and Materials Technology", sdgs:[9,12,13], sdgsupport:"ASOIU's Materials Science specialty supports sustainability by providing students with the knowledge and skills to develop eco-friendly, recyclable, and energy-efficient materials for industrial applications.",pdfUrl:"", type:"asoiu-master"},
 {name:"Hydraulic Systems of Oil-Mining Equipment", sdgs:[9,12,13], sdgsupport:"ASOIU's Hydraulic Systems specialty supports sustainability by teaching students to design and operate energy-efficient hydraulic systems, reducing environmental impact and resource consumption.",pdfUrl:"", type:"asoiu-master"},
 {name:"Restoration and Strengthening of Equipment", sdgs:[12,13,9], sdgsupport:"ASOIU's Equipment Restoration specialty supports sustainability by training students to extend the life of industrial machinery, reduce waste, and adopt circular economy principles.",pdfUrl:"", type:"asoiu-master"},
 {name:"Machinery and Equipment for Oil and Gas Production", sdgs:[12,9], sdgsupport:"ASOIU's Oil-Gas Machinery specialty supports sustainability by training students to design and operate energy-efficient extraction equipment that minimizes environmental impact, reduces waste, and optimizes resource use.",pdfUrl:"", type:"asoiu-master"},
 {name:"Machinery for Oil Refining and Oil Production", sdgs:[13,12,9], sdgsupport:"ASOIU's Refining Machinery specialty supports sustainability by preparing students to optimize industrial processes, reduce emissions, and decrease waste in chemical and oil refining.",pdfUrl:"", type:"asoiu-master"},
 {name:"Oil-Gas Mining Geology", sdgs:[9,12], sdgsupport:"ASOIU's Oil-Gas-Mining Geology specialty supports sustainability by educating students on responsible mining and geological survey methods, helping minimize environmental impact and optimize resource use.",pdfUrl:"", type:"asoiu-master"},
 {name:"Hydrogeology", sdgs:[6,13,15], sdgsupport:"ASOIU's Hydrogeology specialty supports sustainability by focusing on sustainable groundwater monitoring, management, and protection, contributing directly to environmental sustainability and climate-resilient water systems.",pdfUrl:"", type:"asoiu-master"},
 {name:"Geophysical Methods for Oil-Gas Exploration", sdgs:[7,12,13], sdgsupport:"ASOIU's Geophysical Exploration specialty supports sustainability by teaching non-invasive, energy-efficient exploration methods that minimize environmental impact.",pdfUrl:"", type:"asoiu-master"},
 {name:"Robotics and Robotics Systems", sdgs:[13,12,9], sdgsupport:"ASOIU's Robotics specialty supports sustainability by equipping students to design energy-efficient and environmentally friendly robotic systems for industry and research, decreasing energy consumption and emissions in robotic operations.",pdfUrl:"", type:"asoiu-master"},
 {name:"Artifical Intelligence", sdgs:[13,12,9], sdgsupport:"ASOIU's AI specialty supports sustainability by preparing students to apply AI in energy optimization, environmental monitoring, and sustainable industrial processes, reducing environmental impact through smarter processes.",pdfUrl:"", type:"asoiu-master"},
 {name:"Applied Mathematics", sdgs:[13,12,6], sdgsupport:"ASOIU's Applied Mathematics specialty supports sustainability by teaching students to model environmental processes, climate scenarios, and resource management for sustainable solutions.",pdfUrl:"", type:"asoiu-master"},
 {name:"Informatics", sdgs:[13,12,9], sdgsupport:"ASOIU's Informatics specialty supports sustainability by training students to develop data-driven solutions for environmental monitoring, energy efficiency, and sustainable computing.",pdfUrl:"", type:"asoiu-master"},
 {name:"Mobile App Development and Game Design", sdgs:[13,12,4], sdgsupport:"ASOIU's Mobile App Development specialty supports sustainability by teaching students to create applications for environmental awareness, climate education, and sustainable behavior promotion",pdfUrl:"", type:"asoiu-master"},
 {name:"Computer Engineering", sdgs:[13,12,9], sdgsupport:"ASOIU's Computer Engineering specialty supports sustainability by preparing students to design energy-efficient computing systems and sustainable technology solutions.",pdfUrl:"", type:"asoiu-master"},
 {name:"Informations Systems in Management", sdgs:[13,12,9], sdgsupport:"ASOIU's Information Systems specialty supports sustainability by teaching students to optimize organizational processes, manage resources responsibly, and implement sustainable strategies.",pdfUrl:"", type:"asoiu-master"},
 {name:"Mechanics and Strength of Special Oil-Mining Equipment", sdgs:[13,12,9], sdgsupport:"ASOIU's Equipment Mechanics specialty supports sustainability by teaching students to design durable machinery, reducing the need for frequent replacements and lowering material consumption.",pdfUrl:"", type:"asoiu-master"},
 {name:"Computer-Based Measurement and Information Technologies", sdgs:[13,12,9], sdgsupport:"ASOIU's Measurement Technologies specialty supports sustainability by training students to monitor and optimize industrial processes, reducing energy use and material waste.",pdfUrl:"", type:"asoiu-master"},
{name:"Electronics and Automation", sdgs:[12,13,9], sdgsupport:"ASOIU's Electronics and Automation specialty supports sustainability by teaching students to develop energy-efficient automated systems that reduce waste and improve industrial sustainability.",pdfUrl:"", type:"asoiu-master"},
{name:"BioTechnical and Medical Devices and Systems", sdgs:[3,12,9], sdgsupport:"ASOIU's Biotech Devices specialty supports sustainability by preparing students to design environmentally responsible medical devices that minimize waste and promote health.",pdfUrl:"", type:"asoiu-master"},
{name:"Automation of Technological Processes and Production", sdgs:[13,12,9], sdgsupport:"ASOIU's Automation specialty supports sustainability by teaching students to implement low-waste, energy-efficient production systems that reduce industrial impact.",pdfUrl:"", type:"asoiu-master"},
{name:"Energy Management", sdgs:[13,12,7], sdgsupport:"ASOIU's Energy Management specialty supports sustainability by training students in energy efficiency, sustainable energy planning, and low-carbon technologies.",pdfUrl:"", type:"asoiu-master"},
{name:"Reliability and Operational Efficiency of Offshore Oil-Gas Installations", sdgs:[14,9,13], sdgsupport:"ASOIU's Offshore Reliability specialty supports sustainability by teaching students to operate marine installations safely and efficiently, minimizing environmental risk.", pdfUrl:"",type:"asoiu-master"},
{name:"Electrical Power Engineering", sdgs:[7,9,13], sdgsupport:"ASOIU's Electrical Power Engineering specialty supports sustainability by teaching energy-efficient generation, renewable energy integration, and sustainable electricity system design.",pdfUrl:"", type:"asoiu-master"},
{name:"Automation and Electrical Devices of Industrial Systems", sdgs:[9,12,13], sdgsupport:"ASOIU's Industrial Automation specialty supports sustainability by designing energy-efficient automated industrial systems that reduce waste and environmental impact.",pdfUrl:"", type:"asoiu-master"},
{name:"High Voltage Engineering and Physics", sdgs:[7,9,13], sdgsupport:"ASOIU's High Voltage Engineering specialty supports sustainability by improving electricity transmission efficiency, integrating renewable energy, and reducing energy losses.",pdfUrl:"", type:"asoiu-master"},
{name:"Thermal Power Plants", sdgs:[7,9,13], sdgsupport:"ASOIU's Thermal Power Plants specialty supports sustainability by teaching efficient thermal generation, emission reduction, and heat recovery methods.",pdfUrl:"", type:"asoiu-master"},
{name:"Renewable Energy Sources", sdgs:[7,9,13], sdgsupport:"ASOIU's Renewable Energy specialty directly supports sustainability by teaching solar, wind, hydro, and bioenergy systems, reducing carbon emissions and promoting clean energy transition.",pdfUrl:"", type:"asoiu-master"},
{name:"Solid Waste Processing Technology", sdgs:[13,12,11], sdgsupport:"ASOIU's Solid Waste Processing specialty supports sustainability by training students in sustainable waste management, recycling, and resource recovery practices.",pdfUrl:"", type:"asoiu-master"},
{name:"Metrology and Measurement Assurance", sdgs:[13,12,9], sdgsupport:"ASOIU's Metrology specialty supports sustainability by teaching students to monitor industrial and energy processes accurately for efficiency and environmental compliance.",pdfUrl:"", type:"asoiu-master"},
{name:"Quality Control, Diagnostic Methods and Systems", sdgs:[13,12,9], sdgsupport:"ASOIU's Quality Control specialty supports sustainability by preparing students to monitor industrial processes for environmental responsibility and compliance.",pdfUrl:"", type:"asoiu-master"},
{name:"Safety of Technological Processes in Emergencies", sdgs:[12,13,9], sdgsupport:"ASOIU's Safety specialty supports sustainability by training students in risk management, environmentally safe industrial operations, and disaster resilience.",pdfUrl:"", type:"asoiu-master"},
{name:"Economics and Management of Production and Services", sdgs:[13,12,8], sdgsupport:"ASOIU's Economics and Management specialty supports sustainability by teaching students to plan resource-efficient production, implement sustainable strategies, and make environmentally responsible decisions.", pdfUrl:"",type:"asoiu-master"},
{name:"Management", sdgs:[13,12,8], sdgsupport:"ASOIU's Management specialty supports sustainability by training students to integrate sustainable decision-making, corporate social responsibility, and resource-efficient practices into organizations.",pdfUrl:"", type:"asoiu-master"},
{name:"Business Organization and Management", sdgs:[13,12,8], sdgsupport:"ASOIU's Business specialty supports sustainability by preparing students to operate environmentally conscious businesses and implement sustainable strategies.",pdfUrl:"", type:"asoiu-master"},
{name:"Oil-Chemical Sythesis Technology", sdgs:[13,12,9], sdgsupport:"ASOIU's Oil-Chemical Synthesis specialty supports sustainability by preparing students to develop low-waste chemical processes and environmentally responsible production methods.",pdfUrl:"", type:"asoiu-master"},
{name:"Inorganic Material Production Technology", sdgs:[13,12,9], sdgsupport:"ASOIU's Inorganic Material Technology specialty supports sustainability by training students to produce non-organic chemicals and materials using environmentally conscious techniques.",pdfUrl:"", type:"asoiu-master"},
{name:"Oil Refining Technology", sdgs:[13,12,7], sdgsupport:"ASOIU's Oil Refining specialty supports sustainability by equipping students with knowledge of energy-efficient, low-emission refining technologies.",pdfUrl:"", type:"asoiu-master"},
{name:"HydroCarbon Gas Processing Technology", sdgs:[13,12,7], sdgsupport:"ASOIU's Gas Processing specialty supports sustainability by preparing students to implement sustainable, energy-efficient gas processing methods.",pdfUrl:"", type:"asoiu-master"},
{name:"Polymer Chemical Technology", sdgs:[13,12,9], sdgsupport:"ASOIU's Polymer Technology specialty supports sustainability by training students to synthesize environmentally friendly, recyclable polymers.",pdfUrl:"", type:"asoiu-master"},
{name:"Processing of Polimers and Composite Materials", sdgs:[13,12,9], sdgsupport:"ASOIU's Polymer Processing specialty supports sustainability by preparing students to manufacture polymers and composites using sustainable, low-impact methods.",pdfUrl:"", type:"asoiu-master"},
{name:"Chemical Technology Processes and Equipment", sdgs:[13,12,9], sdgsupport:"ASOIU's Chemical Technology specialty supports sustainability by teaching students to develop energy-efficient, low-waste chemical production processes.", type:"asoiu-master"},
{name:"Environmental and Oil Industry", sdgs:[13,12,9], sdgsupport:"ASOIU's Environment and Oil Industry specialty supports sustainability by preparing students to implement pollution control, environmental management, and sustainable industrial practices.", pdfUrl:"",type:"asoiu-master"},

{name:"Computer Science", sdgs:[13,12,9,3], sdgsupport:"UFAZ’s Computer Science program drives sustainability by training students in AI, software engineering, and cybersecurity, which are essential for building resilient digital infrastructure and optimizing resource use (SDG 9 and 12). The curriculum’s applications in healthcare and genome research directly support global well-being (SDG 3), while its focus on data science and automation helps reduce the carbon footprint of modern industry (SDG 13)", pdfUrl:"https://www.ufaz.az/en/academic-offer/undergraduate-programs/bsc-computer-science/",type:"ufaz-bachelor"},
{name:"Chemical Engineering", sdgs:[9,12,13], sdgsupport:"UFAZ’s Chemical Engineering program supports sustainability by training students to optimize industrial processes for maximum efficiency and safety, directly advancing SDG 9 and 12. By utilizing advanced simulation tools to reduce waste and energy consumption, the curriculum prepares graduates to lead environmental engineering and green chemistry initiatives (SDG 13).",pdfUrl:"https://www.ufaz.az/en/academic-offer/undergraduate-programs/bsc-chemical-engineering/", type:"ufaz-bachelor"},
{name:"Chemistry", sdgs:[9,12,13], sdgsupport:"UFAZ’s Chemistry program supports sustainability by providing advanced training in chemical analysis and experimental protocols, which are essential for developing sustainable materials and reducing industrial waste (SDG 9 and 12). Through its focus on environmental chemistry and biotechnology, the curriculum prepares graduates to address ecological challenges and promote resource efficiency (SDG 13). ",pdfUrl:"https://www.ufaz.az/en/academic-offer/undergraduate-programs/chemistry/", type:"ufaz-bachelor"},
{name:"Petroleum Engineering and Reservoir Geology", sdgs:[9,12,13], sdgsupport:"UFAZ’s Petroleum Engineering & Reservoir Geology program supports sustainability by optimizing hydrocarbon extraction through advanced reservoir evaluation and drilling technologies that prioritize environmental safety (SDG 9 and 12). The curriculum’s emphasis on production monitoring and safety engineering, taught by international industry experts, ensures the prevention of environmental hazards during energy production (SDG 13).",pdfUrl:"https://www.ufaz.az/en/academic-offer/undergraduate-programs/bsc-oil-and-gas-engineering/", type:"ufaz-bachelor"},
{name:"Geophysics and Geology Engineering", sdgs:[7,13,15], sdgsupport:"UFAZ’s Geology, Geosciences and Georesources program supports sustainability by providing the scientific and technical foundation necessary for the responsible management of Earth’s natural systems (SDG 15). Through the study of geophysical methods and subsurface conditions, students learn to identify renewable energy sources like geothermal energy and optimize the extraction of minerals essential for green technologies (SDG 7 and 13).", pdfUrl:"https://www.ufaz.az/en/academic-offer/undergraduate-programs/bsc-geophysical-engineering/",type:"ufaz-bachelor"},

{name:"Physical Chemistry", sdgs:[9,12,13], sdgsupport:"The Master’s program in Physical Chemistry and Chemical Engineering at UFAZ supports sustainability by integrating Chemoinformatics and Analytical Chemistry to optimize industrial processes and reduce environmental impact (SDG 9 and 12). By mastering research methodologies and advanced experimental skills, students are equipped to develop innovative, resource-efficient materials and cleaner chemical technologies (SDG 13)",pdfUrl:"https://www.ufaz.az/en/academic-offer/graduate-programs/physical-chemistry-and-chemical-engineering/", type:"ufaz-master"},
{name:"Data Science and Artificial Intelligance", sdgs:[4,8,9], sdgsupport:"The Data Science and Artificial Intelligence program supports the United Nations Sustainable Development Goals, particularly SDG 4: Quality Education by providing advanced, practical learning opportunities, SDG 8: Decent Work and Economic Growth by preparing highly skilled professionals for the digital economy, and SDG 9: Industry, Innovation and Infrastructure through training in cutting-edge technologies like artificial intelligence and big data. The program combines theoretical knowledge with hands-on experience using high-performance computing systems, ensuring students are industry-ready and innovation-driven. Graduates contribute to sustainable development by advancing technology, supporting economic growth, and fostering innovation in various sectors.", pdfUrl:"https://www.ufaz.az/en/academic-offer/graduate-programs/msc-data-sciences-and-artificial-intelligence/",type:"ufaz-master"},
{name:"GeoSciences", sdgs:[4,7,13], sdgsupport:"The Geophysical Engineering program focuses on modeling physical and chemical processes within the Earth, offering specialization in natural underground resources or advanced numerical modeling with AI applications in Earth sciences. It provides strong theoretical and practical training in geology, geophysics, and geochemistry, while developing analytical, mathematical, and multidisciplinary problem-solving skills. The program supports the United Nations Sustainable Development Goals, especially SDG 4: Quality Education, SDG 7: Affordable and Clean Energy, and SDG 13: Climate Action by preparing experts to responsibly manage natural resources and address environmental challenges.",pdfUrl:"https://www.ufaz.az/en/academic-offer/graduate-programs/msc-geosciences/", type:"ufaz-master"},
{name:"Water Resources Management", sdgs:[4,6,13], sdgsupport:"The Water Resources and Management program focuses on analyzing and managing water systems through a multidisciplinary approach, combining hydrogeology, water quality assessment, and sustainable decision-making. It equips students with practical and analytical skills in data analysis, modeling, project management, and environmental problem-solving, preparing them for careers in research, industry, and public institutions. The program supports the United Nations Sustainable Development Goals, particularly SDG 4: Quality Education, SDG 6: Clean Water and Sanitation, and SDG 13: Climate Action by promoting sustainable water management and addressing environmental challenges.",pdfUrl:"https://www.ufaz.az/en/academic-offer/graduate-programs/msc-water-resources-and-management/", type:"ufaz-master"},

];

// ===============================
// RENDER
// ===============================
function renderCards(data) {
    const container = document.getElementById("coursesContainer");
    if (!container) return;
const sdgColors = {
        2: "#DDA63A", 3: "#4C9F38", 6: "#26BDE2", 7: "#FCC30B", 
        9: "#FD6925", 11: "#FD9D24", 12: "#BF8B2E", 13: "#3F7E44", 
        14: "#0A97D9", 15: "#56C02B"
    };
    container.innerHTML = data.map(course => `
        <div class="course-card">
            <div>
                <div class="card-meta">
                    ${course.type.replace("-", " ").toUpperCase()}
                </div>
                <h3>${course.name}</h3>
                <p>${course.sdgsupport}</p>
                <p class="mb-0">
                            <span class="fw-bold me-2">SDG Alignment:</span>
                            ${course.sdgs.map(num => `
                                <span class="fw-bold" style="color: ${sdgColors[num] || '#666'};">
                                    Goal ${num}
                                </span>
                            `).join('<span class="text-muted mx-1">|</span>')}
                        </p>
                <p class="mb-0">
                
                    <a href="${course.pdfUrl}" target="_blank" 
                       class="fw-bold small text-decoration-none d-inline-flex align-items-center" 
                       style="color: #e4cacd44;">
                        <span class="me-1">View Curriculum</span> &rarr;
                    </a>
            </p>
            </div>
            
        </div>
    `).join("");
}





/* INIT */
function initRecognizedCredits() {
    renderCreditCards(creditPrograms);

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            document.querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            const level = btn.dataset.level;

            if (level === "all") {
                renderCreditCards(creditPrograms);
            } else {
                renderCreditCards(
                    creditPrograms.filter(c => c.level === level)
                );
            }
        });
    });
}

function initRecognizedCreditsPage() {
    renderCreditCards(creditPrograms);

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            document.querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            const level = btn.dataset.level;

            if (level === "all") {
                renderCreditCards(creditPrograms);
            } else {
                renderCreditCards(
                    creditPrograms.filter(item => item.level === level)
                );
            }
        });
    });
}
const creditPrograms = [
{
    name: "Computer Science",
    description: "Develop software and digital systems that optimize energy use, improve resource management, and enable environmental monitoring.",
    institution: "UFAZ",
    duration: "4 Years",
    level: "advanced",
    links: [
        { label: "ELAN Program Document", url: "https://edu.gov.az/upload/file/ELAN/2016/iyun/UFAZ-elan.pdf" },
        { label: "AzEdu Accreditation", url: "https://azedu.az/az/universitetler/25208/azerbaycan-fransiz-universitetini-bitiren-telebelerim-diplomlari-ayroapanin-27-ikesinde-taninir/" }
    ]
},
{
    name: "Chemical Engineering",
    description: "Design low-waste chemical processes, implement environmentally responsible production techniques, and reduce emissions.",
    institution: "UFAZ",
    duration: "4 Years",
    level: "advanced",
    links: [
       { label: "ELAN Program Document", url: "https://edu.gov.az/upload/file/ELAN/2016/iyun/UFAZ-elan.pdf" },
        { label: "AzEdu Accreditation", url: "https://azedu.az/az/universitetler/25208/azerbaycan-fransiz-universitetini-bitiren-telebelerim-diplomlari-ayroapanin-27-ikesinde-taninir/" }
    ]
},
{
    name: "Chemistry",
    description: "Environmentally responsible chemical research, sustainable material development, and energy-efficient laboratory practices.",
    institution: "UFAZ",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "ELAN Program Document", url: "https://edu.gov.az/upload/file/ELAN/2016/iyun/UFAZ-elan.pdf" },
        { label: "AzEdu Accreditation", url: "https://azedu.az/az/universitetler/25208/azerbaycan-fransiz-universitetini-bitiren-telebelerim-diplomlari-ayroapanin-27-ikesinde-taninir/" }]
},

{
    name: "Oil and Gas Engineering",
    description: "Manage hydrocarbon extraction responsibly, minimize environmental impact, and implement energy-efficient operations.",
    institution: "UFAZ",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "ELAN Program Document", url: "https://edu.gov.az/upload/file/ELAN/2016/iyun/UFAZ-elan.pdf" },
        { label: "AzEdu Accreditation", url: "https://azedu.az/az/universitetler/25208/azerbaycan-fransiz-universitetini-bitiren-telebelerim-diplomlari-ayroapanin-27-ikesinde-taninir/" }]
},

{
    name: "Geophysics and Geology Engineering",
    description: "Explore natural resources responsibly, assess environmental risks, and protect ecosystems during extraction activities.",
    institution: "UFAZ",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "ELAN Program Document", url: "https://edu.gov.az/upload/file/ELAN/2016/iyun/UFAZ-elan.pdf" },
        { label: "AzEdu Accreditation", url: "https://azedu.az/az/universitetler/25208/azerbaycan-fransiz-universitetini-bitiren-telebelerim-diplomlari-ayroapanin-27-ikesinde-taninir/" }]
},

{
    name: "Physical Chemistry",
    description: "Design energy-efficient chemical processes, conduct environmentally responsible research, and develop sustainable materials.",
    institution: "UFAZ",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "ELAN Program Document", url: "https://edu.gov.az/upload/file/ELAN/2016/iyun/UFAZ-elan.pdf" },
        { label: "AzEdu Accreditation", url: "https://azedu.az/az/universitetler/25208/azerbaycan-fransiz-universitetini-bitiren-telebelerim-diplomlari-ayroapanin-27-ikesinde-taninir/" }]
},

{
    name: "Data Science and Artificial Intelligence",
    description: "Develop predictive models, optimize resource management, and improve environmental monitoring using data-driven approaches.",
    institution: "UFAZ",
    duration: "2 Years",
    level: "advanced",
    links: [  { label: "ELAN Program Document", url: "https://edu.gov.az/upload/file/ELAN/2016/iyun/UFAZ-elan.pdf" },
        { label: "AzEdu Accreditation", url: "https://azedu.az/az/universitetler/25208/azerbaycan-fransiz-universitetini-bitiren-telebelerim-diplomlari-ayroapanin-27-ikesinde-taninir/" }]
},


{
    name: "Earth Sciences",
    description: "Study natural systems, monitor environmental changes, and responsibly manage natural resources for sustainability.",
    institution: "UFAZ",
    duration: "2 Years",
    level: "advanced",
    links: [  { label: "ELAN Program Document", url: "https://edu.gov.az/upload/file/ELAN/2016/iyun/UFAZ-elan.pdf" },
        { label: "AzEdu Accreditation", url: "https://azedu.az/az/universitetler/25208/azerbaycan-fransiz-universitetini-bitiren-telebelerim-diplomlari-ayroapanin-27-ikesinde-taninir/" }]
},



{
    name: "Ecological Engineering",
    description: "Prepare environmental engineers capable of managing ecological systems, addressing pollution, protecting natural resources, and contributing to sustainable infrastructure development. Competencies include environmental management, ecological systems engineering, pollution control technologies, resource sustainability, and climate-related environmental assessment. Internationally recognized with ASIIN accreditation, demonstrating compliance with European engineering-education standards.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "ASIIN Accredation Announcment", url: "https://azedu.az/az/universitetler/97893/adnsu-nun-daha-3-ixtisasi-beynelxalq-akkreditasiyadan-kecib/" },
      ]
},

{
    name: "MSc in Renewable Energy (ASOIU – University of Warwick Dual Degree)",
    description: "Joint programme delivered by ASOIU and University of Warwick (UK). Graduates receive two internationally recognized diplomas: MSc in Renewable Energy from University of Warwick and MSc from ASOIU. Provides advanced training in clean and renewable energy production, low-carbon energy systems, smart-grid development, sustainable technology innovation, and climate-responsive power systems. Directly contributes to global climate and sustainability priorities.",
    institution: "ASOIU & University of Warwick",
    duration: "2 Years",
    level: "advanced",
    links: [  { label: "Official Program Page", url: "https://asoiu.edu.az/info_main" },
        { label: "University of Warwick Partnership", url: "https://warwick.ac.uk/fac/sci/wmg/study/international-partnerships/azerbaijan-state-oil-and-industry-university/" }]
},

{
    name: "Water Resources Management",
    description: "Master's programme directly relevant to environmental sustainability and climate-driven water systems. Jointly awarded by UFAZ and University of Strasbourg. Trains specialists in sustainable water resource governance, hydrology and watershed management, climate-related water challenges, ecological risk assessment, and water-energy-environment interactions. Awards fully recognized European national diplomas ensuring international academic and professional recognition.",
    institution: "UFAZ",
    duration: "2 Years",
    level: "advanced",
    links: [  { label: "UFAZ Academic Programs", url: "https://www.ufaz.az/en/academic-offer/graduate-programs/msc-water-resources-and-management/" },
        { label: "Evidance of Dual Diplomas", url: "https://v1.ufaz.az/en/news/student-id-cards-and-diploma-of-the-university-of-strasbourg-presented-to-ufaz-students/" }]
},

{
    name: "Energy Engineering",
    description: "Optimize energy generation, distribution, and efficiency with minimal environmental impact.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "Visit", url: "https://asoiu.edu.az/power_engineering/upload/syllabus/050608_ENG_3-4.pdf" },
    ]
},

{
    name: "Life and Safety Engineering",
    description: "Design safe industrial, urban, and environmental systems that protect human life and reduce hazards.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://asoiu.edu.az/oil_and_gas_production/upload/syllabus/050614_ENG.pdf" },
    ]
},
{
    name: "Chemical Engineering",
    description: "Develop low-waste chemical processes and environmentally responsible production technologies.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://azedu.az/az/universitetler/97893/adnsu-nun-daha-3-ixtisasi-beynelxalq-akkreditasiyadan-kecib" },
    ]
},

{
    name: "Computer Engineering",
    description: "Train students to design efficient computing systems and sustainable technology solutions.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://azedu.az/maraqli/80568/adnsu-nun-daha-5-ixtisasinin-beynelxalq-akkreditasiya-muddeti-uzadilib"} ,

        ]
},

{
    name: "Food Engineering",
    description: "Design sustainable food production systems, reduce waste, and improve energy efficiency in food processing.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://asoiu.edu.az/chemical_technology_faculty/upload/syllabus/050635-ENG.pdf"} ,

        ]
},

{
    name: "Mechanical Engineering",
    description: "Design energy-efficient machinery, reduce material waste, and develop sustainable mechanical systems.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://azedu.az/az/universitetler/97893/adnsu-nun-daha-3-ixtisasi-beynelxalq-akkreditasiyadan-kecib"} ,

        ]
},

{
    name: "Oil and Gas Engineering",
    description: "Manage oil and gas operations responsibly and implement energy-efficient extraction technologies.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://azedu.az/az/universitetler/97893/adnsu-nun-daha-3-ixtisasi-beynelxalq-akkreditasiyadan-kecib"} ,

        ]
},

{
    name: "Process Automation Engineering",
    description: "Implement low-waste, energy-efficient automated production systems and industrial processes.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://www.mektebgushesi.az/2017/01/24/adnsu-nun-uc-ixtisasi-avropa-standartlarina-uygun-olaraq-akkreditasiya-olunub/"} ,

        ]
},
{
    name: "Industrial Engineering",
    description: "Optimize production systems, resource use, and operational efficiency for environmental sustainability.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://azedu.az/maraqli/80568/adnsu-nun-daha-5-ixtisasinin-beynelxalq-akkreditasiya-muddeti-uzadilib"} ,

        ]
},

{
    name: "Electrical Power Engineering",
    description: "Develop energy-efficient electrical systems and renewable energy technologies.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://www.mektebgushesi.az/2017/01/24/adnsu-nun-uc-ixtisasi-avropa-standartlarina-uygun-olaraq-akkreditasiya-olunub/"} ,

        ]
},


{
    name: "Energy Management",
    description: "Optimize energy use and promote sustainable energy practices in industrial and organizational settings.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "intermediate",
    links: [  { label: "visit", url: "https://www.mektebgushesi.az/2017/01/24/adnsu-nun-uc-ixtisasi-avropa-standartlarina-uygun-olaraq-akkreditasiya-olunub/"} ,

        ]
},

{
    name: "Oil Refining Technology",
    description: "Manage oil refining operations responsibly with focus on environmental impact reduction.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "intermediate",
    links: [  { label: "visit", url: ""} ,

        ]
},

{
    name: "Business organization and management",
    description: "Develop management practices that integrate sustainability into business operations.",
    institution: "ASOIU",
    duration: "2 Years",
    level: "intermediate",
    links: [  { label: "visit", url: "https://azedu.az/maraqli/80568/adnsu-nun-daha-5-ixtisasinin-beynelxalq-akkreditasiya-muddeti-uzadilib"} ,

        ]
}
,

{
    name: "İnstrumentation ENgineering",
    description: "Design measurement and monitoring systems that reduce energy and material waste.",
    institution: "ASOIU",
    duration: "4 Years",
    level: "advanced",
    links: [  { label: "visit", url: "https://azedu.az/az/universitetler/97893/adnsu-nun-daha-3-ixtisasi-beynelxalq-akkreditasiyadan-kecib"} ,

        ]
},


];
function initRouting() {
    document.addEventListener("click", (e) => {
        const link = e.target.closest(".load-content");
        if (!link) return;

        e.preventDefault();

        document.querySelectorAll(".menu-item")
            .forEach(el => el.classList.remove("active-link"));

        link.classList.add("active-link");

        loadContent(link.dataset.file);
    });

    window.addEventListener("popstate", (e) => {
        if (e.state?.file) {
            loadContent(e.state.file, false);
        }
    });

    const hash = window.location.hash.slice(1);
    if (hash) {
        loadContent(hash + ".html", false);
    }
}
function renderCreditCards(data) {
    const container = document.getElementById("creditContainer");
    if (!container) return;

    container.innerHTML = data.map(course => `
        <div class="credit-card">
            <div class="credit-header">
                <div class="credit-icon">🎓</div>
                <div>
                    <div class="credit-title">${course.name}</div>
                    <div class="credit-tags">
                        <div class="tag ${course.level}">
                            ${course.level.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>

            <div class="credit-desc">
                ${course.description}
            </div>

            <div class="credit-info">
                <div><span>Institution</span>${course.institution}</div>
                <div><span>Duration</span>${course.duration}</div>
                <div><span>Level</span>${course.level}</div>
            </div>

            <div class="credit-links">
              ${course.links.map(link => `
    <a href="${link.url}" rel="noopener noreferrer" target="_blank">
        ↗ ${link.label}  
    </a>
    
`).join("")}
</div>
        </div>
    `).join("");
}

