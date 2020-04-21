var dataTable;
var selectedRecord;

let eventTypes = {
	Meeting: 0,
	PhoneCall: 1, 
	Email: 2, 
	Referral: 3 
};

$(document).ready(() => { 	
	populateDataTable();
	
	loadFaculties();
	loadContacts();
	loadDocuments();
	
	loadEventTypes('#eventType');
	
	// Event handlers
	
	$('#addButton').click(() => {
		showAddEditModal('Add');
	});
	
	$('#newFacultyButton').click(() => {
		addEditFacultyCallback = faculty => {
			loadFaculties(faculty);
		};
		
		facultyModalParent = $('#addEditModal');
		showAddEditFacultyModal('Add');
	});
	
	$('#newContactButton').click(() => {
		addEditContactCallback = contact => {
			loadContacts(contact);
		};
		
		contactModalParent = $('#addEditModal');
		showAddEditContactModal('Add');
	});
	
	$('#newDocumentButton').click(() => {
		addEditDocumentCallback = documents => {
			loadDocuments(documents);
		};
		
		documentModalParent = $('#addEditModal');
		showAddEditDocumentModal('Add');
	});
	
	$('#dataTable').on('click', 'a.edit', function () {
		var data = dataTable.row($(this).parents('tr')).data();
		showAddEditModal('Edit', data);
	});
	
	$('#dataTable').on('click', 'a.delete', function () {
		var data = dataTable.row($(this).parents('tr')).data();
		showDeleteModal(data);
	});
	
	$('#addEditModal').on('hidden.bs.modal', () => {
		clearAddEditModal();
	});
	
	$('#deleteModal').on('hidden.bs.modal', () => {
		clearDeleteModal();
	});
	
	$('#addEditModalSubmit').click(() => {
		var url;
		
		let documents = [];
		let temp = $('#documents').val();
		
		if (temp && temp.length > 0) {
			for (let i = 0; i < temp.length; i++) {
				documents.push({
					documentId: parseInt(temp[i])
				});
			}
		}
		
		var event = {
			eventId: $('#eventId').val(),
			eventType: $('#eventType').val(),
			eventDate: $('#eventDate').val(),
			faculty: {
				facultyId: parseInt($('#faculty').val()),
			},
			contact: {
				contactId: parseInt($('#contact').val()),
			},
			documents: documents,
			eventNotes: $('#eventNotes').val()
		};
		
		if (event.eventId != "") {
			url = "/event/edit";
		} else {
			url = "/event/add";
		}
		
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(event),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function(data) {
				$('#addEditModal').modal('hide');
				showAlert('#successAlert', data);

				populateDataTable(true);
			}
		}).fail(function(data) {
			let errors = [];
			
			if (data.status === 500) {
				errors.push(data.responseText);
			} else if (data.responseJSON) {
				errors = data.responseJSON.errors;	
			} else {
				errors.push("Unspecified server error - " + data.status);
			}
			
			if (errors) {
				$('#addEditError').empty();
				errors.forEach(error => $('#addEditError').append('<li>' + error + '</li>'))
			}
			
			$('#addEditError').show();
		});
	});
	
	$('#deleteModalSubmit').click(function() {
		$.ajax({
			url: '/event/delete/' + selectedRecord.eventId,
			type: 'POST',
			success: function (data) {
				$('#deleteModal').modal('hide');
				showAlert('#successAlert', data);

				populateDataTable(true);
			}
		}).fail(function(data) {
			let errors = data.responseJSON.errors;
			
			if (errors) {
				$('#deleteError').empty();
				errors.forEach(error => $('#deleteError').append('<li>' + error + '</li>'))
			}
			
			$('#deleteError').show();
		});
	});
});

function populateDataTable(isReload = false) {
	if (isReload) {
		dataTable.ajax.reload();
		return;
	}
	
	dataTable = $('#dataTable').DataTable({
		ajax: {
			url: '/event',
			type: 'post',
			dataType: 'json',
			cache: false,
			dataSrc: ''
		},
		order: [[ 1, 'asc' ]],
		columns: [
			{ title: '<span class="custom-checkbox">' + 
				'<input type="checkbox" id="selectAll">' +
				'<label for="selectAll"></label>' +
				'</span>', data: null },
			{ title: 'ID', data: 'eventId' },
			{ title: 'Event Type', data: 'eventType' },
			{ title: 'Event Date', data: 'eventDate' },
			{ title: 'Contact Name', data: 'contact' },
			{ title: 'Faculty', data: 'faculty.facultyName' },
			{ title: 'Actions', data: null }
		],
		columnDefs: [
			{ targets: 0, data: null, defaultContent: '<span class="custom-checkbox">' +
				'<input type="checkbox" id="checkbox1" name="options[]"	value="1">' +
				'<label for="checkbox1"></label>' +
				'</span>', data: null, orderable: false, searchable: false },
			{ targets: 3, render: (data, type, row, meta) => {
				return new Date(data).toLocaleDateString();
			}},
			{ targets: 4, render: (data, type, row, meta) => {
				return data.firstName + ' ' + data.lastName;
			}},
			{ targets: -1, data: null, render: (data, type, row, meta) => { 
				return '<a class="edit">' +
				'<i id="edit" class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>' +
				'</a>' +
				'<a class="delete">' +
				'<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>' +
				'</a>'}, orderable: false, searchable: false }
		]
	});
}

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
		 },
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

function loadDocuments(value) {
	 $.ajax({
		 url: '/document',
		 type: 'post',
		 contentType: 'application/json; charset=utf-8',
		 success: function(data) {
			 $('#documents').empty();
			 $('#documents').html(defaultOption);
			 
			 for (entry of data) {
				 $('#documents').append($('<option>').val(entry.documentId).text(entry.documentName));
			 };
			 
			 if (value)
				 $('#documents').val(value);
		 },
	 });
}

function showAddEditModal(option, data) {
	$('#addEditModalTitle').text(option + ' Event');
	$('#addEditModalSubmit').val(option);
	
	if (option === 'Edit') {
		let documents = [];
		
		for (var i in data.documents) {
			documents.push(data.documents[i].documentId);
		}
		
		$('#eventId').val(data.eventId);
		$('#eventType').val(eventTypes[data.eventType]);
		
		document.getElementById("eventDate").valueAsDate = new Date(data.eventDate);
		
		$('#faculty').val(data.faculty.facultyId);
		$('#contact').val(data.contact.contactId);
		$('#documents').val(documents);
		$('#eventNotes').val(data.eventNotes);
	}

	$('#addEditModal').modal('show');
}

function clearAddEditModal() {
	$('#eventId').val("");
	$('#eventType').val("");
	$('#eventDate').val("");
	$('#faculty').val("");
	$('#contact').val("");
	$('#documents').val("");
	$('#eventNotes').val("");

	$('#addEditError').empty();
	$('#addEditError').hide();
}

function showDeleteModal(data) {
	selectedRecord = data;
	$('#deleteMessage').text("Are you sure you want to delete record " + data.eventId + "?");
	$('#deleteModal').modal('show');
}