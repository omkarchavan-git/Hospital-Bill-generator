package com.Healthcare.Respository;

import com.Healthcare.Entity.Userdata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserdataRepo extends JpaRepository<Userdata, Long> {

    //method to find by username and pass
    Userdata findByEmailAndPassword(String username, String password);
}
