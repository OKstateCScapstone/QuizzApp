/**
 * This will hold a list of valid sections of a input file
 * @type {[*]}
 */
const fs = require('fs-extra');

const self = {};

const removeTrailingLeadingSpaces = function (contents) {
    return contents.replace(/^\s+|\s+$/g, "");
};

const removeTrailingLeadingNewLines = function (contents) {
    return contents.replace(/^\n+|\n+$/g, "");
};

const removeTrailingLeadingQuotes = function (contents) {
    return contents.replace(/^"+|"+$/g, "");
};

const infoTags = [
    "language",
    "points",
    "topics",
    "difficulty",
    "activeDate",
    "dueDate"
];

const retrieveTagContents = function(contents, tag) {
    var rex = new RegExp("(@" + tag + ")([^]*?)(@" + tag + ")");
    var match = contents.match(rex);
    if (match && match.length > 0) {
        return removeTrailingLeadingNewLines(match[2]);
    }
    return "";
};

const getSingleLineTagContent = function (content, tag) {
    const lines = content.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var currentLine = lines[i];
        if (currentLine.includes(tag)) {
            return removeTrailingLeadingSpaces(currentLine.replace("@" + tag + ":", ""));
        }
    }
    return "";
};

const parseInfo = function (contents, tag) {
    const infoContent = retrieveTagContents(contents, tag);
    var info = {};
    for(var i = 0; i < infoTags.length; i++) {
        var currentTag = infoTags[i];
        info[currentTag] = getSingleLineTagContent(infoContent, currentTag);
    }
    return info;
};

self.saveCodeFile = function (questionId, fileContent) {
    const tagContents = retrieveTagContents(fileContent, "solution");
    const lines = tagContents.split("\n");
    if (lines.length > 0) {
        var filename = lines[0].split("\"").join("");
        filename = removeTrailingLeadingSpaces(filename);
        var filePath = "uploads/" + questionId + "/" + filename + ".java";
        var fileContents = "";
        for (var i = 1; i < lines.length; i++) {
            fileContents += lines[i] + "\n";
        }
        fs.ensureDirSync("uploads/" + questionId);
        fs.writeFileSync(filePath, fileContents);
        return filePath;
    }
    return "";
};

const parseSingleTestCase = function (content) {
    var lines = content.split("\n");
    var testCase = {};
    testCase.public = false;
    for(var i = 0; i < lines.length; i++) {
        var currentLine = lines[i];
        if (currentLine.includes("@public")) {
            testCase.public = true;
        }
        if (currentLine.includes("@inputs")) {
            var input = removeTrailingLeadingSpaces(currentLine.replace("@inputs:", ""));
            testCase.input = removeTrailingLeadingQuotes(input);
        }
    }
    return testCase;
};

const parseTestCases = function (content, tag) {
    const testCaseContents = retrieveTagContents(content, tag);
    var rex = /(@testCase)[^]*?(@testCase)/g;
    var match = testCaseContents.match(rex);
    var testCases = [];
    for(var i = 0; i < match.length; i++) {
        var testCase = retrieveTagContents(match[i], "testCase");
        testCases.push(parseSingleTestCase(testCase));
    }
    return testCases;
};

self.sections = {
    title: retrieveTagContents,
    info: parseInfo,
    question: retrieveTagContents,
    starterCode: retrieveTagContents,
    testCases: parseTestCases
};

module.exports = self;