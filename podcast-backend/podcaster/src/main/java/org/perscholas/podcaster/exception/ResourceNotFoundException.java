package org.perscholas.podcaster.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(Long id) {
        super("Resource with " + id + " not found");
    }
}
