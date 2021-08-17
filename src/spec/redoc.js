const fs = require("fs");
const yaml = require("js-yaml");

const pathFolder = "./src/spec/paths";
const absPath = `${__dirname}\\paths\\`;

let paths = {};
fs.readdirSync(pathFolder).forEach((file) => {
	let filePath = `${absPath}${file}`;
	try {
		const doc = yaml.load(fs.readFileSync(filePath));
		if (doc) {
			let pathname = Object.keys(doc)[0];
			paths[pathname] = doc[pathname];
		}
	} catch (e) {
		console.log(e);
	}
});

try {
	let openApiSpecification = yaml.load(fs.readFileSync(`${__dirname}\\api-description.yml`));
	openApiSpecification["paths"] = paths;
	fs.writeFileSync("./src/spec/index.yml", yaml.dump(openApiSpecification));
} catch (e) {
	console.log(e);
}
