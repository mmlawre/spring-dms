var dataTable;
var selectedRecord;

$(document).ready(() => { 	
	populateDataTable();
	
	loadStates('#companyState');
	
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
		var company = {
			companyName: $('#companyName').val(),
			companyStreet: $('#companyStreet').val(),
			companyCity: $('#companyCity').val(),
			companyState: $('#companyState').val(),
			companyZip: $('#companyZip').val()
		};
		
		if (company.companyName != "") {
			url = "/company/edit";
		} else {
			url = "/company/add";
		}
		
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(company),
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
			url: '/company/delete/' + selectedRecord.companyName,
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
			url: '/company',
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
			{ title: 'Company Name', data: 'companyName' },
			{ title: 'Company Street', data: 'companyStreet' },
			{ title: 'Company City', data: 'companyCity' },
			{ title: 'Company State', data: 'companyState' },
			{ title: 'Company ZIP', data: 'companyZip' },
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
	$('#addEditModalTitle').text(option + ' Company');
	$('#addEditModalSubmit').val(option);
	
	if (option === 'Edit') {
		$('#companyName').val(data.companyName);
		$('#companyStreet').val(data.companyStreet);
		$('#companyCity').val(data.companyCity);
		$('#companyState').val(data.companyState);
		$('#companyZip').val(data.companyZip);
	}

	$('#addEditModal').modal('show');
}

function clearAddEditModal() {
	$('#companyName').val("");
	$('#companyStreet').val("");
	$('#companyCity').val("");
	$('#companyState').val("");
	$('#companyZip').val("");

	$('#addEditError').empty();
	$('#addEditError').hide();
}

function showDeleteModal(data) {
	selectedRecord = data;
	$('#deleteMessage').text("Are you sure you want to delete record " + data.companyName + "?");
	$('#deleteModal').modal('show');
}