package org.fifthgen.springdms.data.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "contact")
public class Contact {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int contactId;

	@NotEmpty
	private String firstName;

	@NotEmpty
	private String lastName;

	@NotNull
	@ManyToOne
	@JsonIgnoreProperties("companyContacts")
	private Company contactCompany;

	@NotEmpty
	private String contactPhone;

	@NotEmpty
	private String email;

	@NotEmpty
	private String contactStreet;

	@NotEmpty
	private String contactCity;

	@NotEmpty
	private String contactState;

	@NotEmpty
	private String contactZIP;

	private String contactSpouseName;

	private String contactChildrenNames;

	private String contactNotes;

	@OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Event> events;

	public int getContactId() {
		return contactId;
	}

	public void setContactId(int contactId) {
		this.contactId = contactId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Company getContactCompany() {
		return contactCompany;
	}

	public void setContactCompany(Company contactCompany) {
		this.contactCompany = contactCompany;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactStreet() {
		return contactStreet;
	}

	public void setContactStreet(String contactStreet) {
		this.contactStreet = contactStreet;
	}

	public String getContactCity() {
		return contactCity;
	}

	public void setContactCity(String contactCity) {
		this.contactCity = contactCity;
	}

	public String getContactState() {
		return contactState;
	}

	public void setContactState(String contactState) {
		this.contactState = contactState;
	}

	public String getContactZIP() {
		return contactZIP;
	}

	public void setContactZIP(String contactZIP) {
		this.contactZIP = contactZIP;
	}

	public String getContactSpouseName() {
		return contactSpouseName;
	}

	public void setContactSpouseName(String contactSpouseName) {
		this.contactSpouseName = contactSpouseName;
	}

	public String getContactChildrenNames() {
		return contactChildrenNames;
	}

	public void setContactChildrenNames(String contactChildrenNames) {
		this.contactChildrenNames = contactChildrenNames;
	}

	public String getContactNotes() {
		return contactNotes;
	}

	public void setContactNotes(String contactNotes) {
		this.contactNotes = contactNotes;
	}

	public Set<Event> getEvents() {
		return events;
	}

	public void setEvents(Set<Event> events) {
		this.events = events;
	}

	@Override
	public String toString() {
		return firstName + " " + lastName;
	}

}
