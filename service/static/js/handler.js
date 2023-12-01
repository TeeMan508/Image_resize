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

const onSubmit = () => {
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
            console.log(202);
        }
        else {
            console.log(200)
            insert_resized_image();
        }
    }).catch(err => {
        console.log(err.response.data);
    })
}

const insert_resized_image = () => {

}
