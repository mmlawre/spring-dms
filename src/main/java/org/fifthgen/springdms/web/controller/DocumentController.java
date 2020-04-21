package org.fifthgen.springdms.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DocumentController {

	@GetMapping("/other/document")
	public String documents() {
		return "/other/document";
	}
}
