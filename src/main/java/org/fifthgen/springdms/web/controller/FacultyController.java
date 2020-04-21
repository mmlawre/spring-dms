package org.fifthgen.springdms.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FacultyController {

	@GetMapping("/faculty")	
	public String faculties() {
		return "faculty";
	}
}
