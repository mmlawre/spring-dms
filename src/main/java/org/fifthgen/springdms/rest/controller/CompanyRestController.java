package org.fifthgen.springdms.rest.controller;

import java.util.List;

import javax.validation.Valid;

import org.fifthgen.springdms.data.model.Company;
import org.fifthgen.springdms.data.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompanyRestController {

	@Autowired
	private CompanyService companyService;
	
	@PostMapping("/company")
	@ResponseBody
	public List<Company> getAllCompanies() {
		List<Company> companies = companyService.getAll();

		return companies;
	}
	
	@PostMapping("/company/add")
	@ResponseStatus(HttpStatus.CREATED)
	public Company addCompany(@Valid @RequestBody Company company) {
		return companyService.saveCompany(company);
	}

	@PostMapping("/company/edit")
	@ResponseStatus(HttpStatus.OK)	
	public Company updateCompany(@Valid @RequestBody Company company) {
		return companyService.saveCompany(company);
	}

	@PostMapping("/company/delete/{name}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteCompany(@PathVariable("name") String companyName) {
		Company company = companyService.findByCompanyName(companyName);
		companyService.deleteCompany(company);
	}
}
