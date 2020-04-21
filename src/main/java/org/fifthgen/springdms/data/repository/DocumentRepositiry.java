package org.fifthgen.springdms.data.repository;

import org.fifthgen.springdms.data.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepositiry extends JpaRepository<Document, Integer> {

	Document findByDocumentId(int documentId);
	
	Document findByEvents_EventId(int eventId);
}
	