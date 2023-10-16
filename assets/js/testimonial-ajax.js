// const dataTest = [
//     {
//         name: "Ucup Hartanto",
//         comment: "Hasilnya melebihi ekspektasi, keren banget!",
//         star: 5,
//         image: "./assets/images/test1.jpg"
//     },
//     {
//         name: "Sigit Rendang",
//         comment: "Lumayan lah untuk seorang pemula. Salam dari sepuh",
//         star: 3,
//         image: "./assets/images/test2.jpg"
//     },
//     {
//         name: "Inem Bakwan",
//         comment: "Luar biasa bagus hasilnya, tapi warnanya sedikit keliatan kusam",
//         star: 4,
//         image: "./assets/images/test3.jpg"
//     },
//     {
//         name: "Sakura Beban",
//         comment: "Tidak sesuai ekspektasi hasilnya, banyak ditemukan bug",
//         star: 1,
//         image: "./assets/images/test4.jpg"
//     },
//     {
//         name: "Bang Toyib",
//         comment: "Walau harganya murah tapi kualitas tidak murahan, mantap!",
//         star: 5,
//         image: "./assets/images/test5.jpg"
//     },
//     {
//         name: "Kang Penyusup",
//         comment: "Hasilnya biasa saja, wajar harganya murah!",
//         star: 1,
//         image: "./assets/images/test6.jpg"
//     }
// ]

const testimonial = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open("GET", "https://api.npoint.io/c744114f252b045570d8", true)

    xhr.onload = function () {
        if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
        } else{
            reject("Error Loading Data")
        }
    }

    xhr.onerror = function () {
        reject("Network Error")
    }

    xhr.send()
})

async function showTest(){
    try {
        const response = await testimonial
        let testContent = ""

        response.forEach(data => {
            testContent += `
            <div class="test-post">
                <img src="${data.image}" alt="Testimonial img">
                <p class="test-comment">"${data.comment}"</p>
                <p class="test-name">- ${data.name}</p>
                <p id="test-star" class="test-star">${data.star} <i class="fa-solid fa-star"></i></p>
            </div>
            `
        })
        document.getElementById("test-content").innerHTML = testContent
    } catch (error) {
        console.log(error);
    }
}

showTest()

// Filter Data
async function filterData(star){
    try {
        const response = await testimonial
        let testContent = ""

        const filteredTest = response.filter(item => item.star === star)

        if (filteredTest.length === 0){
            testContent = `<h3>DATA NOT FOUND!</h3>`
        } else {
            filteredTest.forEach(data => {
            testContent += `
            <div class="test-post">
                <img src="${data.image}" alt="Testimonial img">
                <p class="test-comment">"${data.comment}"</p>
                <p class="test-name">- ${data.name}</p>
                <p id="test-star" class="test-star">${data.star} <i class="fa-solid fa-star"></i></p>
            </div>
            `
            })
        }  
        document.getElementById("test-content").innerHTML = testContent      
    } catch (error) {
        console.log(error);
    }     
}