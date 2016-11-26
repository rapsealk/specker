const htmlparser = require("htmlparser2");

const open = {
    name:'('
};
const close = {
    name:')'
};
const add = {
    name:'+'
};


exports.parser = function(dom){
    var htmlToString='';

    var stack = [];
    var queue = [];
    var operator_stack=[];
    var tag_stack=[];
    var tag1={};
    var tag2={};
    var tag1ToHtml="";
    var tag2ToHtml="";
    stack.push(dom[0]);

    while(stack.length!=0){
        var domElement  = stack.pop();

        switch (domElement.name){
            case '+':
                queue.push(domElement);
                break;
            case ')':
                queue.push(domElement);
                break;
            default:
                    queue.push(domElement);

                if(domElement.children!=undefined&&domElement.children.length) {
                    queue.push(open);
                    stack.push(close);
                    for (var i = 0; i < domElement.children.length; i++) {
                        stack.push(domElement.children[i]);
                        if(i!=domElement.children.length-1){
                            stack.push(add);
                        }
                    }
                }
                break;
        }

    }


    while(queue.length!=0){
        var domElement  = queue.shift();
        switch (domElement.name){
            case '+':
                operator_stack.push(domElement);
                break;
            case ')':
                var key=true;
                while(key){
                    var opCode = operator_stack.pop();
                    switch(opCode.name){
                        case '+':

                            tag1 = tag_stack.pop();
                            var isMention=false;
                            if(tag1.type=='tag'){
                                tag1ToHtml = `<${tag1.name}></${tag1.name}>`;
                            }
                            else if(tag1.type=='result'&& (tag1.content.replace(/(<([^>]+)>)/gi, "")=='@'||tag1.content.replace(/(<([^>]+)>)/gi, "")=='#')){
                                isMention=true;

                                tag1ToHtml=tag1.content.replace(/(<([^>]+)>)/gi, "")

                            }
                            else {
                                tag1ToHtml = tag1.content;
                            }

                             tag2 = tag_stack.pop();
                            if(isMention==true){
                                tag2ToHtml=tag2.content.replace(/(<([^>]+)>)/gi, "");

                            }
                            else {
                                if (tag2.type == 'tag') {
                                    tag2ToHtml = `<${tag2.name}></${tag2.name}>`;
                                }
                                else {
                                    tag2ToHtml = tag2.content;
                                }
                            }
                            var output = `${tag1ToHtml}${tag2ToHtml}`;
                            console.log(output);
                            tag_stack.push({'type': 'result', 'content': output});

                            break;
                        case '(':

                             tag1 = tag_stack.pop();
                            var isMention=false;
                            var isTag = false;
                            if(tag1.type=='tag'){
                                tag1ToHtml = `<${tag1.name} ></${tag1.name}>`;
                            }
                            else{
                                tag1ToHtml = `${tag1.content}`;

                                if( tag1ToHtml.length>1){
                                    if(tag1ToHtml.indexOf('@')==0){
                                        isMention=true;
                                    }
                                    else if(tag1ToHtml.indexOf('#')==0){
                                        isTag=true;
                                    }

                                }

                            }

                            tag2 = tag_stack.pop();
                            if(isMention||isTag){
                                tag2ToHtml = isMention? `<${tag2.name} class="mention">${tag1ToHtml}</${tag2.name}>`:`<${tag2.name} class="tag">${tag1ToHtml}</${tag2.name}>`;
                            }
                            else{
                                tag2ToHtml = `<${tag2.name}>${tag1ToHtml}</${tag2.name}>`;
                            }


                            tag_stack.push({'type': 'result', 'content': tag2ToHtml});
                            key=false;
                            break;
                    }
                }
                break;
            case '(':
                operator_stack.push(domElement);
                break;
            default:
                tag_stack.push(domElement);
                break;
        }

    }
    var result = tag_stack.pop();
console.log(result.content.toString());


};


