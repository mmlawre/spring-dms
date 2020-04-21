package org.fifthgen.springdms.web.controller;

import javax.validation.Valid;

import org.fifthgen.springdms.auth.model.User;
import org.fifthgen.springdms.auth.model.validator.UserValidator;
import org.fifthgen.springdms.auth.service.SecurityService;
import org.fifthgen.springdms.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private SecurityService securityService;

	@Autowired
	UserValidator validator;

	@GetMapping("/register")
	public String register(User user) {
		user = new User();
		return "register";
	}

	@PostMapping("/register")
	public String register(@Valid User user, BindingResult bindingResult, Model model) {
		validator.validate(user, bindingResult);

		if (bindingResult.hasErrors()) {
			return "register";
		}

		userService.save(user);

		securityService.autoLogin(user.getUsername(), user.getConfirmPassword());

		return "redirect:/home";
	}

	@GetMapping("/login")
	public String login(Model model, String error, String logout) {
		if (error != null) {
			model.addAttribute("error", "Invalid username or password");
		}

		if (logout != null) {
			model.addAttribute("message", "User logged out successfully");
		}

		return "login";
	}

	@GetMapping({ "/", "/home" })
	public String home() {
		return "home";
	}
}
