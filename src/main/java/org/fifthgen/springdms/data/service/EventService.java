package org.fifthgen.springdms.data.service;

import java.util.Date;
import java.util.List;

import org.fifthgen.springdms.data.model.Event;
import org.fifthgen.springdms.data.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

	@Autowired
	private EventRepository eventRepository;

	public Event saveEvent(Event event) {
		return eventRepository.save(event);
	}

	public void deleteEvent(Event event) {
		eventRepository.delete(event);
	}

	public Event findById(int id) {
		return eventRepository.findByEventId(id);
	}	

	public List<Event> findAllBetween(Date from, Date to) {
		return eventRepository.findByEventDateBetween(from, to);
	}
	
	public List<Event> getAll() {
		return eventRepository.findAll();
	}
}
