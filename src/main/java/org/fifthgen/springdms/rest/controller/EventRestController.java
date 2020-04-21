package org.fifthgen.springdms.rest.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.fifthgen.springdms.MessageAccessor;
import org.fifthgen.springdms.data.model.Contact;
import org.fifthgen.springdms.data.model.Document;
import org.fifthgen.springdms.data.model.Event;
import org.fifthgen.springdms.data.model.Faculty;
import org.fifthgen.springdms.data.service.ContactService;
import org.fifthgen.springdms.data.service.DocumentService;
import org.fifthgen.springdms.data.service.EventService;
import org.fifthgen.springdms.data.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventRestController {

	@Autowired
	private EventService eventService;

	@Autowired
	private FacultyService facultyService;

	@Autowired
	private ContactService contactService;

	@Autowired
	private DocumentService documentService;

	@Autowired
	private MessageAccessor messageAccessor;

	@PostMapping("/event")
	@ResponseBody
	public List<Event> getAllEvents() {
		List<Event> events = eventService.getAll();

		return events;
	}

	@PostMapping("/event/add")
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public ResponseEntity<?> addEvent(@Valid @RequestBody Event event) {
		return this.addEditEvent(event);
	}

	@PostMapping("/event/edit")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> updateEvent(@Valid @RequestBody Event event) {
		return this.addEditEvent(event);
	}

	@PostMapping("/event/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteEvent(@PathVariable("id") int eventId) {
		Event event = eventService.findById(eventId);
		eventService.deleteEvent(event);
	}

	@Transactional
	private ResponseEntity<?> addEditEvent(Event event) {
		Faculty faculty = facultyService.findByFacultyId(event.getFaculty().getFacultyId());

		if (faculty != null) {
			event.setFaculty(faculty);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(messageAccessor.get("event.faculty.invalid"));
		}

		Contact contact = contactService.findById(event.getContact().getContactId());

		if (contact != null) {
			event.setContact(contact);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(messageAccessor.get("event.contact.invalid"));
		}

		Set<Document> verifiedDocuments = new HashSet<>();

		for (Document document : event.getDocuments()) {
			Document tempDoc = documentService.findById(document.getDocumentId());

			if (tempDoc != null) {
				verifiedDocuments.add(tempDoc);
			}
		}

		// Persist the event first.
		event.setDocuments(verifiedDocuments);
		eventService.saveEvent(event);

		for (Document document : event.getDocuments()) {
			Document tempDoc = documentService.findByEvent(event);

			if (tempDoc == null) {
				if (!document.getEvents().contains(event)) {
					document.getEvents().add(event);	
				}
			}
		}

		return ResponseEntity.ok(eventService.saveEvent(event));
	}
}
