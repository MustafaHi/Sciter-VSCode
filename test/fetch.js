
let form = new FormData;

form.append("key", "value");
form.append("key", "value", 'filename');

for (let e of form.entries())
{
    e[0] // key;
    e[1] // value;
}

(async () => 
{

    let r = await fetch('url', {
        body: form,
        method:"GET",
        headers: {
            "Content-Type":"application/json"
        }
    });

    r.body;
    await r.json();
})();

