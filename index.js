const fs = require('fs');
const csv = require('fast-csv');

const stream = fs.createReadStream('teste.csv', { encoding: 'latin1' });
const relatorio = [];
try {
    const streamCsv = csv({
            headers: false,
            delimiter: ',',
            quote: '"',
            ignoreEmpty: true,
        })
        // Campos "Procedimento - Especialidade"
        .on('data', data => relatorio.push(data[18] + '-' + data[19]))
        .on("end", () => {
            relatorio.sort();
            var count = 1;
            var results = "";
            for (var i = 0; i < relatorio.length; i++) {
                if (relatorio[i] == relatorio[i + 1]) {
                    count += 1;
                }
                else {
                    results += relatorio[i] + "-->" + count + " vezes\n";
                    count = 1;
                }
            }
            console.log(results);
        });
    stream.pipe(streamCsv);
}
catch (err) {
    console.log(err);
}
