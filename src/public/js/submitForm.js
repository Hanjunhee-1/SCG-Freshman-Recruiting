function submitForm() {
    var id = document.getElementById("search-id").value;
    document.getElementById("find-by-id").action = "http://localhost:3000/stacks/" + id;
    document.getElementById("find-by-id").submit();
  }