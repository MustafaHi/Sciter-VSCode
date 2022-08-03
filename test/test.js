import { encode, decode } from "@sciter"
import { fs } from "@sys"
import * as env from "@env"
import { printf, Zip } from "../sciter";


var x = document.getBoundingClientRect();
    x.bottom;
    
document.on('click', 'button1', function (e, button) {
    
});

document.on('active', 'button1', async function (e, button) {

});

document.on("DOMContentLoaded", () => {});

document.selection.empty();

document.insertAdjacentHTML("afterend", "wow");
document.popup(document, {})
document.removeEventListener("wow", document.popup);

document.takeOff({window:"attached"})
console.log(document, "one");

document.on("click", "one", (evt, el) =>
{
    evt.preventDefault();
    return true;
});

document.state.occluded = 0x1 | 0x2;
document.state.box("bottom", "border");
document.style["background"] = "1";
document.style.fontRenderingMode;

Window.this.on("activate", () => {});
Window.this.state = Window.CHILD_WINDOW
Window.this.frameType = "solid";
Window.this.isActive

Window.this.frameType
const k = new Window({ width: 16, parent: Window.this});

const z = Zip.openFile("test.zip");
      z.length;
      z.item(0).path;

document.head.children.item

document.querySelector
document.bindImage()
document.$()

document.$$()

printf

export async function read(path)
{
    try
    {
        let    file = await fs.readfile(path);
        let    data = decode(file);
        return data;
    }
    catch (error)
    {
        return false;
    }
}
export function readSync(path)
{
        let    data = decode(fs.$readfile(path));
        return data;
}

export async function write(path, data)
{
    try
    {
        let   file = await fs.open(path, "w");
        await file.write(typeof data == "object" ? JSON.stringify(data) : data);
        return await file.close();
    }
    catch (error)
    {
        return false;
    }
}
