package org.fifthgen.springdms.rest.controller;

import java.util.Arrays;
import java.util.List;

import org.fifthgen.springdms.data.enumerated.EventType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventTypeRestController {

	@PostMapping("/event_types")
	@ResponseBody
	public List<EventType> eventTypes() {
		return Arrays.asList(EventType.values());
	}
}
