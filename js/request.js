function request(method, url, callback, data){
    /* CREER UNE VARIABLE ET LUI ASSIGNER XMLHttpRequest */
    let request = new XMLHttpRequest(); 
    
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && [200, 201].indexOf(this.status) !== false){
            callback(JSON.parse(this.responseText, this.status));
        }
    };
    /* Ouvre une nouvelle connexion en utilisant GET */
    request.open(method, url);
    request.setRequestHeader("Content-Type", "application/json");
    if(method == 'POST'){
        request.send(JSON.stringify(data));
    }else{
        request.send();
    }
  }
  console.log(request);