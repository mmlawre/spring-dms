var dataTable;
var selectedRecord;

$(document).ready(() => { 	
	populateDataTable();
	
	$('#dataTable').on('click', 'a.download', function () {
		var data = dataTable.row($(this).parents('tr')).data();
		downloadFile(data);
	});
	
	$('#dataTable').on('click', 'a.delete', function () {
		var data = dataTable.row($(this).parents('tr')).data();
		showDeleteModal(data);
	});
	
	$('#deleteModal').on('hidden.bs.modal', () => {
		clearDeleteModal();
	});
	
	$('#deleteModalSubmit').click(function() {
		$.ajax({
			url: '/document/delete/' + selectedRecord.documentId,
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
			url: '/document',
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
			{ title: 'ID', data: 'documentId' },
			{ title: 'Document Name', data: 'documentName' },
			{ title: 'File Name', data: 'fileName' },
			{ title: 'Event ID', mData: 'events', mRender: '[, ].eventId' },
			{ title: 'Actions', data: 'events' }
		],
		columnDefs: [
			{ targets: 0, data: null, defaultContent: '<span class="custom-checkbox">' +
				'<input type="checkbox" id="checkbox1" name="options[]"	value="1">' +
				'<label for="checkbox1"></label>' +
				'</span>', data: null, orderable: false, searchable: false },
			{ targets: -1, data: null, render: (data, type, row, meta) => { 
				let deleteBtn = "";
				
				if (data.length == 0) {
					deleteBtn = '<a class="delete">' +
					'<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>' +
					'</a>'
				}
				
				return '<a class="download">' +
				'<i id="download" class="material-icons" data-toggle="tooltip" title="Download">&#xE2C0;</i>' +
				'</a>' + deleteBtn }, orderable: false, searchable: false }
		]
	});
}

function SaveAsFile(t, f, m) {
    try {
        var b = new Blob([t],{type:m});
        saveAs(b, f);
    } catch (e) {
        window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
}

function downloadFile(data) {
	saveAs(data.file, data.fileName);
}

function showDeleteModal(data) {
	selectedRecord = data;
	$('#deleteMessage').text("Are you sure you want to delete record " + data.documentId + "?");
	$('#deleteModal').modal('show');
}
