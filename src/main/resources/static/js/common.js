const defaultOption = "<option value=\"\" selected disabled hidden=\"true\">Choose value</option>";

/**
 * Changes .custom-file-input class to show file name upon file selection.
 * 
 * @returns
 */
$(".custom-file-input").on("change", function() {
	var fileName = $(this).val().split("\\").pop();
	$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

/**
 * Load states into a combo box.
 * 
 * @param comboBox Combo box / drop down to load data into.
 * @returns
 */
function loadStates(comboBox) {
	 $.getJSON('/json/states.json', data => {
		 $.each(data, (key, val) => {
			 $(comboBox).append($('<option>').val(key).text(val));
		 }); 
	 });
}

/**
 * Load event types into a combo box.
 * 
 * @param comboBox Combo box / drop down to load data into.
 * @returns
 */
function loadEventTypes(comboBox) {
	$.ajax({
		url: '/event_types',
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		success: function(data) {
			$.each(data, (key, val) => {
				$(comboBox).append($('<option>').val(key).text(val));
			}); 
		}
	})
}
 
function showAlert(container, message) {
	$(container).text(message);
	
	$(container).alert();
} 

function clearDeleteModal() {
	$('#deleteError').empty();
	$('#deleteError').hide();
}