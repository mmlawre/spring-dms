package org.fifthgen.springdms.data.service;

import java.util.List;

import org.fifthgen.springdms.data.model.Company;
import org.fifthgen.springdms.data.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

	@Autowired
	private CompanyRepository companyRepository;

	public Company saveCompany(Company company) {
		return companyRepository.save(company);
	}

	public void deleteCompany(Company company) {
		companyRepository.delete(company);
	}
	
	public Company findByCompanyName(String companyName) {
		return companyRepository.findByCompanyName(companyName);
	}
	
	public List<Company> getAll() {
		return companyRepository.findAll();
	}
}
