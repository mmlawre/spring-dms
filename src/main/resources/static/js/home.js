var eventsTable, contactsTable;

$(document).ready(() => { 	
	populateEventsDataTable();
	populateContactsDataTable();
});

function populateEventsDataTable(isReload = false) {
	if (isReload) {
		eventsTable.ajax.reload();
		return;
	}
	
	eventsTable = $('#eventsTable').DataTable({
		ajax: {
			url: '/event',
			type: 'post',
			dataType: 'json',
			cache: false,
			dataSrc: ''
		},
		order: [[ 1, 'asc' ]],
		columns: [
			{ title: 'ID', data: 'eventId' },
			{ title: 'Event Type', data: 'eventType' },
			{ title: 'Event Date', data: 'eventDate' },
			{ title: 'Contact Name', data: 'contact' },
			{ title: 'Faculty', data: 'faculty.facultyName' },
			{ title: 'Documents', data: 'documents' }
		],
		columnDefs: [
			{ targets: 2, render: (data, type, row, meta) => {
				return new Date(data).toLocaleDateString();
			}},
			{ targets: 3, render: (data, type, row, meta) => {
				return data.firstName + ' ' + data.lastName;
			}},
			{ targets: 5, render: (data, type, row, meta) => {
				let files = '';
				let iterations = data.length;
				
				for (let i in data) {
					files += data[i].documentName;
					
					if (--iterations)
						files += ', ';
				}
				
				return files;
			}}
		]
	});
}

function populateContactsDataTable(isReload = false) {
	if (isReload) {
		contactsTable.ajax.reload();
		return;
	}
	
	contactsTable = $('#contactsTable').DataTable({
		ajax: {
			url: '/contacts',
			type: 'post',
			dataType: 'json',
			cache: false,
			dataSrc: ''
		},
		order: [[ 1, 'asc' ]],
		columns: [
			{ title: 'ID', data: 'contactId' },
			{ title: 'Company', data: 'contactCompany.companyName' },
			{ title: 'First Name', data: 'firstName' },
			{ title: 'Last Name', data: 'lastName' },
			{ title: 'Phone No.', data: 'contactPhone' },
			{ title: 'Email', data: 'email' },
		]
	});
}