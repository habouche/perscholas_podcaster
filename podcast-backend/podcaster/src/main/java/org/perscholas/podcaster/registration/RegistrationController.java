package org.perscholas.podcaster.registration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class  RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping(path = "/register" )
    public ResponseEntity<Optional> register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

}
