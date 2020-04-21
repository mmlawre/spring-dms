package org.fifthgen.springdms.rest.controller;

import java.util.List;

import javax.validation.Valid;

import org.fifthgen.springdms.MessageAccessor;
import org.fifthgen.springdms.data.model.Company;
import org.fifthgen.springdms.data.model.Contact;
import org.fifthgen.springdms.data.service.CompanyService;
import org.fifthgen.springdms.data.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class ContactRestController {

	@Autowired
	private ContactService contactService;

	@Autowired
	private CompanyService companyService;

	@Autowired
	private MessageAccessor messageAcessor;

	@PostMapping("/contacts")
	@ResponseBody
	public List<Contact> getAllContacts() {
		List<Contact> contacts = contactService.getAll();

		return contacts;
	}

	@PostMapping("/contacts/add")
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public ResponseEntity<?> addContact(@Valid @RequestBody Contact contact) {
		return this.addEditContact(contact);
	}

	@PostMapping("/contacts/edit")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> updateContact(@Valid @RequestBody Contact contact) {
		return this.addEditContact(contact);
	}

	@PostMapping("/contacts/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteContact(@PathVariable("id") int contactid) {
		Contact contact = contactService.findById(contactid);
		contactService.deleteContact(contact);
	}

	private ResponseEntity<?> addEditContact(Contact contact) {
		Company company = companyService.findByCompanyName(contact.getContactCompany().getCompanyName());

		if (company != null) {
			contact.setContactCompany(company);
			return ResponseEntity.ok(contactService.saveContact(contact));
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(messageAcessor.get("contact.company.invalid"));
	}
}
