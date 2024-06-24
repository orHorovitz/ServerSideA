const fs = require('fs');
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('filename=', (filename) => {
    const baseUrl = "http://localhost:3001";
    const output = fs.createWriteStream(filename);

    // Redirect console.log to the file
    const log = console.log;
    console.log = (...args) => {
        log(...args);
        output.write(args.join(' ') + '\n');
    };

    console.log(baseUrl);
    console.log();

    async function runTests() {
        console.log("testing getting the about");
        console.log("-------------------------");
        try {
            let text = "";
            const url = baseUrl + "/about/";
            const response = await axios.get(url);
            console.log("url=" + url);
            console.log("data.status_code=" + response.status);
            console.log(response.data);
            console.log("data.text=" + JSON.stringify(response.data));
            console.log(response.data);
            const developer = response.data.developers[0];
            console.log("firstname=" + developer.firstname);
            console.log("lastname=" + developer.lastname);
            console.log("id=" + developer.id);
            text = text + developer.firstname + " " + developer.lastname + " " + developer.id;
            console.log(text);
        } catch (e) {
            console.log("problem");
            console.log(e);
        }
        console.log("");

        console.log();
        console.log("testing getting the report - 1");
        console.log("------------------------------");
        try {
            let text = "";
            const url = baseUrl + "/report/?user_id=123123&year=2024&month=3";
            const response = await axios.get(url);
            console.log("url=" + url);
            console.log("data.status_code=" + response.status);
            console.log(response.data);
            console.log("data.text=" + JSON.stringify(response.data));
            text = text + response.data.dinner;
            console.log(text);
        } catch (e) {
            console.log("problem");
            console.log(e);
        }
        console.log("");

        console.log();
        console.log("testing adding calorie consumption");
        console.log("----------------------------------");
        try {
            let text = "";
            const url = baseUrl + "/addcalories/";
            const response = await axios.post(url, {
                user_id: 123123,
                year: 2024,
                month: 4,
                day: 2,
                description: 'milk 9',
                category: 'lunch',
                amount: 8
            });
            console.log("url=" + url);
            console.log("data.status_code=" + response.status);
            console.log(response.data);
            console.log("data.text=" + JSON.stringify(response.data));
            // Uncomment these lines if needed:
            // const id = response.data.id;
            // console.log("id of the added item is " + id);
        } catch (e) {
            console.log("problem");
            console.log(e);
        }
        console.log("");

        console.log();
        console.log("testing getting the report - 2");
        console.log("------------------------------");
        try {
            let text = "";
            const url = baseUrl + "/report/?user_id=123123&year=2024&month=4";
            const response = await axios.get(url);
            console.log("url=" + url);
            console.log("data.status_code=" + response.status);
            console.log(response.data);
            console.log("data.text=" + JSON.stringify(response.data));
            text = text + response.data.dinner;
            console.log(text);
        } catch (e) {
            console.log("problem");
            console.log(e);
        }
        console.log("");

        rl.close();
        output.end();
    }

    runTests();
});
