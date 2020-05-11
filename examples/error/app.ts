import axios, { AxiosError } from '../../src/index';

axios({
    method: 'get',
    url: '/error/get1',
})
    .then(res => {
        console.log(res);
    })
    .catch((e: AxiosError) => {
        console.log(`e`, e);
        console.log(`e.code: `, e.code);
        console.log(`e.config: `, e.config);
        console.log(`e.message`, e.message);
        console.log(`request`, e.request);
        console.log(`res`, e.response);
    });

axios({
    method: 'get',
    url: '/error/get',
})
    .then(res => {
        console.log(res);
    })
    .catch((e: AxiosError) => {
        console.log(e);
    });

setTimeout(() => {
    axios({
        method: 'get',
        url: '/error/get',
    })
        .then(res => {
            console.log(res);
        })
        .catch((e: AxiosError) => {
            console.log(e);
        });
}, 5000);

// axios({
//     method: 'get',
//     url: '/error/timeout',
//     timeout: 2000,
// })
//     .then(res => {
//         console.log(res);
//     })
//     .catch((e: AxiosError) => {
//         console.log(e.message);
//         console.log(e.config);
//         console.log(e.code);
//         console.log(e.request);
//         console.log(e.isAxiosError);
//     });
