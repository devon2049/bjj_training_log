document.addEventListener('DOMContentLoaded', function() {
    loadEntries();
});

document.getElementById('log-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = sanitize(document.getElementById('date').value);
    const techniques = sanitize(document.getElementById('techniques').value);
    const progress = sanitize(document.getElementById('progress').value);
    const goals = sanitize(document.getElementById('goals').value);

    const entry = {
        date: date,
        techniques: techniques,
        progress: progress,
        goals: goals
    };

    addEntryToLog(entry);
    saveEntry(entry);
    document.getElementById('log-form').reset();
});

function sanitize(input) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(input));
    return div.innerHTML;
}

function addEntryToLog(entry) {
    const entryElement = document.createElement('li');
    entryElement.innerHTML = `
        <strong>Date:</strong> ${entry.date}<br>
        <strong>Techniques Practiced:</strong> ${entry.techniques}<br>
        <strong>Progress:</strong> ${entry.progress}<br>
        <strong>Goals:</strong> ${entry.goals}
    `;
    document.getElementById('log-entries').appendChild(entryElement);
}

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('trainingLog')) || [];
    entries.push(entry);
    localStorage.setItem('trainingLog', JSON.stringify(entries));
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('trainingLog')) || [];
    entries.forEach(addEntryToLog);
}
