package org.fifthgen.springdms.data.repository;

import org.fifthgen.springdms.data.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Integer>{

	Faculty findByFacultyId(int id);
}
