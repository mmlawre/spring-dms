let addEditFacultyCallback;
let facultyModalParent;

$(document).ready(() => {
	
	$('#addEditModal').on('hidden.bs.modal', () => {
		clearAddEditFacultyModal();
	});
	
	$('#addEditFacultyModal').on('show.bs.modal', function () {
		facultyModalParent.css('opacity', 0);
	});
	 
	$('#addEditFacultyModal').on('hidden.bs.modal', function () {
		facultyModalParent.css('opacity', 1);
		clearAddEditFacultyModal();
	});
	
	$('#addEditFacultyModalSubmit').click(() => {
		var url;
		
		var faculty = {
			facultyName: $('#facultyName').val(),
			department: $('#department').val(),
			email: $('#facultyEmail').val()
		};
		
		if (faculty.facultyId) {
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
				$('#addEditFacultyModal').modal('hide');
			
				addEditFacultyCallback(data.facultyId);
			}
		}).fail(function(data) {
			let errors = [];
			
			if (data.responseJSON) {
				errors = data.responseJSON.errors;
			} else {
				errors.push("An unspecified error occurred - " + data.status);
			}
			
			if (errors) {
				$('#addEditFacultyError').empty();
				errors.forEach(error => $('#addEditFacultyError').append('<li>' + error + '</li>'))
			}
			
			$('#addEditFacultyError').show();
		});
	});
});
	
function showAddEditFacultyModal(option, data) {
	$('#addEditFacultyModalTitle').text(option + ' Faculty');
	$('#addEditFacultyModalSubmit').val(option);
	
	if (option === 'Edit') {
		$('#facultyName').val(data.facultyName);
		$('#department').val(data.department);
		$('#facultyEmail').val(data.email);
	}

	$('#addEditFacultyModal').modal('show');
}

function clearAddEditFacultyModal() {
	$('#facultyName').val("");
	$('#department').val("");
	$('#facultyEmail').val("");

	$('#addEditFacultyError').empty();
	$('#addEditFacultyError').hide();
}