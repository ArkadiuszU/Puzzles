
import jwt_decode from "jwt-decode";

const ClaimTypes = 
{
    Role: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    Country: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country",
    Gender: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender",
    Firstname: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    Id: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    Email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    Surname: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
}

function sayHi(token) {

    
    var decode= jwt_decode(token);
    
    return {
        nick: decode[ClaimTypes.Id],
        name: decode[ClaimTypes.Firstname] + " " + decode[ClaimTypes.Surname],
        email: decode[ClaimTypes.Email],
        role: decode[ClaimTypes.Role],
        gender: decode[ClaimTypes.Gender],
        country: decode[ClaimTypes.Country]
    }
  }
  

  export {sayHi};