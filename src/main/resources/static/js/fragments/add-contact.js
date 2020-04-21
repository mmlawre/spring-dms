let addEditContactCallback;
let contactModalParent;

$(document).ready(() => {
	loadCompanies();
	
	loadStates('#contactState');

	$('#addEditModal').on('hidden.bs.modal', () => {
		clearAddEditContactModal();
	});
	
	$('#addEditContactModal').on('show.bs.modal', function () {
		contactModalParent.css('opacity', 0);
	});
	 
	$('#addEditContactModal').on('hidden.bs.modal', function () {
		contactModalParent.css('opacity', 1);
		clearAddEditContactModal();
	});
	
	$('#newCompanyButton').click(() => {
		addEditCompanyCallback = company => {
			loadCompanies(company);
		};
		
		companyModalParent = $('#addEditContactModal');
		showAddEditCompanyModal('Add');
	});
	
	$('#addEditContactModalSubmit').click(() => {
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
				$('#addEditContactModal').modal('hide');

				addEditContactCallback(data.contactId);
			}
		}).fail(function(data) {
			let errors = [];
			
			if (data.status === 500) {
				errors.push(data.responseText);
			} else {
				errors = data.responseJSON.errors;	
			}
			
			if (errors) {
				$('#addEditContactError').empty();
				errors.forEach(error => $('#addEditContactError').append('<li>' + error + '</li>'))
			}
			
			$('#addEditContactError').show();
		});
	});
});

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

function showAddEditContactModal(option, data) {
	$('#addEditContactModalTitle').text(option + ' Contact');
	$('#addEditContactModalSubmit').val(option);
	
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

	$('#addEditContactModal').modal('show');
}

function clearAddEditContactModal() {
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

	$('#addEditContactError').empty();
	$('#addEditContactError').hide();
}