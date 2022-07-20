function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// create string foramtting function
function format(str, args) {
    var formatted = str;
    for (var arg in args) {
        formatted = formatted.replace("{" + arg + "}", args[arg]);
    }
    return formatted;
}

let tags_combo = document.getElementById("tags_combo");
if (tags_combo)
{
    let resp = httpGet("localhost:8080/music/tags");
    // let resp = '{"tags":["tag1","tag2","tag3"]}';
    j = JSON.parse(resp);
    for (let i = 0; i < j["tags"].length; i++) {
        item = document.createElement("option");
        item.innerHTML = j["tags"][i];
        tags_combo.appendChild(item);
    }
}

let reactions_combo = document.getElementById("reactions_combo");
if (reactions_combo)
{
    let resp = httpGet("localhost:8080/music/reactions");
    // let resp = '{"reactions":["like", "heart", "anger"]}';
    j = JSON.parse(resp);
    for (let i = 0; i < j["reactions"].length; i++) {
        item = document.createElement("option");
        item.innerHTML = j["reactions"][i];
        reactions_combo.appendChild(item);
    }
}

let count_input = document.getElementById("count_input");

let update_button = document.getElementById("update_button");
if (update_button) {
    update_button.addEventListener("click", function() {
        let music_top_list = document.getElementById("music_top_list");
        if (music_top_list)
        {
            let selected_tag = tags_combo.options[tags_combo.selectedIndex].text;
            let request = "localhost:8080/music/top?tag=" + selected_tag + "&count=" + count_input.value + "&sort_criteria=" 
                + reactions_combo.options[reactions_combo.selectedIndex].text;
            let resp = httpGet(request);
            console.log(request);
            // let resp = '{ "top": [{"music_name": "name", "author": "Ra", "sort_criteria": 40}]}';
            j = JSON.parse(resp);
            for (let i = 0; i < j["top"].length; i++) {
                listItem = document.createElement("li");
                listItem.innerHTML = j["top"][i]["music_name"] + " - " + j["top"][i]["author"] + " | " + j["top"][i]["sort_criteria"];
                music_top_list.appendChild(listItem);
            }
        }
    }, false);
}

