package org.fifthgen.springdms.data.repository;

import java.util.Date;
import java.util.List;

import org.fifthgen.springdms.data.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

	Event findByEventId(int eventId);
	
	List<Event> findByEventDateBetween(Date startDate, Date endDate);
}
