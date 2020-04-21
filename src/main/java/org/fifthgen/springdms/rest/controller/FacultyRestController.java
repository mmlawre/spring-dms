package org.fifthgen.springdms.rest.controller;

import java.util.List;

import javax.validation.Valid;

import org.fifthgen.springdms.data.model.Faculty;
import org.fifthgen.springdms.data.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FacultyRestController {
	
	@Autowired
	private FacultyService facultyService;

	@PostMapping("/faculty")
	@ResponseBody	
	public List<Faculty> getAllFaculties() {
		List<Faculty> faculties = facultyService.getAll();
		return faculties;
	}

	@PostMapping("/faculty/add")
	@ResponseStatus(HttpStatus.CREATED)
	public Faculty addCompany(@Valid @RequestBody Faculty faculty) {
		return facultyService.saveFaculty(faculty);
	}

	@PostMapping("/faculty/edit")
	@ResponseStatus(HttpStatus.OK)
	public Faculty updateCompany(@Valid @RequestBody Faculty faculty) {
		return facultyService.saveFaculty(faculty);
	}

	@PostMapping("/faculty/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteCompany(@PathVariable("id") int facultyId) {
		Faculty faculty = facultyService.findByFacultyId(facultyId);
		facultyService.deleteFaculty(faculty);
	}
}
