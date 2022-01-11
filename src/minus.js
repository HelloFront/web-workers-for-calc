onmessage = (e) => {
    let result = +e.data[0] - +e.data[1];
    postMessage(result);
}