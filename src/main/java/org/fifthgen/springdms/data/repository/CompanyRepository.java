package org.fifthgen.springdms.data.repository;

import org.fifthgen.springdms.data.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {

	Company findByCompanyName(String companyName);
}
