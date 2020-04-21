var dataTable;
var selectedRecord;

$(document).ready(() => { 	
	populateDataTable();
	
	loadCompanies();
	
	loadStates('#contactState');
	
	// Select / Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
	
	// Event handlers
	
	$('#addButton').click(() => {
		showAddEditModal('Add');
	});
	
	$('#newCompanyButton').click(() => {
		addEditCompanyCallback = company => {
			loadCompanies(company);
		};
		
		companyModalParent = $('#addEditModal');
		showAddEditCompanyModal('Add');
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
		var contact = {
			contactId: parseInt($('#contactId').val()) ? parseInt($('#contactId').val()) : -1,
			contactCompany: {
				companyName: $('#contactCompany').val(),
			},
			firstName: $('#firstName').val(),
			lastName: $('#lastName').val(),
			contactPhone: $('#contactPhone').val(),
			email: $('#email').val(),
			contactStreet: $('#contactStreet').val(),
			contactCity: $('#contactCity').val(),
			contactState: $('#contactState').val(),
			contactZIP: $('#contactZIP').val(),
			contactSpouseName: $('#contactSpouseName').val(),
			contactChildrenNames: $('#contactChildrenNames').val(),
			contactNotes: $('#contactNotes').val()
		};
		
		if (contact.contactId > -1) {
			url = "/contacts/edit";
		} else {
			url = "/contacts/add";
		}
		
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(contact),
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
			} else {
				errors = data.responseJSON.errors;	
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
			url: '/contacts/delete/' + selectedRecord.contactId,
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
			url: '/contacts',
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
			{ title: 'ID', data: 'contactId' },
			{ title: 'Company', data: 'contactCompany.companyName' },
			{ title: 'First Name', data: 'firstName' },
			{ title: 'Last Name', data: 'lastName' },
			{ title: 'Phone No.', data: 'contactPhone' },
			{ title: 'Email', data: 'email' },
			{ title: 'Actions', data: null }
		],
		columnDefs: [
			{ targets: 0, data: null, defaultContent: '<span class="custom-checkbox">' +
				'<input type="checkbox" id="checkbox1" name="options[]"	value="1">' +
				'<label for="checkbox1"></label>' +
				'</span>', data: null, orderable: false, searchable: false },
			{ targets: 2, width: '40%' },
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

function loadCompanies(value) {
	 $.ajax({
		 url: '/company',
		 type: 'post',
		 contentType: 'application/json; charset=utf-8',
		 success: function(data) {
			 $('#contactCompany').empty();
			 $('#contactCompany').html(defaultOption);
			 
			 for (entry of data) {
				 $('#contactCompany').append($('<option>').val(entry.companyName).text(entry.companyName));
			 };
			 
			 if (value)
				 $('#contactCompany').val(value);
		 },
	 });
}

function showAddEditModal(option, data) {
	$('#addEditModalTitle').text(option + ' Contact');
	$('#addEditModalSubmit').val(option);
	
	if (option === 'Edit') {
		$('#contactId').val(data.contactId);
		$('#contactCompany').val(data.contactCompany.companyName);
		$('#firstName').val(data.firstName);
		$('#lastName').val(data.lastName);
		$('#contactPhone').val(data.contactPhone);
		$('#email').val(data.email);
		$('#contactStreet').val(data.contactStreet);
		$('#contactCity').val(data.contactCity);
		$('#contactState').val(data.contactState);
		$('#contactZIP').val(data.contactZIP);
		$('#contactSpouseName').val(data.contactSpouseName);
		$('#contactChildrenNames').val(data.contactChildrenNames);
		$('#contactNotes').val(data.contactNotes);
	}

	$('#addEditModal').modal('show');
}

function clearAddEditModal() {
	$('#contactCompany').val("");
	$('#contactId').val("");
	$('#firstName').val("");
	$('#lastName').val("");
	$('#contactPhone').val("");
	$('#email').val("");
	$('#contactStreet').val("");
	$('#contactCity').val("");
	$('#contactState').val("");
	$('#contactZIP').val("");
	$('#contactSpouseName').val("");
	$('#contactChildrenNames').val("");
	$('#contactNotes').val("");

	$('#addEditError').empty();
	$('#addEditError').hide();
}

function showDeleteModal(data) {
	selectedRecord = data;
	$('#deleteMessage').text("Are you sure you want to delete record " + data.contactId + "?");
	$('#deleteModal').modal('show');
}