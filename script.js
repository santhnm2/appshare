function Register()
{
  var infor = [];
  var first = $("#first").val();
  var last = $("#last").val();
  var email = $("#email").val();
  var pass = $("#pass").val();
  infor.push(first);
  infor.push(last);
  infor.push(email);
  infor.push(pass);

  $.ajax({
        url: '/api/register',
        type: 'post',
        data: {infor:infor},
        dataType: 'json'
  }).done(function(){
      console.log("finished");
  }); 
}

function sign_in(event)
{
  //console.log("ksdjhfs");
  event.preventDefault();
  var infor = [];
  var email = $("#email2").val();
  var pass = $("#pass2").val();
  infor.push(email);
  infor.push(pass);
  $.ajax({
        url: '/api/sign_in',
        type: 'post',
        data: {infor:infor},
        dataType: 'json'
  }).done(function(data){
    console.log(data);
    
    if(Object.keys(data).length > 0)
    {
      window.location.href = 'http://www.google.com';
    }
    else
    {
       window.location.href = 'http://www.yahoo.com';
    }
  }); 
    
}

$(function() {
  $("#sign-in-form").on("submit", sign_in);
});
