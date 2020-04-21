package org.fifthgen.springdms.data.service;

import java.util.List;

import org.fifthgen.springdms.data.model.Document;
import org.fifthgen.springdms.data.model.Event;
import org.fifthgen.springdms.data.repository.DocumentRepositiry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {

	@Autowired
	private DocumentRepositiry documentRepository;

	public Document saveDocument(Document document) {
		return documentRepository.save(document);
	}

	public void deleteDocument(Document document) {
		documentRepository.delete(document);
	}

	public Document findById(int id) {
		return documentRepository.findByDocumentId(id);
	}

	public Document findByEvent(Event event) {
		return documentRepository.findByEvents_EventId(event.getEventId());
	}

	public List<Document> getAll() {
		return documentRepository.findAll();
	}
}
