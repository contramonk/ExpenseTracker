$(function() {
	start();
});

var start = function() {
	$.ajax({
		type : "GET",
		url : "api/expense",
		dataType : "json",
		success : printTable
	})

};

var printTable = function(data) {
	$table = $('<table>');
	$thead = ('<thead>')
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

	$row.append($th1, $th2, $th3, $th4, $th5);
	$table.append($row);
	$('body').append($table);

	populateTable(data);
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
//		console.log(this.id);
//		console.log(this.title);
//		console.log(this.category);
		$editButton.click(function(e) {
			editEvent(e, id, title, description, amount, category)
			});
		$deleteButton.click(deleteEvent);
		$row.append($editButton, $deleteButton);

	});
}

var editEvent = function(e, id, title, description, amount, category) {
	$editForm = $('<form>');
	$idLabel = $('<label>');
	$titleLabel = $('<label>');
	$descriptionLabel = $('<label>');
	$amountLabel = $('<label>');
	$categoryLabel = $('<label>');
	
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
	
	
	
	$editForm.append($idLabel, $idInput, $titleLabel, $titleInput,
			$descriptionLabel, $descriptionInput, $amountLabel, $amountInput,
			$categoryLabel, $categoryInput);
	$('body').append($editForm);
	
	
//	$.ajax({
//		type : "PUT",
//		url : "api/expense/" + id,
//		dataType : "json",
//		success : printTable
//	})
};

var deleteEvent = function() {
	console.log('click');
};
