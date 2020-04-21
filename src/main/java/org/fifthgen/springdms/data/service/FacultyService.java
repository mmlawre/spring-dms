package org.fifthgen.springdms.data.service;

import java.util.List;

import org.fifthgen.springdms.data.model.Faculty;
import org.fifthgen.springdms.data.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacultyService {

	@Autowired
	private FacultyRepository facultyRepository;
	
	public Faculty saveFaculty(Faculty faculty) {
		return facultyRepository.save(faculty);
	}

	public void deleteFaculty(Faculty faculty) {
		facultyRepository.delete(faculty);
	}
	
	public Faculty findByFacultyId(int facultyId) {
		return facultyRepository.findByFacultyId(facultyId);
	}
	
	public List<Faculty> getAll() {
		return facultyRepository.findAll();
	}
}	
