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
const replaceProxy = (src, proxy, value) => {
    const re = new RegExp("(" + proxy + ")", "gm");
    return src.replace(re, value);
};
const renderMgr = manager => {
    let src = fs.readFileSync(path.resolve(srcDIR, "manager.html"), "utf8");
    src = replaceProxy(src, "NAME", manager.getName());
    src = replaceProxy(src, "ROLE", manager.getRole());
    src = replaceProxy(src, "ID", manager.getId());
    src = replaceProxy(src, "EMAIL", manager.getEmail());
    src = replaceProxy(src, "OFFICE NUMBER", manager.getOfcNumber());
    return src;
};
const renderEng = engineer => {
    let src = fs.readFileSync(path.resolve(srcDIR, "engineer.html"), "utf8");
    src = replaceProxy(src, "NAME", engineer.getName());
    src = replaceProxy(src, "ROLE", engineer.getRole());
    src = replaceProxy(src, "ID", engineer.getId());
    src = replaceProxy(src, "EMAIL", engineer.getEmail());
    src = replaceProxy(src, "GITHUB", engineer.getGithub());
    return src;
};
const renderIntern = intern => {
    let src = fs.readFileSync(path.resolve(srcDIR, "intern.html"), "utf8");
    src = replaceProxy(src, "NAME", intern.getName());
    src = replaceProxy(src, "ROLE", intern.getRole());
    src = replaceProxy(src, "ID", intern.getId());
    src = replaceProxy(src, "EMAIL", intern.getEmail());
    src = replaceProxy(src, "SCHOOL", intern.getSchool());
    return src;
};
const renderMain = html => {
    const src = fs.readFileSync(path.resolve(srcDIR, "main.html"), "utf8");
    return replaceProxy(src, "MYTEAM", html);
};
module.exports = render;