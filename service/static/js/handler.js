function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

const csrftoken = getCookie('csrftoken');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function remove_overlay() {
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("active_overlay")
}

function add_overlay() {
    let overlay = document.getElementById("overlay");
    overlay.classList.add("active_overlay")
}

const onSubmit = () => {
    add_overlay();

    let img_name_input = document.getElementById("image_name");
    let img_height_input = document.getElementById("image_width");
    let img_width_input = document.getElementById("image_height");
    let img_file_input = document.getElementById("image_file");


    let formData = new FormData();
    formData.append("image_name", img_name_input.value)
    formData.append("image_height", img_height_input.value)
    formData.append("image_width", img_width_input.value)
    formData.append("image_file", img_file_input.files[0]);

    axios.post('/image_resize/', formData, {
        headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': csrftoken,
        }
    }).then(res => {
        check(res.data);
    }).catch(err => {
        remove_overlay()
        console.log(err.response.data);
    })
}

const check = (data) => {
    let payload = {
        "task_id": data,
    }
    axios.post('/image_resize/get_image/', payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken,
        }
    })
    .then(res => {
        if (res.status === 202){
            check(data);
        }
        else {
            if (res.status === 200){
                insert_resized_image(res.data.image_file) ;
            }
            else {
                remove_overlay();
                console.log(res);
            }
        }
    }).catch(err => {
        remove_overlay();
        console.log(err.response.data);
    })
}

const insert_resized_image = (data) => {
    const src = document.getElementById("overlay");

    let scorp = document.getElementById("scorpion");
    src.removeChild(scorp);

    const img = document.createElement("img");
    img.src = data;
    img.id = "resized_preview_id";
    src.appendChild(img);

    const btn = document.createElement("button");
    btn.textContent = 'Close';
    btn.id = 'close_button_id';
    btn.onclick = onClose;
    btn.classList.add("btn");
    btn.classList.add("btn-primary");
    src.appendChild(btn);
}

const onClose = () => {
    const src = document.getElementById("overlay");
    src.classList.remove("active_overlay")

    let btn = document.getElementById("close_button_id");
    src.removeChild(btn);

    let resized_preview = document.getElementById("resized_preview_id");
    src.removeChild(resized_preview);

    let img = document.createElement("img");
    img.src = "/static/images/scorpion.gif";
    img.width = 450;
    img.id = "scorpion";
    src.appendChild(img);


}
