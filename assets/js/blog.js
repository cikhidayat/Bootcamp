// Blog script
const data = []
function submitData(e){
    e.preventDefault()

    let projectName = document.getElementById("project-name").value
    let startDate = document.getElementById("start-date").value
    let endDate = document.getElementById("end-date").value
    let description = document.getElementById("description").value
    let technologiesHtml = document.getElementById("html").checked
    let technologiesCss = document.getElementById("css").checked
    let technologiesJavascript = document.getElementById("javascript").checked
    let technologiesPhp = document.getElementById("php").checked
    let image = document.getElementById("image-blog").files

    image = URL.createObjectURL(image[0])

    // Month Duration
    let startYear = Number(startDate.slice(0, 4))
    let endYear = Number(endDate.slice(0, 4))
    let startMonth = Number(startDate.slice(5, 7))
    let endMonth = Number(endDate.slice(5, 7))

    let yearMonthCv = (endYear-startYear) * 12
    let monthDuration = (endMonth - startMonth) + yearMonthCv

    // Technologies
    if (technologiesHtml === true) {
        technologiesHtml = `<i class="fa-brands fa-html5"></i>`
    } else {
        technologiesHtml = ""
    };
    if (technologiesCss === true){
        technologiesCss = `<i class="fa-brands fa-css3-alt"></i>`
    } else {
        technologiesCss = ""
    };
    if (technologiesJavascript === true){
        technologiesJavascript = `<i class="fa-brands fa-js"></i>`
    } else {
        technologiesJavascript = ""
    };
    if (technologiesPhp === true){
        technologiesPhp = `<i class="fa-brands fa-php"></i>`
    } else {
        technologiesPhp = ""
    };

    const projectData = {
        projectName,
        startDate,
        endDate,
        monthDuration,
        description,
        technologiesHtml,
        technologiesCss,
        technologiesJavascript,
        technologiesPhp,
        image
    }

    data.push(projectData)
    renderBlog()
}

function renderBlog(){
    console.log(data)
    document.getElementById("project-blog").innerHTML = ""

    for(let i = 0; i<data.length; i++){
        document.getElementById("project-blog").innerHTML +=
        `<div class="project-post">
            <img src="${data[i].image}" alt=""/>
            <a href="blog-page.html" target="_blank"><h3 class="project-title">${data[i].projectName}</h3></a>
            <label for="project-duration">Duration: </label>
            <p class="project-duration"> ${data[i].monthDuration} Month</p>
            <p class="project-desc">${data[i].description}</p>
            <p class="project-tech">
                ${data[i].technologiesHtml}
                ${data[i].technologiesCss}
                ${data[i].technologiesJavascript}
                ${data[i].technologiesPhp}
            </p>
            <div class="action-btn">
                <input type="button" value="Edit">
                <input type="button" value="Delete">
            </div>
        </div>`
    }
}