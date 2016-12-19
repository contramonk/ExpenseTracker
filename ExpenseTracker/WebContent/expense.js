$(function() {
	start();
});

var start = function() {
	$('body').text("");
	$.ajax({
		type : "GET",
		url : "api/expense",
		dataType : "json",
		success : printTable
	})

};

var printTable = function(data) {
	$createButton = $('<button>')
	$table = $('<table>');
	$thead = ('<thead>')
	$row = $('<tr>');
	$th1 = $('<th>');
	$th2 = $('<th>');
	$th3 = $('<th>');
	$th4 = $('<th>');
	$th5 = $('<th>');

	$createButton.text('add');
	$th1.text("id");
	$th2.text("title");
	$th3.text("description");
	$th4.text("amount");
	$th5.text("category");

	$row.append($th1, $th2, $th3, $th4, $th5);
	$table.append($row);
	$('body').append($createButton);
	$('body').append($table);
	
	$createButton.click(function() {createEvent()});

	populateTable(data);
};

var createEvent = function() {
	$('form').text("");
	
	//put into method
	$addForm = $('<form>');
	$idLabel = $('<label>');
	$titleLabel = $('<label>');
	$descriptionLabel = $('<label>');
	$amountLabel = $('<label>');
	$categoryLabel = $('<label>');
	$addSubmit = $('<button>')
	
	$idInput = $('<input>');
	$titleInput = $('<input>');
	$descriptionInput = $('<input>');
	$amountInput = $('<input>');
	$categoryInput = $('<input>');
	
	$idLabel.text('id: ');
	$titleLabel.text('title: ');
	$descriptionLabel.text('description: ');
	$amountLabel.text('amount: ');
	$categoryLabel.text('category: ');
	$addSubmit.text('submit');
	
	$addForm.append($idLabel, $idInput, $titleLabel, $titleInput,
			$descriptionLabel, $descriptionInput, $amountLabel, $amountInput,
			$categoryLabel, $categoryInput, $addSubmit);
	$('body').append($addForm);
	
	$addSubmit.click(function(e) {addEvent(e, $titleInput.val(), $descriptionInput.val(), $amountInput.val(), $categoryInput.val())});
	
}

var addEvent = function(e, $titleInput, $descriptionInput, $amountInput, $categoryInput) {
	e.preventDefault();
	
	var newEvent = {
			title: $titleInput,
			description: $descriptionInput,
			amount: $amountInput,
			category: $categoryInput	
	};
	
	var jsonStringy = JSON.stringify(newEvent);
	
	$.ajax({
		type : "POST",
		url : "api/expense",
		// why did i have to use contentType here, but not in editEvent?
		contentType : "application/json; charset=utf-8",
		data : jsonStringy,
		dataType : "json",
		success : start
	});
	
	
	
};

var populateTable = function(data) {
	$(data).each(function() {
		$row = $('<tr>');
		$table.append($row);
		$editButton = $('<button>');
		$deleteButton = $('<button>');
		$editButton.text("edit");
		$deleteButton.text("delete");

		for ( var key in this) {
			$column = $('<td>');
			$column.text(this[key]);
			$row.append($column);
		}
		var id = this.id;
		var title = this.title;
		var description = this.description;
		var amount = this.amount;
		var category = this.category;

		$editButton.click(function(e) {
			editEvent(e, id, title, description, amount, category)
			});
		$deleteButton.click(function(e) {deleteEvent(e, id)});
		$row.append($editButton, $deleteButton);

	});
}



var editEvent = function(e, id, title, description, amount, category) {
	
	// put into method
	$editForm = $('<form>');
	$idLabel = $('<label>');
	$titleLabel = $('<label>');
	$descriptionLabel = $('<label>');
	$amountLabel = $('<label>');
	$categoryLabel = $('<label>');
	$editSubmit = $('<button>')
	
	$idInput = $('<input>');
	$titleInput = $('<input>');
	$descriptionInput = $('<input>');
	$amountInput = $('<input>');
	$categoryInput = $('<input>');
	
	$idInput.attr('value', id);
	$titleInput.attr('value', title);
	$descriptionInput.attr('value', description);
	$amountInput.attr('value', amount);
	$categoryInput.attr('value', category);
	
	
	$idLabel.text('id: ');
	$titleLabel.text('title: ');
	$descriptionLabel.text('description: ');
	$amountLabel.text('amount: ');
	$categoryLabel.text('category: ');
	$editSubmit.text('submit');
	
	
	
	$editForm.append($idLabel, $idInput, $titleLabel, $titleInput,
			$descriptionLabel, $descriptionInput, $amountLabel, $amountInput,
			$categoryLabel, $categoryInput, $editSubmit);
	$('body').append($editForm);
	
	$editSubmit.click(function(e) {
		e.preventDefault;
		
		var updatedEvent = {
				title: $titleInput.val(),
				description: $descriptionInput.val(),
				amount: $amountInput.val(),
				category: $categoryInput.val()	
		}
		
		var jsonStringy = JSON.stringify(updatedEvent);
		
		
		$.ajax({
			type : "PUT",
			url : "api/expense/" + id,
			data: jsonStringy,
			dataType : "json",
			success : printTable
		})
	});
	
};

var deleteEvent = function(e, id) {
	$.ajax({
		type : "DELETE",
		url : "api/expense/" + id,
		dataType : "json",
		success : start
	})
};
