package org.fifthgen.springdms.auth.service;

import org.fifthgen.springdms.auth.model.User;

public interface UserService {

	void save(User user);
	
	User findByUsername(String username);	
}
