package org.fifthgen.springdms.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller	
public class CompanyController {

	@GetMapping("/company")
	public String companies() {
		return "company";
	}
}
