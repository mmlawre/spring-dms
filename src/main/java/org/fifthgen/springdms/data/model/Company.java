package org.fifthgen.springdms.data.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "company")
public class Company {

	@Id
	@NotEmpty
	private String companyName;

	@NotEmpty
	private String companyStreet;

	@NotEmpty
	private String companyCity;

	@NotEmpty
	private String companyState;

	@NotEmpty
	private String companyZip;

	@OneToMany(mappedBy = "contactCompany", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Contact> companyContacts;

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyStreet() {
		return companyStreet;
	}

	public void setCompanyStreet(String companyStreet) {
		this.companyStreet = companyStreet;
	}

	public String getCompanyCity() {
		return companyCity;
	}

	public void setCompanyCity(String companyCity) {
		this.companyCity = companyCity;
	}

	public String getCompanyState() {
		return companyState;
	}

	public void setCompanyState(String companyState) {
		this.companyState = companyState;
	}

	public String getCompanyZip() {
		return companyZip;
	}

	public void setCompanyZip(String companyZip) {
		this.companyZip = companyZip;
	}

	public Set<Contact> getCompanyContacts() {
		return companyContacts;
	}

	public void setCompanyContacts(Set<Contact> companyContacts) {
		this.companyContacts = companyContacts;
	}
}
