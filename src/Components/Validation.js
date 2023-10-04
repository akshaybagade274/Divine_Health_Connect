class Validation {
    validate_email(event) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
            document.getElementById("email_msg").innerHTML = null

        }
        else
            document.getElementById("email_msg").innerHTML = "&cross;Please enter valid email id "
    }

    validate_password(event)  {  if ( /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(event.target.value))
    {
        document.getElementById("password_msg").innerHTML =null

    }
    else 
    document.getElementById("password_msg").innerHTML = "&cross;Password must contain 1 uppercase ,1 lowercase ,1 special character , 1 numeric value and minimum 8 characters "
    
   }

   validate_phone(event){  if ( /^\d{10}$/.test(event.target.value))
   {
       document.getElementById("phone_msg").innerHTML =null

   }
   else 
   document.getElementById("phone_msg").innerHTML = "&cross; Phone number must contain 10 digits only"
   
  }

  validate_adhar(event)  {  if ( /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(event.target.value))
  {
      document.getElementById("adhar_msg").innerHTML =null

  }
  else 
  document.getElementById("adhar_msg").innerHTML = "&cross; Adhar no. must contain 12 digits "
  
 }

    validate_pincode(event) {
        if (/^\d{6}$/.test(event.target.value)) {
            document.getElementById("pincode_msg").innerHTML = null

        }
        else
            document.getElementById("pincode_msg").innerHTML = "&cross; please enter valid Pin code "


    }
}
export default new Validation();