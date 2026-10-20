

//========== select elements ===========//
const modeToggle = document.querySelector("#theme-toggle-button");
const rootElement = document.documentElement;

//open sidebar
const openSidebarButton = document.querySelector("#settings-toggle");
const sidebar = document.querySelector("#settings-sidebar");

//close sidebar
const closeSidebarButton = document.querySelector("#close-settings");

//change site's font
const fontOptions = document.querySelectorAll(".font-option");

//change theme color
const colorOptions = document.querySelector("#theme-colors-grid");

//reset element
const resetBtn = document.querySelector("#reset-settings")


//scroll spry
const sectionsElements = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-links a")


// navs and taps 
const navFilterContainer = document.querySelector("#portfolio-filters");
const portfolioCards = document.querySelectorAll(".portfolio-item")


// ========= actions ===========//
// toggle theme
function toggleTheme() {
    rootElement.classList.toggle("dark");
}

// open sidebar
function openSidebar() {
    sidebar.classList.remove("translate-x-full");
    openSidebarButton.style.setProperty("right", "20rem");
    sidebar.setAttribute("aria-hidden", "false");

}
// close sidebar
function closeSidebar() {
    sidebar.classList.add("translate-x-full");
    openSidebarButton.style.setProperty("right", "0");
    sidebar.setAttribute("aria-hidden", "true");
}

//change site's font
function changeFont(e) {
    const dataOption = e.target.closest("button.font-option");
    if (dataOption) {

        const fontValue = dataOption.dataset.font;
        document.body.classList.remove(`font-alexandria`, `font-tajawal`, `font-cairo`);
        document.body.classList.add(`font-${fontValue}`);



        //active state
        for (let i = 0; i < fontOptions.length; i++) {

            fontOptions[i].classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            fontOptions[i].classList.add("border-slate-200", "dark:border-slate-700");

            if (fontOptions[i] === document.querySelector(`button[data-font="${fontValue}"]`)) {
                fontOptions[i].classList.remove("border-slate-200", "dark:border-slate-700");
                fontOptions[i].classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            }


        }
    }
}

//change theme color
function changeThemeColor(e) {

    const colorOption = e.target.closest("button");
    if (colorOption) {
        const primaryColor = colorOption.dataset.primary;
        const secondaryColor = colorOption.dataset.secondary;

        rootElement.style.setProperty("--color-primary", primaryColor);
        rootElement.style.setProperty("--color-secondary", secondaryColor);
        rootElement.style.setProperty("--color-accent", secondaryColor);

 // active state
    for (let i = 0; i < colorOptions.children.length; i++) {
            colorOptions.children[i].classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");

            if (colorOptions.children[i] === colorOption) {

                colorOptions.children[i].classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
            }

        }
        
    }
    
   

}


//reset theme
function resetTheme(){
   closeSidebarButton.click()
   fontOptions[0].click();
   colorOptions.children[0].click()
   
}

function scrollSpy(){
   const scrollPosition = window.scrollY;
   
   let currentSectionId ="";
   for(let i = 0 ; i < sectionsElements.length ; i ++){
    let sectionTop = sectionsElements[i].offsetTop; 
    let sectionHeight =sectionsElements[i].offsetHeight;

    let sectionBottom = sectionTop + sectionHeight;

    if(scrollPosition >= sectionTop && scrollPosition < sectionBottom ){
        currentSectionId = sectionsElements[i].getAttribute("id"); 

    }
   }
   
   
   
   for(let i = 0 ; i< navLinks.length ; i++){
    navLinks[i].classList.remove("active");
    if(`#${currentSectionId}` == navLinks[i].getAttribute("href")){
        navLinks[i].classList.add("active");
    }
    

   }


   
    
}

//filter cards
function filterPortfolio(e){
    const clickedFilter = e.target.closest("button");

    if(clickedFilter){

        const clickedValue = clickedFilter.dataset.filter;

        for(let i = 0 ; i< portfolioCards.length ;i++){

            let cardCategory = portfolioCards[i].dataset.category;
            console.log(cardCategory);
            console.log(clickedValue);

            portfolioCards[i].style.opacity = 0;
            portfolioCards[i].style.transform = "scale(0)";

            if(cardCategory === clickedValue || clickedValue == "all" ){
                portfolioCards[i].classList.remove("hidden")
                setTimeout(function(){
                    portfolioCards[i].style.opacity = 1;
                portfolioCards[i].style.transform = "scale(1)";

                },50)
                

            }
            else{

                portfolioCards[i].classList.add("hidden")
           

            }

        }


        
        for(let i = 0 ; i<navFilterContainer.children.length ; i++){
            navFilterContainer.children[i].classList.remove("hover:shadow-lg", "hover:shadow-primary/50", "active", "bg-linear-to-r", "from-primary" ,"to-secondary" ,"text-white", "shadow-lg", "shadow-primary/50" )
            navFilterContainer.children[i].classList.add( "border","border-slate-300" ,"dark:border-slate-700" , "dark:bg-slate-800")


            if(navFilterContainer.children[i] ==clickedFilter ){
                navFilterContainer.children[i].classList.add("hover:shadow-lg", "hover:shadow-primary/50", "active", "bg-linear-to-r", "from-primary" ,"to-secondary" ,"text-white", "shadow-lg", "shadow-primary/50")
                navFilterContainer.children[i].classList.remove( "border","border-slate-300" ,"dark:border-slate-700" ,"dark:bg-slate-800")
            }
        }

    }


    

}

// ============ function calling ========
scrollSpy();

// ========== event listeners ===========//
if (modeToggle)
    modeToggle.addEventListener("click", toggleTheme);
if (openSidebarButton)
    openSidebarButton.addEventListener("click", openSidebar);
if (closeSidebarButton)
    closeSidebarButton.addEventListener("click", closeSidebar);

if (fontOptions)
    for (let i = 0; i < fontOptions.length; i++) {
        fontOptions[i].addEventListener("click", function (e) {
            changeFont(e);
        });
    }

if (colorOptions)
    colorOptions.addEventListener("click", function (e) {
        changeThemeColor(e);
    })

if(resetBtn)
    resetBtn.addEventListener("click", resetTheme)
if(navFilterContainer)
    navFilterContainer.addEventListener("click" , (e)=> filterPortfolio(e))


//browser events
window.addEventListener("scroll", scrollSpy)