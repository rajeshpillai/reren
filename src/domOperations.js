var variables = require('./variables');

class InsertElement {

    constructor(parentId, identifier, tagName, attributes, children) {
        this.parentId = parentId;
        this.identifier = identifier;
        this.tagName = tagName;
        this.attributes = attributes || {};
        this.children = [];

        if (typeof children === "object") {
            this.children.push(children);
        } else if(typeof children === "string" || 
                    typeof children === "number"){
            this.content = children;
        }

        if(typeof children === "string" || typeof children === "number"){
            this.content = children;
        }
    }
    
    apply() {
        var element = document.createElement(this.tagName);
        element.setAttribute(variables.ID_ATTR, this.identifier);
        
        for(var prop in this.attributes) {
            element.setAttribute(prop, this.attributes[prop]);
        }

        if(this.content) {
            element.innerHTML = this.content;
        }

        findElement(this.parentId).appendChild(element);
    };
}

class SetInnerHtml {

    constructor(identifier, innerHtml) {
        this.identifier = identifier;
        this.innerHtml = innerHtml;
    }
    
    apply() {
        findElement(this.identifier).innerHTML = this.innerHtml;
    };
}

class RemoveElement {
    constructor(parentId, identifier) {
        this.parentId = parentId;
        this.identifier = identifier;
    }

    apply() {
        var elementToRemove = findElement(this.identifier);
        findElement(this.parentId).removeChild(elementToRemove);
    }
}

var findElement = function(value) {
    var element = document.querySelector("*[" + variables.ID_ATTR + "='"+ value + "']");

    if(!element) {
        throw new Error(`Could not find the element with attribute ${variables.ID_ATTR} and value: ${value}`);
    }

    return element;
}

module.exports.InsertElement = InsertElement;
module.exports.SetInnerHtml = SetInnerHtml;
module.exports.RemoveElement = RemoveElement;