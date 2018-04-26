'use strict';

let extrasCount = 0;

function deleteExtraNodesAt(idx) {
	var descriptionText = document.getElementById(`description${idx}`);
    descriptionText.parentNode.removeChild(descriptionText);
    var costNumber = document.getElementById(`cost${idx}`);
    costNumber.parentNode.removeChild(costNumber);
    var deleteButton = document.getElementById(`delete${idx}`);
    deleteButton.parentNode.removeChild(deleteButton);
}

// comma decoration for Number Input
function giveComma(numberStr) {
	let noComma = numberStr.replace(/[,\.]/g, "");
	let withComma = Number(noComma).toLocaleString('en', {
		maximumSignificantDigits : 21,
		maximumFractionDigits: 20
	});
	return withComma;
}

function initAddButton() {
	let addButton = document.getElementById("add_button");
	addButton.addEventListener("click", function() {
		let newExtraHTML = 
				`
					<div id="description${extrasCount}" class="extras_column form-group">
							<label class="extras_label">Description</label>
							<input type="text" class="extras_text" name="descriptions[${extrasCount}]" placeholder="Description" required>
						</div>
						<div id="cost${extrasCount}" class="extras_column form-group">
							<label class="extras_label">Cost</label>
							<input id="cost_value${extrasCount}" type="text" class="extras_number" name="costs[${extrasCount}]" placeholder="Cost (ex. 100,000)" required>  
						</div>
						<button type="button" id="delete${extrasCount}" onclick="deleteExtraNodesAt(${extrasCount});" class="btn btn-danger">X</button>
				`;

		let extrasWrapper = document.getElementById("extras_wrapper");
		if (extrasCount == 0) {
			extrasWrapper.innerHTML = newExtraHTML;
		} else {
			let prevNode = extrasWrapper.children[extrasWrapper.children.length-1];
			prevNode.insertAdjacentHTML('afterend', newExtraHTML);
		}

		$("#cost_value"+extrasCount).on('input',function(e){
			let unformattedStr = $(this).val();
			let formattedStr = giveComma(unformattedStr);
			$(this).val(formattedStr);
		});
		
    extrasCount++;
	}, false);
}
initAddButton();

$('#capital').on('input',function(e){
	let unformattedStr = $(this).val();
	let formattedStr = giveComma(unformattedStr);
	$(this).val(formattedStr);
});
