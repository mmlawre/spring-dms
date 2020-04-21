package org.fifthgen.springdms.data.repository;

import org.fifthgen.springdms.data.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {

	Contact findByContactId(int contactId);
}
