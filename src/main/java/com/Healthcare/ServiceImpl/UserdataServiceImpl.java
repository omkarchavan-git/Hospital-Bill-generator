package com.Healthcare.ServiceImpl;

import com.Healthcare.Entity.Userdata;
import com.Healthcare.Respository.UserdataRepo;
import com.Healthcare.Service.UserdataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserdataServiceImpl implements UserdataService {

    @Autowired
    private UserdataRepo userdataRepo;

    //add user data
    @Override
    public Userdata adduserdata(Userdata userdata) {
    Userdata user =   userdataRepo.save(userdata);
        return user;
    }

    @Override
    public Userdata checkuserdetails(String email1, String password) {
     Userdata user = userdataRepo.findByEmailAndPassword(email1, password);
        return user;
    }
}
