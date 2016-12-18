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

		for ( var key in this) {
			$column = $('<td>');
			$column.text(this[key]);
			$row.append($column);

		}
	});
}
