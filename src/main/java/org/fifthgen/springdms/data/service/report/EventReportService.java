package org.fifthgen.springdms.data.service.report;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.fifthgen.springdms.data.model.Event;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRCsvExporter;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleWriterExporterOutput;

@Service
public class EventReportService {

	public byte[] generateReport(final List<Event> events, String username, boolean isCSV) {
		byte[] data = null;

		try (final InputStream stream = this.getClass().getResourceAsStream("/reports/event-report.jrxml");) {
			final JasperReport report = JasperCompileManager.compileReport(stream);
			JRSaver.saveObject(report, "event-report-template.jasper");

			final JRBeanCollectionDataSource source = new JRBeanCollectionDataSource(events);

			final Map<String, Object> parameters = new HashMap<>();
			parameters.put("createdBy", username);

			final JasperPrint print = JasperFillManager.fillReport(report, parameters, source);

			if (isCSV) {
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				JRCsvExporter csvExporter = new JRCsvExporter();
				csvExporter.setExporterInput(new SimpleExporterInput(print));
				csvExporter.setExporterOutput(new SimpleWriterExporterOutput(baos));
				csvExporter.exportReport();
				
				data = baos.toByteArray();
			} else {
				data = JasperExportManager.exportReportToPdf(print);	
			}
		} catch (JRException | IOException e) {
			Logger.getGlobal().log(Level.SEVERE, "Couldn't generate report: " + e.getLocalizedMessage());
		}

		return data;
	}
}
	