package org.fifthgen.springdms.auth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class SecurityServiceImpl implements SecurityService {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailService;

	private static final Logger LOG = LoggerFactory.getLogger(SecurityServiceImpl.class);

	@Override
	public String findLoggedInUsername() {
		Object userDetails = SecurityContextHolder.getContext().getAuthentication().getDetails();
		if (userDetails instanceof UserDetails) {
			return ((UserDetails) userDetails).getUsername();
		}

		return null;
	}

	@Override
	public void autoLogin(String username, String password) {
		UserDetails userDetails = userDetailService.loadUserByUsername(username);
		UsernamePasswordAuthenticationToken basicAuthToken = new UsernamePasswordAuthenticationToken(userDetails,
				password, userDetails.getAuthorities());

		authenticationManager.authenticate(basicAuthToken);

		if (basicAuthToken.isAuthenticated()) {
			SecurityContextHolder.getContext().setAuthentication(basicAuthToken);
			LOG.debug(String.format("User %s automatically logged in", username));
		}
	}

}
