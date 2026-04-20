(function () {
  'use strict';

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var field = '';
    var i = 0;
    var inQuotes = false;

    while (i < text.length) {
      var ch = text[i];

      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i += 2;
            continue;
          }
          inQuotes = false;
          i += 1;
          continue;
        }
        field += ch;
        i += 1;
        continue;
      }

      if (ch === '"') {
        inQuotes = true;
        i += 1;
        continue;
      }

      if (ch === ',') {
        row.push(field);
        field = '';
        i += 1;
        continue;
      }

      if (ch === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
        i += 1;
        continue;
      }

      if (ch === '\r') {
        i += 1;
        continue;
      }

      field += ch;
      i += 1;
    }

    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }

    return rows.filter(function (r) {
      return r.length > 1 || (r.length === 1 && r[0].trim() !== '');
    });
  }

  function buildTable(headers, dataRows) {
    var table = document.createElement('table');
    table.className = 'csv-table__table';

    var thead = document.createElement('thead');
    var headRow = document.createElement('tr');

    headers.forEach(function (h) {
      var th = document.createElement('th');
      th.textContent = h;
      headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    dataRows.forEach(function (r) {
      var tr = document.createElement('tr');
      headers.forEach(function (_, idx) {
        var td = document.createElement('td');
        td.textContent = r[idx] !== undefined ? r[idx] : '';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }

  function renderCsvTable(container) {
    var src = container.getAttribute('data-src');
    var countEl = container.querySelector('[data-csv-count]');
    var statusEl = container.querySelector('[data-csv-status]');
    var viewport = container.querySelector('[data-csv-viewport]');

    if (!src || !viewport || !statusEl || !countEl) {
      return;
    }

    fetch(src)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.text();
      })
      .then(function (csvText) {
        var rows = parseCsv(csvText);

        if (rows.length === 0) {
          statusEl.textContent = 'CSV vuoto.';
          countEl.textContent = 'Righe: 0';
          return;
        }

        var headers = rows[0];
        var dataRows = rows.slice(1);
        var table = buildTable(headers, dataRows);

        viewport.innerHTML = '';
        viewport.appendChild(table);

        countEl.textContent = 'Righe: ' + dataRows.length;
      })
      .catch(function (error) {
        statusEl.textContent = 'Impossibile caricare il CSV (' + error.message + ').';
        countEl.textContent = 'Righe: n/d';
      });
  }

  function initCsvTables() {
    var containers = document.querySelectorAll('[data-csv-table]');
    containers.forEach(renderCsvTable);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCsvTables);
  } else {
    initCsvTables();
  }
})();
