import {Component} from "angular2/core";

interface Contact {
    name: string,
    url: string
}

interface Project {
    name: string,
    description: string,
    mainUrl: string,
    projectUrl: string,
    githubUrl: string
}

@Component({
    selector: "content",
    templateUrl: "app/templates/content.component.html",
    styleUrls: ["app/styles/content.component.min.css"]
})

export class ContentComponent {
    public title = "Hello, I\'m Martin.";
    public description = "I do front-end dev and UI design. Here are some of the projects that I\'m working on:";
    public contacts = CONTACTS;
    public projects = PROJECTS;
}

var CONTACTS: Contact[] = [
    {
        "name":         "LinkedIn",
        "url":          "https://www.linkedin.com/in/martinlijanto"
    }, {
        "name":         "GitHub",
        "url":          "https://github.com/mlijanto"
    }
]

var PROJECTS: Project[] = [
    {
        "name":         "Winstrap",
        "description":  "Microsoft Windows Design Language theme for Bootstrap",
        "mainUrl":      "https://github.com/winjs/winstrap",
        "projectUrl":   "http://winstrap.azurewebsites.net/",
        "githubUrl":    "https://github.com/winjs/winstrap"
    }, {
        "name":         "Scrollbar of Contents",
        "description":  "Google Chrome extension",
        "mainUrl":   "https://chrome.google.com/webstore/detail/scrollbar-of-contents/cfmkncejaemmcobmaabfigljmnkeecdm",
        "projectUrl":   "https://chrome.google.com/webstore/detail/scrollbar-of-contents/cfmkncejaemmcobmaabfigljmnkeecdm",
        "githubUrl":    "https://github.com/mlijanto/scrollbar-of-contents"
    }
]