const path = require("path");
const fs = require("fs");

const srcDIR = path.resolve(__dirname, "../src");

const render = employees => {
    const html = [];
    html.push(...employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderMgr(manager))
    );
    html.push(...employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEng(engineer))    
    );
    html.push(...employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderIntern(intern))    
    );
    return renderMain(html.join(""));
};
const renderMgr = manager => {
    let src = fs.readFileSync(path.resolve(srcDIR, "manager.html"), "utf8");
    src = replaceProxy(src, "name", manager.getName());
    src = replaceProxy(src, "role", manager.getRole());
    src = replaceProxy(src, "id", manager.getId());
    src = replaceProxy(src, "email", manager.getEmail());
    src = replaceProxy(src, "officeNumber", manager.getOfcNumber());
    return src;
};
const renderEng = engineer => {
    let src = fs.readFileSync(path.resolve(srcDIR, "engineer.html"), "utf8");
    src = replaceProxy(src, "name", engineer.getName());
    src = replaceProxy(src, "role", engineer.getRole());
    src = replaceProxy(src, "id", engineer.getId());
    src = replaceProxy(src, "email", engineer.getEmail());
    src = replaceProxy(src, "github", engineer.getGithub());
    return src;
};
const renderIntern = intern => {
    let src = fs.readFileSync(path.resolve(srcDIR, "intern.html"), "utf8");
    src = replaceProxy(src, "name", intern.getName());
    src = replaceProxy(src, "role", intern.getRole());
    src = replaceProxy(src, "id", intern.getId());
    src = replaceProxy(src, "email", intern.getEmail());
    src = replaceProxy(src, "school", intern.getSchool());
    return src;
};
const renderMain = html => {
    const src = fs.readFileSync(path.resolve(srcDIR, "main.html"), "utf8");
    return replaceProxy(src, "team", html);
};
const replaceProxy = (src, proxy, value) => {
    const re = new RegExp("{{ " + proxy + " }}", "gm");
    return src.replace(re, value);
};
module.exports = render;