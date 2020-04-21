$(document).ready(() => {
	loadEventTypes("#eventType");
	loadContacts();
	loadFaculties();
	
	// Reset form data.
	clearForm()
	
	$(".generate-report").click(function (event) {
		let reportType = $("#reportType");
		
		if (event.target.id == "pdfReport")
			reportType.val("PDF");
		else
			reportType.val("CSV");
		
		$("#reportForm").submit();
	});
});

function loadContacts(value) {
	$.ajax({
		url: '/contacts',
		type: 'post',
		contentType: 'application/json; charset=utf-8',
		success: function(data) {
			$('#contact').empty();
			$('#contact').html(defaultOption);
			 
			for (entry of data) {
				let optionText = entry.firstName + ' ' + entry.lastName + ' (' +  entry.email + ')';
				$('#contact').append($('<option>').val(entry.contactId).text(optionText));
			};
			 
			if (value)
				$('#contact').val(value);
		}
	});
}

function loadFaculties(value) {
	 $.ajax({
		 url: '/faculty',
		 type: 'post',
		 contentType: 'application/json; charset=utf-8',
		 success: function(data) {
			 $('#faculty').empty();
			 $('#faculty').html(defaultOption);
			 
			 for (entry of data) {
				 $('#faculty').append($('<option>').val(entry.facultyId).text(entry.facultyName));
			 };
			 
			 if (value)
				 $('#faculty').val(value);
		 },
	 });
}

function clearForm() {
	$('#eventType').val("");
	

	document.getElementById('dateTo').valueAsDate = new Date();
	
	let d = new Date();
	d.setMonth(d.getMonth() - 1);
	document.getElementById('dateFrom').valueAsDate = d;
	
	
	$('#contact').val("");
	$('#faculty').val("");
}