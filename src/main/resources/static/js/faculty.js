var dataTable;
var selectedRecord;

$(document).ready(() => { 	
	populateDataTable();
		
	// Event handlers
	
	$('#addButton').click(() => {
		showAddEditModal('Add');
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
		var faculty = {
			facultyId: parseInt($('#facultyId').val()) ? parseInt($('#facultyId').val()) : -1,
			facultyName: $('#facultyName').val(),
			department: $('#department').val(),
			email: $('#email').val()
		};
		
		if (faculty.facultyId > -1) {
			url = "/faculty/edit";
		} else {
			url = "/faculty/add";
		}
		
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(faculty),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function(data) {
				$('#addEditModal').modal('hide');
				showAlert('#successAlert', data);

				populateDataTable(true);
			}
		}).fail(function(data) {
			let errors = data.responseJSON.errors;
			
			if (errors) {
				$('#addEditError').empty();
				errors.forEach(error => $('#addEditError').append('<li>' + error + '</li>'))
			}
			
			$('#addEditError').show();
		});
	});
	
	$('#deleteModalSubmit').click(function() {
		$.ajax({
			url: '/faculty/delete/' + selectedRecord.facultyId,
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
			url: '/faculty',
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
			{ title: 'ID', data: 'facultyId' },
			{ title: 'Faculty Name', data: 'facultyName' },
			{ title: 'Department', data: 'department' },
			{ title: 'E-mail', data: 'email' },
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

function showAddEditModal(option, data) {
	$('#addEditModalTitle').text(option + ' Faculty');
	$('#addEditModalSubmit').val(option);
	
	if (option === 'Edit') {
		$('#facultyId').val(data.facultyId);
		$('#facultyName').val(data.facultyName);
		$('#department').val(data.department);
		$('#email').val(data.email);
	}

	$('#addEditModal').modal('show');
}

function clearAddEditModal() {
	$('#facultyName').val("");
	$('#department').val("");
	$('#email').val("");

	$('#addEditError').empty();
	$('#addEditError').hide();
}

function showDeleteModal(data) {
	selectedRecord = data;
	$('#deleteMessage').text("Are you sure you want to delete record " + data.facultyId + "?");
	$('#deleteModal').modal('show');
}