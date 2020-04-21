let addEditDocumentCallback;
let documentModalParent;
let fileData;

$(document).ready(() => {
	
	$('#addEditModal').on('hidden.bs.modal', () => {
		clearAddEditDocumentModal();
	});
	
	$('#addEditDocumentModal').on('show.bs.modal', function () {
		documentModalParent.css('opacity', 0);
	});
	 
	$('#addEditDocumentModal').on('hidden.bs.modal', function () {
		documentModalParent.css('opacity', 1);
		clearAddEditDocumentModal();
	});
	
	$('#addEditDocumentModalSubmit').click(() => {
		var url;
		
	    var files = $('#file').prop('files');
	    
	    if (files.length > 0) {
	    	fileName = files[0].name;
	    	fileData = new Blob([files[0]]);
		    var promise = new Promise(getBase64);
		    
		    promise.then(function(data) {
		    	uploadFile(fileName, data);
		    }).catch(function(err) {
		    	$('#addEditDocumentError').empty();
		    	$('#addEditDocumentError').append('<li>' + err + '</li>');
		    	$('#addEditDocumentError').show();
		    });
	    } else {
	    	uploadFile("");
	    }
	});
});

function uploadFile(fileName, data) {
	var document = {
		documentName: $('#documentName').val(),
		fileName: fileName,
		file: data,
	};
	
	if (document.documentId) {
		url = "/document/edit";
	} else {
		url = "/document/add";
	}
	
	$.ajax({
		url: url,
		type: 'POST',
		data: JSON.stringify(document),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(data) {
			$('#addEditDocumentModal').modal('hide');
		
			addEditDocumentCallback(data.documentId);
		}
	}).fail(function(data) {
		let errors = [];
		
		if (data.responseJSON) {
			errors = data.responseJSON.errors;
		} else {
			errors.push("An unspecified error occurred - " + data.status);
		}
		
		if (errors) {
			$('#addEditDocumentError').empty();
			errors.forEach(error => $('#addEditDocumentError').append('<li>' + error + '</li>'))
		}
		
		$('#addEditDocumentError').show();
	});
}

function showAddEditDocumentModal(option, data) {
	$('#addEditDocumentModalTitle').text(option + ' Document');
	$('#addEditDocumentModalSubmit').val(option);
	
	if (option === 'Edit') {
		$('#documentName').val(data.documentName);
		$('#file').val(data.document);
	}

	$('#addEditDocumentModal').modal('show');
}

function clearAddEditDocumentModal() {
	$('#documentName').val("");
	$('#file').val("");
	$('.custom-file-label').html("");

	$('#addEditDocumentError').empty();
	$('#addEditDocumentError').hide();
}

function getBase64(resolve) {
    var reader = new FileReader();
    reader.readAsDataURL(fileData);
    
    reader.onload = function() {
    	resolve(reader.result);
    }
}