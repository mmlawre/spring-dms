package org.fifthgen.springdms.rest.controller;

import java.util.List;

import javax.validation.Valid;

import org.fifthgen.springdms.data.model.Document;
import org.fifthgen.springdms.data.service.DocumentService;
import org.fifthgen.springdms.rest.exception.ObjectNotDetachedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DocumentRestController {

	@Autowired
	private DocumentService documentService;

	@PostMapping("/document")
	@ResponseBody
	public List<Document> getDocuments() {
		List<Document> documents = documentService.getAll();

		return documents;
	}

	@PostMapping("/document/add")
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public ResponseEntity<?> addDocument(@Valid @RequestBody Document document) {
		return this.addEditDocument(document);
	}

	@PostMapping("/document/edit")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> updateDocument(@Valid @RequestBody Document document) {
		return this.addEditDocument(document);
	}

	@PostMapping("/document/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteDocument(@PathVariable("id") int documentId) throws ObjectNotDetachedException {
		Document document = documentService.findById(documentId);

		if (document.getEvents().isEmpty()) {
			documentService.deleteDocument(document);
		} else {
			throw new ObjectNotDetachedException();
		}
	}

	private ResponseEntity<?> addEditDocument(Document document) {
		return ResponseEntity.ok(documentService.saveDocument(document));
	}
}
