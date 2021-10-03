package org.perscholas.podcaster.registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.annotation.processing.Generated;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {

    private final String userName;
    private final String fullName;
    private final String email;
    private final String password;
    private final String role;



}
