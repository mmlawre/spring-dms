package org.fifthgen.springdms.web.controller.report;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.fifthgen.springdms.data.model.Event;
import org.fifthgen.springdms.data.model.report.EventReportDTO;
import org.fifthgen.springdms.data.service.EventService;
import org.fifthgen.springdms.data.service.report.EventReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class EventReportController {

	private static final String REPORT_NAME = "event-report";

	@Autowired
	private EventService eventService;

	@Autowired
	private EventReportService eventReportService;

	@GetMapping("/reports/event")
	public String eventReport(@ModelAttribute("filter") EventReportDTO filter) {

		return "reports/event";
	}

	@PostMapping("/reports/event")
	public HttpEntity<?> generateReport(@ModelAttribute("filter") @Valid EventReportDTO filter) {
		List<Event> events = eventService.findAllBetween(filter.getDateFrom(), filter.getDateTo());
		String reportType = filter.getReportType().toLowerCase();

		events = events.stream().filter(event -> {
			if (filter.getEventType() != null)
				return event.getEventType().ordinal() == filter.getEventType();

			return true;
		}).filter(event -> {
			if (filter.getContactId() != null)
				return event.getContact().getContactId() == filter.getContactId();

			return true;
		}).filter(event -> {
			if (filter.getFacultyId() != null)
				return event.getFaculty().getFacultyId() == filter.getFacultyId();

			return true;
		}).collect(Collectors.toList());

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		byte[] data = eventReportService.generateReport(events, auth.getName(), reportType.equals("csv"));

		if (data != null) {
			HttpHeaders header = new HttpHeaders();

			if (reportType.equals("pdf"))
				header.setContentType(MediaType.APPLICATION_PDF);
			else
				header.setContentType(MediaType.TEXT_PLAIN);

			header.set(HttpHeaders.CONTENT_DISPOSITION,
					"attachment; filename=" + getTimestampedReportName() + "." + reportType);
			header.setContentLength(data.length);

			return new HttpEntity<>(data, header);
		}

		return new HttpEntity<String>("Couldn't generate report");
	}

	private String getTimestampedReportName() {
		String timestamp = new SimpleDateFormat("yyyyMMddHHmm").format(new Date());
		return REPORT_NAME + '-' + timestamp;
	}
}