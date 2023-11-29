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

const onSubmit = () => {
    data_file = document.querySelector('#image_file');
    data = Array.from(document.querySelectorAll('#image_form input')).reduce((acc, input) =>
        ({...acc, [input.id]: input.value}), {});
        const payload = {
            image_name: data.image_name,
            image_height: data.image_height,
            image_width: data.image_width,
            image_file: data_file.value,
        }
        console.log(payload);
        axios.post('/image_resize/', payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': csrftoken,
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err.response.data);
        })
    }