const Airtable = require('airtable');
const fs = require('fs');

Airtable.configure({
    apiKey: process.env.AIR_TABLE_API_KEY
});

const base = Airtable.base(process.env.AIR_TABLE_BASE);

base('links').select({
	view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {

	records.forEach(function(record) {
		
		var fileHTMLString = `<!doctype html><html><head><meta charset="UTF-8" /><title>redirect</title></head><body>redirecting to ${record.get('URL')}...<script>window.location.replace('${record.get('URL')}');</script></body></html>`;
		
		fs.writeFile(`public/${record.get('Short Link')}.html`, fileHTMLString, (err) => {
			if(err) return console.log(err);
			console.log('wrote to file!');
		});
		
	});
	
	fetchNextPage();
	
}, function done(err) {
    if (err) { console.error(err); return; }
});