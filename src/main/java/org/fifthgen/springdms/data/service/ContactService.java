package org.fifthgen.springdms.data.service;

import java.util.List;

import org.fifthgen.springdms.data.model.Contact;
import org.fifthgen.springdms.data.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

	@Autowired
	private ContactRepository contactRepository;

	public Contact saveContact(Contact contact) {
		return contactRepository.save(contact);
	}

	public void deleteContact(Contact contact) {
		contactRepository.delete(contact);
	}

	public Contact findById(int id) {
		return contactRepository.findByContactId(id);
	}

	public List<Contact> getAll() {
		return contactRepository.findAll();
	}
}
