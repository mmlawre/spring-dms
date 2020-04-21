package org.fifthgen.springdms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
public class SpringDmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringDmsApplication.class, args);
	}
}
