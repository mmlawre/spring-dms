package org.fifthgen.springdms;

import javax.annotation.PostConstruct;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.stereotype.Component;

@Component
@Configuration
public class MessageAccessor {

	private MessageSourceAccessor accessor;

	@PostConstruct
	private void init() {
		accessor = new MessageSourceAccessor(messageSource());
	}

	public String get(String property) {
		return accessor.getMessage(property);
	}

	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

		messageSource.setBasename("classpath:ValidationMessages");
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
	}
}
