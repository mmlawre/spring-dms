let addEditCompanyCallback;
let companyModalParent;

$(document).ready(() => {
	loadStates('#companyState');
	
	$('#addEditModal').on('hidden.bs.modal', () => {
		clearAddEditCompanyModal();
	});
	
	$('#addEditCompanyModal').on('show.bs.modal', function () {
		companyModalParent.css('opacity', 0);
	});
	 
	$('#addEditCompanyModal').on('hidden.bs.modal', function () {
		companyModalParent.css('opacity', 1);
		clearAddEditCompanyModal();
	});
	
	$('#addEditCompanyModalSubmit').click(() => {
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
				$('#addEditCompanyModal').modal('hide');
			
				addEditCompanyCallback(data.companyName);
			}
		}).fail(function(data) {
			let errors = data.responseJSON.errors;
			
			if (errors) {
				$('#addEditCompanyError').empty();
				errors.forEach(error => $('#addEditCompanyError').append('<li>' + error + '</li>'))
			}
			
			$('#addEditCompanyError').show();
		});
	});
});

function showAddEditCompanyModal(option, data) {
	$('#addEditCompanyModalTitle').text(option + ' Company');
	$('#addEditCompanyModalSubmit').val(option);
	
	if (option === 'Edit') {
		$('#companyName').val(data.companyName);
		$('#companyStreet').val(data.companyStreet);
		$('#companyCity').val(data.companyCity);
		$('#companyState').val(data.companyState);
		$('#companyZip').val(data.companyZip);
	}

	$('#addEditCompanyModal').modal('show');
}

function clearAddEditCompanyModal() {
	$('#companyName').val("");
	$('#companyStreet').val("");
	$('#companyCity').val("");
	$('#companyState').val("");
	$('#companyZip').val("");

	$('#addEditCompanyError').empty();
	$('#addEditCompanyError').hide();
}