package org.fifthgen.springdms.data.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.fifthgen.springdms.data.enumerated.EventType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "event")
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int eventId;

	@NotNull	
	@Enumerated(EnumType.STRING)
	private EventType eventType;

	@NotNull
	private Date eventDate;	

	@NotNull
	@ManyToOne(cascade = CascadeType.ALL)		
	@JsonIgnoreProperties("events")
	private Contact contact;

	@NotNull
	@ManyToOne
	@JsonIgnoreProperties("facultyEvents")
	private Faculty faculty;

	@ManyToMany(mappedBy = "events", cascade = CascadeType.ALL)	
	@JsonIgnoreProperties("events")
	private Set<Document> documents;

	private String eventNotes;

	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	public EventType getEventType() {
		return eventType;
	}

	public void setEventType(EventType eventType) {
		this.eventType = eventType;
	}

	public Date getEventDate() {
		return eventDate;
	}

	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public Faculty getFaculty() {
		return faculty;
	}

	public void setFaculty(Faculty faculty) {
		this.faculty = faculty;
	}

	public String getEventNotes() {
		return eventNotes;
	}

	public void setEventNotes(String eventNotes) {
		this.eventNotes = eventNotes;
	}

	public Set<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(Set<Document> document) {
		this.documents = document;
	}
}
