package com.Healthcare.Controller;

import com.Healthcare.Entity.Userdata;
import com.Healthcare.Service.UserdataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userdata")
@CrossOrigin(origins = "http://localhost:5173")
public class UserdataController {

    @Autowired
    private UserdataService userdataService;

    @PostMapping("/registeruserdetails")
    public ResponseEntity<Userdata> adduserdetails(@RequestBody Userdata userdata)
    {
       Userdata userdata1 = userdataService.adduserdata(userdata);
       return new ResponseEntity<>(userdata1, HttpStatus.OK);
    }

    //login
    @PostMapping("/logindetails")
    public ResponseEntity<String> logindetails(@RequestBody Userdata loginData)
    {
      Userdata logindetails =   userdataService.checkuserdetails(loginData.getUsername(), loginData.getPassword());

      if (logindetails != null){
          return ResponseEntity.ok("Login Successfully");
      }
      else {
          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
      }
    }
}
