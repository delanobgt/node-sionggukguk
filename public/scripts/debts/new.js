'use strict';

let extrasCount = 0;

function initAddButton() {
	let addButton = document.getElementById("add_button");
	addButton.addEventListener("click", function() {
		let newExtraHTML = 
				`
					<div id="description${extrasCount}" class="extras_column form-group">
	                  <label class="extras_label">Description</label>
	                  <input type="text" class="extras_text" name="descriptions[${extrasCount}]" placeholder="Description">  
	                </div>
	                <div id="cost${extrasCount}" class="extras_column form-group">
	                  <label class="extras_label">Cost</label>
	                  <input type="number" class="extras_number" name="costs[${extrasCount}]" placeholder="Cost (ex. 100,000)">  
	                </div>
	                <button type="button" id="delete${extrasCount}" onclick="deleteExtraNodesAt(${extrasCount});" class="btn btn-danger">X</button>
	            `;
		let extrasWrapper = document.getElementById("extras_wrapper");
		if (extrasCount == 0) {
			extrasWrapper.innerHTML = newExtraHTML;
		} else {
			let prevNode = document.getElementById(`delete${extrasCount-1}`);
			prevNode.insertAdjacentHTML('afterend', newExtraHTML);
		}
        extrasCount++;
	}, false);
}
initAddButton();

function deleteExtraNodesAt(idx) {
	var descriptionText = document.getElementById(`description${idx}`);
    descriptionText.parentNode.removeChild(descriptionText);
    var costNumber = document.getElementById(`cost${idx}`);
    costNumber.parentNode.removeChild(costNumber);
    var deleteButton = document.getElementById(`delete${idx}`);
    deleteButton.parentNode.removeChild(deleteButton);
}
