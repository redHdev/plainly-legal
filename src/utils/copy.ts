import { htmlToText } from "html-to-text";
import * as xssModule from "xss";
//Import and adjust XSS filtering to allow classnames on spans so we have page breaks
const xss = new xssModule.FilterXSS({
  whiteList: {
    ...xssModule.getDefaultWhiteList(),
    div: ["class"],
  },
  stripIgnoreTag: false,
});

//This function is for modern browsers that have access to the clipboard API
export function copyRichText(html : string) {

    const plainText = htmlToText(html, {
        wordwrap: false,
        preserveNewlines: true,
    });

    //Write to the clipboard
    copyToClipboard(plainText, html);

}

//This function copies text for browsers that have security measures in place to deny clipboard access
export function copyRichTextUnsupported(html : string) {
    console.log('Rich Text copy unsupported, using fallback to copy rich text by creating a temporary element');
    // Create a temporary element to hold the HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    document.body.appendChild(tempElement);
    // Select the HTML content
    const range = document.createRange();
    range.selectNode(tempElement);
    // Copy the selected HTML content to the clipboard
    const selection = window.getSelection() as Selection;
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
    document.body.removeChild(tempElement);
}

export function copyToClipboard(text : string, html: string) {
    //Write to the clipboard
    navigator.clipboard
        .write([
        new ClipboardItem({
            "text/plain": new Blob([text], { type: "text/plain" }),
            "text/html": new Blob([html], { type: "text/html" }),
        }),
        ])
        .catch((err) => console.error("Failed to copy text: ", err));
}


export function copyToClipboardUnsupported(text : string) {
    //Write to the clipboard
    navigator.clipboard
        .writeText(text)
        .catch((err) => console.error("Failed to copy text: ", err));
}


type CopyOptions = "rich" | "html";

//Rich copies both the plain text version and the html version at the same time so that the user can paste it into a rich text editor or a plain text editor
//Html copies the html version of the text only and puts it into both the text/plain and text/html formats so the user could paste it into a website or vscode
export function copyText( fullText: string, copyType: CopyOptions = 'rich'){

    //Clean the copy by removing all divs
    const cleanHtml = xss.process(fullText).replace(/<div[^>]*>([\s\S]*?)<\/div>/g, '');

    //If we are trying to copy rich text, we need to check if the browser supports the clipboard item and copy in the correct way
    (copyType == 'rich' && navigator.clipboard && window.ClipboardItem) ? copyRichText(cleanHtml) : copyRichTextUnsupported(cleanHtml);

    //We need to know if we have access to the clipboard item, then we can set it with modern JS
    if(copyType == 'html' ) copyToClipboardUnsupported(cleanHtml)


};

