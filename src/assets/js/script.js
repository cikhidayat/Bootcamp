// Contact script
function getData() {
    const getName = document.getElementById("name").value
    const getEmail = document.getElementById("email").value
    const getPhone = document.getElementById("phone").value
    const getSubject = document.getElementById("subject").value
    const getMessage = document.getElementById("message").value

    if(getName == ""){
        return alert("Nama harus di isi")
      } else if(getEmail == "") {
        return alert("Email harus di isi") 
      } else if(getPhone == "") {
        return alert("Nomor telpon harus di isi") 
      } else if(getSubject == "") {
        return alert("subject harus di isi") 
      } else if(getMessage == "") {
        return alert("Message harus di isi") 
      }

    const myEmail = "rhidayat674@gmail.com"
    let a = document.createElement("a")
    a.href = `mailto:${myEmail}?subject=${getSubject}&body=Halo nama saya ${getName} bisakah anda menghubungi saya di nomor ${getPhone} atau email ${getEmail} untuk membahas ${getMessage}`

    a.click()
};