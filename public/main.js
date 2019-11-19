import 'whatwg-fetch'

var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
  fetch('/names', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'FirstName': 'SUK',
      'LastName': 'PIDR'
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
})

del.addEventListener('click', function() {
  fetch('/names', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'FirstName': 'SUK'
    })
  })
  .then(res => {
    if(res.ok) return res.json()
  }).
  then(data => {
    console.log(data);
    window.location.reload()
  })
})
