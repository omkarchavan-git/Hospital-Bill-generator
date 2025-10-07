package com.Healthcare.Service;

import com.Healthcare.Entity.Userdata;

public interface UserdataService {

    //method to add user data
    public Userdata adduserdata(Userdata userdata);

    //method to check username and pass
    public Userdata checkuserdetails(String username1, String password1);


}
