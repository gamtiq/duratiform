var packageData = require("./package.json");

module.exports = {
    "source": {
        "include": ["duratiform.js"]
    },
    "opts": {
        "destination": "docs",
        "readme": "README.md",
        "template": "node_modules/docdash",
        "fileSet": ".nojekyll"
    },
    "plugins": [
        "jsdoc-file"
    ],
    "docdash": {
        "meta": {
            "title": packageData.name,
            "description": packageData.description
        },
        "menu": {
            "GitHub repo": {
                "href": packageData.homepage,
                "target": "_blank",
                "id": "github_link"
            }
        }
    }
};
