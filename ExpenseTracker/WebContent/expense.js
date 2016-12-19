$(function() {
	start();
});

var start = function() {
	$('body').text("");
	$nav = $('<nav class="navbar navbar-default navbar-static-top">');
	$navContainer = $('<container>');
	$containerWrapper = ('<div class = "container">');
	$navP = $('<p class = "navbar-brand">');
	
	$navP.text('Budgetapp');
	
	$navContainer.append($navP);
	$nav.append($navContainer);
	$('body').append($nav);
	$('body').append($containerWrapper)
	$.ajax({
		type : "GET",
		url : "api/expense",
		dataType : "json",
		success : printTable
	})

};

var printTable = function(data) {
	$createButton = $('<button class = "btn btn-success btn-xs">')
	$createSpan = $('<span class = "glyphicon glyphicon-plus">')
	$table = $('<table class = "table table-hover">');
	$row = $('<tr>');
	$th1 = $('<th>');
	$th2 = $('<th>');
	$th3 = $('<th>');
	$th4 = $('<th>');
	$th5 = $('<th>');

	$th1.text("id");
	$th2.text("title");
	$th3.text("description");
	$th4.text("amount");
	$th5.text("category");

	$createButton.append($createSpan);
	$row.append($th2, $th3, $th4, $th5); // removed th1
	$table.append($row);
	$('.container').append($createButton);
	$('.container').append($table);
	
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
	var totalAmount = 0;
	$tbody = $('<tbody>');
	$table.append($tbody);
	$(data).each(function() {
		$row = $('<tr>');
		$tbody.append($row);
		$editButton = $('<button class = "btn btn-primary btn-xs">');
		$editSpan = $('<span class="glyphicon glyphicon-pencil">');
		
		$deleteButton = $('<button class = "btn btn-danger btn-xs">');
		$deleteSpan = $('<span class="glyphicon glyphicon-trash">')
		$editButton.append($editSpan);
		$deleteButton.append($deleteSpan);

		for ( var key in this) {
			if(key != 'id') {
				$column = $('<td>');
				$column.text(this[key]);
				$row.append($column);
			}

		}
		var id = this.id;
		var title = this.title;
		var description = this.description;
		var amount = this.amount;
		var category = this.category;
		totalAmount = this.amount + totalAmount;

		$tdEdit = $('<td>');
		$tdDelete = $('<td>');
		$editButton.click(function(e) {
			editEvent(e, id, title, description, amount, category)
			});
		$deleteButton.click(function(e) {deleteEvent(e, id)});
		$tdEdit.append($editButton);
		$tdDelete.append($deleteButton);
		$row.append($tdEdit, $tdDelete);

	});
	$totalDiv = $('<div>');
	$totalH1 = $('<h3>');
	$totalH1.text('total: $' + totalAmount.toFixed(2));
	$totalDiv.append($totalH1);
	$table.append($totalDiv);
	console.log(totalAmount.toFixed(2));
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
