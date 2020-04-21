package org.fifthgen.springdms.rest.exception;

public class ObjectNotDetachedException extends Exception {
	
	@Override
	public String getMessage() {
		return "Entity is bound to another entity.";
	}
}
