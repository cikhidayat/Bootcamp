function getData() {
    const getName = document.getElementById("name").value
    const getEmail = document.getElementById("email").value
    const getPhone = document.getElementById("phone").value
    const getSubject = document.getElementById("subject").value
    const getMessage = document.getElementById("message").value
    // console.log(getName)
    // console.log(getEmail)
    // console.log(getPhone)
    // console.log(getSubject)
    // console.log(getMessage)
    const myEmail = "rhidayat674@gmail.com"
    let a = document.createElement("a")
    a.href = `mailto:${myEmail}?subject=${getSubject}&body=Halo nama saya ${getName} bisakah anda menghubungi saya di ${getPhone} untuk membahas ${getMessage}`

    a.click()
}